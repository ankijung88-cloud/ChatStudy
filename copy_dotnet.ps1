$source = Get-ChildItem -Path 'C:\Users\*\.gemini\antigravity\brain\21c7de67-f836-4769-8bc0-3bd9fb072dd3\k_storylab_icon_final_1770290747072.png' | Select-Object -ExpandProperty FullName -First 1
$dest192 = 'c:\dev\ChatStudy\public\icon-192x192.png'
$dest512 = 'c:\dev\ChatStudy\public\icon-512x512.png'

if ($source) {
    [System.IO.File]::Copy($source, $dest192, $true)
    [System.IO.File]::Copy($source, $dest512, $true)
    "Successfully copied $source to $dest192 and $dest512" | Out-File -FilePath copy_result.txt
}
else {
    "Source not found" | Out-File -FilePath copy_result.txt
}
