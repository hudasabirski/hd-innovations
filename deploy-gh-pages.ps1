param(
  [Parameter(Mandatory = $false)]
  [string]$Owner = "hudasabirski",

  [Parameter(Mandatory = $false)]
  [string]$Repo = "hd-innovations",

  [Parameter(Mandatory = $false)]
  [string]$SitePath = "",

  [Parameter(Mandatory = $false)]
  [string]$Branch = "main",

  # By default this script updates the given repo if it already exists.
  # Use this switch only if you want the script to auto-pick a different repo name.
  [Parameter(Mandatory = $false)]
  [switch]$CreateNewIfExists
)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Get-Token {
  if ($env:DARELWASL_GITHUB_TOKEN) { return $env:DARELWASL_GITHUB_TOKEN }
  if ($env:GITHUB_TOKEN) { return $env:GITHUB_TOKEN }
  if ($env:GH_TOKEN) { return $env:GH_TOKEN }
  return $null
}

function Invoke-GitHubApi {
  param(
    [Parameter(Mandatory = $true)][string]$Method,
    [Parameter(Mandatory = $true)][string]$Uri,
    [Parameter(Mandatory = $false)][object]$Body = $null,
    [Parameter(Mandatory = $true)][hashtable]$Headers
  )

  if ($null -eq $Body) {
    return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $Headers
  }

  $json = $Body | ConvertTo-Json -Depth 10
  return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $Headers -Body $json
}

function Repo-Exists {
  param([Parameter(Mandatory = $true)][string]$Owner, [Parameter(Mandatory = $true)][string]$Repo, [Parameter(Mandatory = $true)][hashtable]$Headers)
  try {
    Invoke-GitHubApi -Method "GET" -Uri "https://api.github.com/repos/$Owner/$Repo" -Headers $Headers | Out-Null
    return $true
  } catch {
    $resp = $_.Exception.Response
    if ($resp -and $resp.StatusCode.value__ -eq 404) { return $false }
    throw
  }
}

function Ensure-RepoNameAvailable {
  param([Parameter(Mandatory = $true)][string]$Owner, [Parameter(Mandatory = $true)][string]$Repo, [Parameter(Mandatory = $true)][hashtable]$Headers)
  if (-not (Repo-Exists -Owner $Owner -Repo $Repo -Headers $Headers)) { return $Repo }
  if (-not (Repo-Exists -Owner $Owner -Repo ($Repo + "-site") -Headers $Headers)) { return ($Repo + "-site") }
  if (-not (Repo-Exists -Owner $Owner -Repo ($Repo + "-website") -Headers $Headers)) { return ($Repo + "-website") }
  return ($Repo + "-website-" + (Get-Random -Minimum 1000 -Maximum 9999))
}

$token = Get-Token
if (-not $token) {
  throw "Missing token. Set one of: DARELWASL_GITHUB_TOKEN, GITHUB_TOKEN, or GH_TOKEN."
}

$siteRoot = $SitePath
if (-not $siteRoot) {
  $siteRoot = $PSScriptRoot
}
if (-not $siteRoot) {
  $siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
}

$headers = @{
  Authorization = "Bearer $token"
  Accept = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
  "User-Agent" = "hd-innovations-deployer"
}

$me = Invoke-GitHubApi -Method "GET" -Uri "https://api.github.com/user" -Headers $headers
if ($me.login -ne $Owner) {
  throw "Token authenticates as '$($me.login)' but -Owner is '$Owner'."
}

$repoExists = Repo-Exists -Owner $Owner -Repo $Repo -Headers $headers
if ($repoExists -and $CreateNewIfExists) {
  $Repo = Ensure-RepoNameAvailable -Owner $Owner -Repo $Repo -Headers $headers
  $repoExists = Repo-Exists -Owner $Owner -Repo $Repo -Headers $headers
}

if (-not $repoExists) {
  $repoBody = @{
    name = $Repo
    description = "HD Innovations - premium website"
    private = $false
    has_issues = $true
    has_projects = $false
    has_wiki = $false
  }
  Invoke-GitHubApi -Method "POST" -Uri "https://api.github.com/user/repos" -Headers $headers -Body $repoBody | Out-Null
}

if (-not (Test-Path $siteRoot)) {
  throw "SitePath not found: $siteRoot"
}

$deployDir = Join-Path $env:TEMP ("hd-innovations-pages-" + $Repo + "-" + [Guid]::NewGuid().ToString("N").Substring(0, 8))

$basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("x-access-token:" + $token)))
$gitAuth = ("http.https://github.com/.extraheader=AUTHORIZATION: basic " + $basic)

function Copy-SiteToDir([string]$From, [string]$To) {
  Copy-Item -Path (Join-Path $From "*") -Destination $To -Recurse -Force

  # Don't deploy legacy/local backups.
  $legacyIndex = Join-Path $To "index.legacy.html"
  $legacyStyles = Join-Path $To "styles.legacy.css"
  if (Test-Path $legacyIndex) { Remove-Item -Force $legacyIndex }
  if (Test-Path $legacyStyles) { Remove-Item -Force $legacyStyles }
}

if ($repoExists) {
  # Update existing repo without rewriting history (avoids "fetch first" rejection).
  git -c $gitAuth clone --depth 1 ("https://github.com/" + $Owner + "/" + $Repo + ".git") $deployDir | Out-Null

  Push-Location $deployDir
  try {
    git checkout $Branch | Out-Null

    # Clear working tree (but keep .git).
    Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

    Copy-SiteToDir -From $siteRoot -To $deployDir

    git config user.name $Owner
    git config user.email ($Owner + "@users.noreply.github.com")
    git add -A

    $status = git status --porcelain
    if ($status) {
      git commit -m "Update site" | Out-Null
      git -c $gitAuth push origin $Branch | Out-Null
    }
  } finally {
    Pop-Location
  }
} else {
  # First publish to a newly created repo.
  New-Item -ItemType Directory -Force -Path $deployDir | Out-Null
  Copy-SiteToDir -From $siteRoot -To $deployDir

  Push-Location $deployDir
  try {
    git init | Out-Null
    git checkout -b $Branch | Out-Null
    git config user.name $Owner
    git config user.email ($Owner + "@users.noreply.github.com")
    git add -A
    git commit -m "Initial site" | Out-Null
    git remote add origin ("https://github.com/" + $Owner + "/" + $Repo + ".git")
    git -c $gitAuth push -u origin $Branch | Out-Null
  } finally {
    Pop-Location
  }
}

$pagesBody = @{ source = @{ branch = $Branch; path = "/" } }
try {
  Invoke-GitHubApi -Method "POST" -Uri ("https://api.github.com/repos/" + $Owner + "/" + $Repo + "/pages") -Headers $headers -Body $pagesBody | Out-Null
} catch {
  # If already configured, GitHub may return 409/422 depending on state; ignore and continue.
}

$pagesUrl = "https://" + $Owner + ".github.io/" + $Repo + "/"

[pscustomobject]@{
  Repo = ($Owner + "/" + $Repo)
  RepoUrl = ("https://github.com/" + $Owner + "/" + $Repo)
  PagesUrl = $pagesUrl
  DeployDir = $deployDir
} | Format-List

# best-effort: drop sensitive value
$token = $null
$basic = $null
$gitAuth = $null
