param(
    [ValidateSet("commit", "pr")]
    [string]$Mode,

    [string]$MessageFile,

    [string]$RepoPath = "."
)

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path -LiteralPath $RepoPath).Path
$referencePattern = '(?im)^Acceptance:\s+\.agent/ACCEPTANCE\.md\s*$'

if (-not $Mode) {
    throw "Mode is required."
}

if (-not $MessageFile) {
    throw "MessageFile is required."
}

$resolvedMessageFile = (Resolve-Path -LiteralPath $MessageFile).Path
$content = Get-Content -LiteralPath $resolvedMessageFile -Raw

if ($content -notmatch $referencePattern) {
    if ($Mode -eq "commit") {
        throw "Acceptance reference missing. Commit message must include: Acceptance: .agent/ACCEPTANCE.md"
    }

    throw "Acceptance reference missing. PR body must include: Acceptance: .agent/ACCEPTANCE.md"
}

Write-Host "Acceptance reference passed for $Mode in $resolvedMessageFile"
