param(
  [Parameter(Mandatory = $false)]
  [string]$Owner = "hudasabirski",

  [Parameter(Mandatory = $false)]
  [string]$Repo = "hd-innovations",

  [Parameter(Mandatory = $false)]
  [string]$Branch = "main",

  [Parameter(Mandatory = $false)]
  [string]$RepoDir = "c:\\darelwasl\\tmp\\hd-innovations-gh",

  [Parameter(Mandatory = $false)]
  [string]$SiteDir = "c:\\darelwasl\\hd-innovations-website"
)

$ErrorActionPreference = "Stop"

function Ensure-Repo {
  if (Test-Path $RepoDir) { return }
  $remote = "git@github.com-hdinnov:$Owner/$Repo.git"
  git clone $remote $RepoDir
}

function Copy-Site {
  $exclude = @(
    "index.legacy.html",
    "styles.legacy.css"
  )

  $items = Get-ChildItem -Path $SiteDir -Force
  foreach ($item in $items) {
    if ($exclude -contains $item.Name) { continue }
    Copy-Item -Path $item.FullName -Destination $RepoDir -Recurse -Force
  }

  # Ensure legacy files are never pushed.
  $legacy1 = Join-Path $RepoDir "index.legacy.html"
  $legacy2 = Join-Path $RepoDir "styles.legacy.css"
  if (Test-Path $legacy1) { Remove-Item -Force $legacy1 }
  if (Test-Path $legacy2) { Remove-Item -Force $legacy2 }
}

Ensure-Repo

# Always use SSH remote (no tokens, no interactive HTTPS prompts).
git -C $RepoDir remote set-url origin ("git@github.com-hdinnov:" + $Owner + "/" + $Repo + ".git")

Copy-Site

Push-Location $RepoDir
try {
  git checkout $Branch | Out-Null
  git add -A
  $status = git status --porcelain
  if (-not $status) {
    Write-Host "No changes to publish." -ForegroundColor Yellow
    exit 0
  }

  if (-not (git config user.name)) { git config user.name $Owner }
  if (-not (git config user.email)) { git config user.email ($Owner + "@users.noreply.github.com") }

  git commit -m "Update site" | Out-Null
  git push origin $Branch
} finally {
  Pop-Location
}

Write-Host ("Published: https://" + $Owner + ".github.io/" + $Repo + "/") -ForegroundColor Green
