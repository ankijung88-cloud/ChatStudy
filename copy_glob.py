import glob
import shutil
import os

files = glob.glob(r'C:\Users\*\.gemini\antigravity\brain\21c7de67-f836-4769-8bc0-3bd9fb072dd3\k_storylab_icon_final_1770290747072.png')
if files:
    shutil.copy2(files[0], 'public/icon-192x192.png')
    shutil.copy2(files[0], 'public/icon-512x512.png')
    print(f"Success: Copied from {files[0]}")
else:
    print("Not found")
