param(
  [Parameter(Mandatory = $false)]
  [string]$Owner = "hudasabirski",

  [Parameter(Mandatory = $false)]
  [string]$KeyName = "id_ed25519_hdinnov"
)

$ErrorActionPreference = "Stop"

function Ensure-Dir([string]$Path) {
  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
  }
}

$sshDir = Join-Path $env:USERPROFILE ".ssh"
Ensure-Dir $sshDir

$keyPath = Join-Path $sshDir $KeyName
$pubPath = $keyPath + ".pub"

if (-not (Test-Path $keyPath)) {
  $sshKeygen = $null
  try { $sshKeygen = (Get-Command ssh-keygen.exe -ErrorAction Stop).Source } catch {}
  if (-not $sshKeygen) { $sshKeygen = Join-Path $env:WINDIR "System32\\OpenSSH\\ssh-keygen.exe" }

  # Windows PowerShell can fail to forward an empty string to native commands (breaking `-N ""`).
  # Work around this by running ssh-keygen through cmd.exe so `-N ""` is honored.
  $comment = "$Owner (hd-innovations deploy)"
  $cmd = "`"$sshKeygen`" -t ed25519 -f `"$keyPath`" -N `"`" -C `"$comment`""
  cmd /c $cmd | Out-Null
}

if (-not (Test-Path $pubPath)) {
  # If a private key exists but the .pub file does not, regenerate the public key from the private key.
  if (Test-Path $keyPath) {
    $pub = & $env:WINDIR\\System32\\OpenSSH\\ssh-keygen.exe -y -f $keyPath
    if (-not $pub) { throw "Public key missing and regeneration failed: $pubPath" }
    Set-Content -Path $pubPath -Value $pub -Encoding ascii
  }
}

if (-not (Test-Path $pubPath)) {
  throw "Public key missing: $pubPath"
}

$configPath = Join-Path $sshDir "config"
$configBlock = @"

Host github.com-hdinnov
  HostName github.com
  User git
  IdentityFile $keyPath
  IdentitiesOnly yes

"@

if (-not (Test-Path $configPath)) {
  Set-Content -Path $configPath -Value $configBlock -Encoding ascii
} else {
  $existing = Get-Content -Path $configPath -Raw
  if ($existing -notmatch 'Host github\.com') {
    Add-Content -Path $configPath -Value $configBlock -Encoding ascii
  }
}

$pub = Get-Content -Path $pubPath -Raw
try { Set-Clipboard -Value $pub } catch {}

try {
  $knownHosts = Join-Path $sshDir "known_hosts"
  $scan = (ssh-keyscan github.com 2>$null)
  if ($scan) {
    if (-not (Test-Path $knownHosts)) {
      Set-Content -Path $knownHosts -Value $scan -Encoding ascii
    } else {
      $existing = Get-Content -Path $knownHosts -Raw
      if ($existing -notmatch 'github\\.com') {
        Add-Content -Path $knownHosts -Value $scan -Encoding ascii
      }
    }
  }
} catch {}

Write-Host "SSH public key copied to clipboard." -ForegroundColor Green
Write-Host "Add it to GitHub: Settings -> SSH and GPG keys -> New SSH key" -ForegroundColor Yellow
Write-Host "URL: https://github.com/settings/ssh/new" -ForegroundColor Yellow
Write-Host ""
Write-Host "Public key:" -ForegroundColor Cyan
Write-Host $pub
Write-Host ""
Write-Host "After adding the key, you can test with:" -ForegroundColor Cyan
Write-Host "  ssh -T git@github.com-hdinnov" -ForegroundColor Cyan
