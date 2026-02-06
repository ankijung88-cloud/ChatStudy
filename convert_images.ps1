Add-Type -AssemblyName System.Drawing

$publicDir = Join-Path $PSScriptRoot "public"

if (-not (Test-Path $publicDir)) {
    Write-Error "Public directory not found: $publicDir"
    exit
}

$files = Get-ChildItem -Path $publicDir -Filter "*.jpg"

if ($files.Count -eq 0) {
    Write-Host "No JPG files found in $publicDir"
    exit
}

foreach ($file in $files) {
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $dest = [System.IO.Path]::ChangeExtension($file.FullName, ".png")
        $img.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
        $img.Dispose()
        Write-Host "Converted $($file.Name) to $(Split-Path $dest -Leaf)"
    }
    catch {
        Write-Error "Failed to convert $($file.Name): $_"
    }
}
