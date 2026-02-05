@echo off
set "src=C:\Users\안기정\.gemini\antigravity\brain\21c7de67-f836-4769-8bc0-3bd9fb072dd3\k_storylab_icon_final_1770290747072.png"
set "dest192=public\icon-192x192.png"
set "dest512=public\icon-512x512.png"

if exist "%src%" (
    copy /Y "%src%" "%dest192%"
    copy /Y "%src%" "%dest512%"
    echo Copied successfully.
) else (
    echo Source not found: %src%
)
