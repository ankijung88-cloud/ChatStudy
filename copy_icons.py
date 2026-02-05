import shutil
import os

source = r'C:\Users\안기정\.gemini\antigravity\brain\21c7de67-f836-4769-8bc0-3bd9fb072dd3\k_storylab_icon_final_1770290747072.png'
dest192 = r'c:\dev\ChatStudy\public\icon-192x192.png'
dest512 = r'c:\dev\ChatStudy\public\icon-512x512.png'

try:
    if os.path.exists(source):
        shutil.copy2(source, dest192)
        shutil.copy2(source, dest512)
        print(f"Successfully copied from {source}")
    else:
        print(f"Source not found: {source}")
except Exception as e:
    print(f"Error: {e}")
