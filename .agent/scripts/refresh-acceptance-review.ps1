param(
    [string]$RepoPath = ".",
    [string]$CompareRef
)

$ErrorActionPreference = "Stop"

function ConvertTo-QuotedArgument {
    param([string]$Value)

    if ($null -eq $Value) {
        return '""'
    }

    if ($Value -notmatch '[\s"]') {
        return $Value
    }

    $escaped = $Value -replace '(\\*)"', '$1$1\"'
    $escaped = $escaped -replace '(\\+)$', '$1$1'
    return '"' + $escaped + '"'
}

function Invoke-Git {
    param(
        [string]$WorkingTree,
        [string[]]$GitArgs,
        [switch]$AllowFailure
    )

    $allArgs = @("-C", $WorkingTree) + $GitArgs
    $argumentString = ($allArgs | ForEach-Object { ConvertTo-QuotedArgument $_ }) -join " "

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = "git"
    $startInfo.Arguments = $argumentString
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    [void]$process.Start()
    $stdout = $process.StandardOutput.ReadToEnd()
    $stderr = $process.StandardError.ReadToEnd()
    $process.WaitForExit()

    $output = @()
    if ($stdout) {
        $output += ($stdout -split "`r?`n")
    }

    $script:LastGitExitCode = $process.ExitCode
    if (-not $AllowFailure -and $script:LastGitExitCode -ne 0) {
        $message = @($stderr, $stdout) | Where-Object { $_ -and $_.Trim() }
        throw ($message -join [Environment]::NewLine)
    }

    return $output
}

function Get-DefaultCompareRef {
    param([string]$WorkingTree)

    $originHead = Invoke-Git -WorkingTree $WorkingTree -GitArgs @("symbolic-ref", "--quiet", "refs/remotes/origin/HEAD") -AllowFailure
    if ($script:LastGitExitCode -eq 0 -and $originHead) {
        return ($originHead -join "").Trim().Replace("refs/remotes/", "")
    }

    foreach ($candidate in @("origin/main", "origin/master", "main", "master", "develop")) {
        Invoke-Git -WorkingTree $WorkingTree -GitArgs @("rev-parse", "--verify", $candidate) -AllowFailure | Out-Null
        if ($script:LastGitExitCode -eq 0) {
            return $candidate
        }
    }

    return ""
}

function Format-Bullets {
    param([string[]]$Lines)

    $clean = $Lines | Where-Object { $_ -and $_.Trim() }
    if (-not $clean) {
        return @("- None")
    }

    return $clean | ForEach-Object { "- $_" }
}

$repoRoot = (Resolve-Path -LiteralPath $RepoPath).Path
$agentDir = Join-Path $repoRoot ".agent"
$taskPath = Join-Path $agentDir "TASK.md"
$handoffPath = Join-Path $agentDir "HANDOFF.md"
$historyPath = Join-Path $agentDir "HISTORY.md"
$acceptancePath = Join-Path $agentDir "ACCEPTANCE.md"

if (-not (Test-Path -LiteralPath $acceptancePath)) {
    throw "Missing acceptance file: $acceptancePath"
}

$statusWithBranch = Invoke-Git -WorkingTree $repoRoot -GitArgs @("status", "--short", "--branch") -AllowFailure
$branchHeader = ($statusWithBranch | Select-Object -First 1)
$workingTree = $statusWithBranch | Select-Object -Skip 1
$hasHead = $true
$branch = "DETACHED"

if ($branchHeader -like "## No commits yet on *") {
    $hasHead = $false
    $branch = $branchHeader.Replace("## No commits yet on ", "").Trim()
} elseif ($branchHeader -like "## *") {
    $branch = $branchHeader.Substring(3)
    if ($branch.Contains("...")) {
        $branch = $branch.Split("...")[0].Trim()
    }
}

$compareTarget = $CompareRef
if (-not $compareTarget) {
    $compareTarget = Get-DefaultCompareRef -WorkingTree $repoRoot
}

$mergeBase = ""
$changedFiles = @()
if ($hasHead -and $compareTarget) {
    $mergeBase = ((Invoke-Git -WorkingTree $repoRoot -GitArgs @("merge-base", "HEAD", $compareTarget) -AllowFailure) -join "").Trim()
    if ($script:LastGitExitCode -eq 0 -and $mergeBase) {
        $changedFiles = Invoke-Git -WorkingTree $repoRoot -GitArgs @("diff", "--name-status", "$mergeBase..HEAD") -AllowFailure
    }
}

$recentCommits = if ($hasHead) {
    Invoke-Git -WorkingTree $repoRoot -GitArgs @("log", "-n", "10", "--date=short", "--pretty=format:%ad %h %an %s")
} else {
    @()
}

$taskSummary = if (Test-Path -LiteralPath $taskPath) {
    Get-Content -LiteralPath $taskPath | Select-Object -First 40
} else {
    @("Task file missing")
}

$handoffSummary = if (Test-Path -LiteralPath $handoffPath) {
    Get-Content -LiteralPath $handoffPath | Select-Object -First 40
} else {
    @("Handoff file missing")
}

$historySummary = if (Test-Path -LiteralPath $historyPath) {
    Get-Content -LiteralPath $historyPath | Select-Object -First 30
} else {
    @("History file missing")
}

$existingAcceptance = if (Test-Path -LiteralPath $acceptancePath) {
    Get-Content -LiteralPath $acceptancePath -Raw
} else {
    ""
}

$reviewTail = ""
if ($existingAcceptance -match '(?s)(## Supervisor Review.*)$') {
    $reviewTail = $matches[1].TrimEnd()
}

if (-not $reviewTail) {
    $reviewTail = @(
        "## Supervisor Review",
        "",
        "- Diff matches task: Pending review",
        "- Requested areas still untouched: Pending review",
        "- Extra or unrelated changes: Pending review",
        "- Checks verified: Pending review",
        "- Risks or doubts: Pending review",
        "",
        "## Verdict",
        "",
        "- Status: Pending",
        "- Reason: Supervisor has not approved this delivery yet."
    ) -join "`r`n"
}

$generatedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
$compareLine = if ($compareTarget -and $mergeBase) {
    "$compareTarget (merge-base $mergeBase)"
} elseif ($compareTarget) {
    "$compareTarget (merge-base unavailable)"
} else {
    "No compare ref resolved"
}

$content = @(
    "# Acceptance Review",
    "",
    "Use this file for supervisor review before claiming completion or creating the final commit.",
    "",
    "Generated: $generatedAt",
    "Repo: $repoRoot",
    "Branch: $branch",
    "Compare base: $compareLine",
    "",
    "## Task Contract Snapshot",
    ""
)
$content += Format-Bullets -Lines $taskSummary
$content += @(
    "",
    "## Delivery Summary Snapshot",
    ""
)
$content += Format-Bullets -Lines $handoffSummary
$content += @(
    "",
    "## Changed Files",
    ""
)
$content += Format-Bullets -Lines $changedFiles
$content += @(
    "",
    "## Recent Commits",
    ""
)
$content += Format-Bullets -Lines $recentCommits
$content += @(
    "",
    "## Working Tree",
    ""
)
$content += Format-Bullets -Lines $workingTree
$content += @(
    "",
    "## History Snapshot",
    ""
)
$content += Format-Bullets -Lines $historySummary
$content += @(
    "",
    $reviewTail
)

Set-Content -LiteralPath $acceptancePath -Value $content -Encoding UTF8

Write-Host "Acceptance review refreshed: $acceptancePath"
