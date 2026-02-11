param(
  [Parameter(Mandatory = $false)]
  [string]$Owner = "hudasabirski",

  [Parameter(Mandatory = $false)]
  [string]$Repo = "hd-innovations",

  [Parameter(Mandatory = $false)]
  [switch]$Open
)

$ErrorActionPreference = "Stop"

function Read-TokenSecure {
  $existing = $env:DARELWASL_GITHUB_TOKEN
  if ($existing) { return $existing }
  $existing = $env:GITHUB_TOKEN
  if ($existing) { return $existing }
  $existing = $env:GH_TOKEN
  if ($existing) { return $existing }

  $secure = Read-Host -Prompt "Paste GitHub token (input hidden)" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}

$token = Read-TokenSecure
if (-not $token) {
  throw "Token is required."
}

# Pass token via env var (not written to disk).
$env:GITHUB_TOKEN = $token

$out = & (Join-Path $PSScriptRoot "deploy-gh-pages.ps1") -Owner $Owner -Repo $Repo

if ($Open) {
  $pagesUrl = $null
  if ($out -and $out.PagesUrl) { $pagesUrl = $out.PagesUrl }
  if (-not $pagesUrl) { $pagesUrl = "https://$Owner.github.io/$Repo/" }
  try { Start-Process $pagesUrl | Out-Null } catch {}
}

$out
