param(
    [string]$RepoPath = "."
)

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path -LiteralPath $RepoPath).Path
$taskPath = Join-Path $repoRoot ".agent/TASK.md"
$acceptancePath = Join-Path $repoRoot ".agent/ACCEPTANCE.md"

if (-not (Test-Path -LiteralPath $taskPath)) {
    throw "Missing task file: $taskPath"
}

if (-not (Test-Path -LiteralPath $acceptancePath)) {
    throw "Missing acceptance file: $acceptancePath"
}

$acceptance = Get-Content -LiteralPath $acceptancePath -Raw

if ($acceptance -notmatch '(?m)^- Status:\s+Approved\s*$') {
    throw "Acceptance gate failed. Supervisor verdict is not Approved in $acceptancePath"
}

Write-Host "Acceptance gate passed: $acceptancePath"
