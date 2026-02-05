const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\안기정\\.gemini\\antigravity\\brain\\21c7de67-f836-4769-8bc0-3bd9fb072dd3\\k_storylab_icon_final_1770290747072.png';
const targetDir = path.join(__dirname, 'public');
const dest192 = path.join(targetDir, 'icon-192x192.png');
const dest512 = path.join(targetDir, 'icon-512x512.png');

try {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    if (fs.existsSync(source)) {
        fs.copyFileSync(source, dest192);
        fs.copyFileSync(source, dest512);
        console.log('Successfully copied icons to public folder');
    } else {
        console.error('Source icon not found at: ' + source);
    }
} catch (err) {
    console.error('Error during copy: ' + err.message);
}
