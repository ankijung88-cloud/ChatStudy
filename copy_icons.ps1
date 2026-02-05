$source = Get-ChildItem -Path 'C:\Users\*\.gemini\antigravity\brain\21c7de67-f836-4769-8bc0-3bd9fb072dd3\k_storylab_icon_final_1770290747072.png' | Select-Object -ExpandProperty FullName -First 1
$dest192 = 'c:\dev\ChatStudy\public\icon-192x192.png'
$dest512 = 'c:\dev\ChatStudy\public\icon-512x512.png'

if ($source -and (Test-Path $source)) {
    Copy-Item -Path $source -Destination $dest192 -Force
    Copy-Item -Path $source -Destination $dest512 -Force
    Write-Output "Success: Copied icon from $source to $dest192 and $dest512"
}
else {
    Write-Error "Error: Source icon not found using wildcard search."
}
