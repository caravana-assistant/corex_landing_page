# bundle-for-it.ps1 — produce both deployment deliverables for IT into deploy/:
#   1. deploy/corex-stage2-landing-YYYY-MM-DD.zip   (multi-file, hashed assets)
#   2. deploy/index.html                            (one self-contained file)
# Plus deploy/DEPLOY-FOR-IT.md (kept in sync with the project root copy).
# Run from project root: .\scripts\bundle-for-it.ps1

$ErrorActionPreference = "Stop"

$Date = Get-Date -Format "yyyy-MM-dd"
$Root = Resolve-Path "$PSScriptRoot\.."
$Dist = Join-Path $Root "dist"
$DistSingle = Join-Path $Root "dist-single"
$Deploy = Join-Path $Root "deploy"
$ZipPath = Join-Path $Deploy "corex-stage2-landing-$Date.zip"
$SingleHtml = Join-Path $Deploy "index.html"

# Ensure deploy directory exists
if (-not (Test-Path $Deploy)) {
    New-Item -ItemType Directory -Path $Deploy | Out-Null
}

Write-Host "-> [1/4] Building production multi-file bundle..." -ForegroundColor Cyan
$env:DEPLOY_TARGET = "aspnet"
pnpm build

# Create physical paths for my-schedule page in multi-file bundle
Copy-Item (Join-Path $Dist "index.html") (Join-Path $Dist "my-schedule.html") -Force
$DistMySchedule = Join-Path $Dist "my-schedule"
if (-not (Test-Path $DistMySchedule)) {
    New-Item -ItemType Directory -Path $DistMySchedule | Out-Null
}
Copy-Item (Join-Path $Dist "index.html") (Join-Path $DistMySchedule "index.html") -Force

Write-Host "-> [2/4] Building self-contained single-file bundle..." -ForegroundColor Cyan
$env:BUILD_SINGLE = "1"
pnpm build
$env:BUILD_SINGLE = $null
$env:DEPLOY_TARGET = $null

python scripts/inline-singlefile.py

Copy-Item (Join-Path $DistSingle "corex-stage2-landing-single.html") $SingleHtml -Force
Copy-Item $SingleHtml (Join-Path $Deploy "my-schedule.html") -Force
$DeployMySchedule = Join-Path $Deploy "my-schedule"
if (-not (Test-Path $DeployMySchedule)) {
    New-Item -ItemType Directory -Path $DeployMySchedule | Out-Null
}
Copy-Item $SingleHtml (Join-Path $DeployMySchedule "index.html") -Force

Write-Host "-> [3/4] Preparing multi-file zip..." -ForegroundColor Cyan
Copy-Item (Join-Path $Root "DEPLOY-FOR-IT.md") $Dist -Force

$IconsSvg = Join-Path $Dist "icons.svg"
if (Test-Path $IconsSvg) { Remove-Item $IconsSvg -Force }
$ViteSvg = Join-Path $Dist "vite.svg"
if (Test-Path $ViteSvg) { Remove-Item $ViteSvg -Force }

if (Test-Path $ZipPath) { Remove-Item $ZipPath -Force }

# Use Compress-Archive to zip the contents of dist directory
# We append \* to the path to compress files inside dist, rather than the folder itself
Compress-Archive -Path "$Dist\*" -DestinationPath $ZipPath -Force

Write-Host "-> [4/4] Refreshing deploy/ folder..." -ForegroundColor Cyan
Copy-Item (Join-Path $Root "DEPLOY-FOR-IT.md") $Deploy -Force

# Create README.md in deploy folder
$ReadmeContent = @"
# CoreX Stage 2 Landing — Deploy folder

All artifacts ready to send to IT live in this folder.

## What's inside

- \`index.html\` — **single self-contained HTML file** (built $Date).
  Drop straight into the web root. No companion folder needed.
  Recommended for plain hosting that doesn't run Node.
- \`corex-stage2-landing-$Date.zip\` — multi-file bundle (hashed CSS/JS,
  brand images, favicon). Better for CDNs and cache-aware setups.
- \`DEPLOY-FOR-IT.md\` — full deployment notes for the IT team. Cover
  letter explaining both options, server config tips, cache headers.

## How to regenerate

From the project root:

\`\`\`powershell
.\scripts\bundle-for-it.ps1
\`\`\`

That rebuilds both files into this folder with today's date.

Files are gitignored (regeneratable). Don't worry about committing them.
"@

Set-Content -Path (Join-Path $Deploy "README.md") -Value $ReadmeContent -Encoding UTF8

# Output file size details
$ZipSize = (Get-Item $ZipPath).Length / 1KB
$HtmlSize = (Get-Item $SingleHtml).Length / 1KB

Write-Host ""
Write-Host "  Multi-file zip (best caching):" -ForegroundColor Green
Write-Host "    $([Math]::Round($ZipSize, 2)) KB`t$($ZipPath)"
Write-Host ""
Write-Host "  Single-file HTML (one file, no deps):" -ForegroundColor Green
Write-Host "    $([Math]::Round($HtmlSize, 2)) KB`t$($SingleHtml)"
Write-Host ""
Write-Host "  Deploy folder ready: $Deploy" -ForegroundColor Green
