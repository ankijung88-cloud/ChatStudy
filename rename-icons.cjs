const fs = require('fs');
const path = require('path');

const dir = 'c:/dev/ChatStudy/public';
const files = [
    { oldPath: path.join(dir, 'icon-192x192.jpg'), newPath: path.join(dir, 'icon-192x192.png') },
    { oldPath: path.join(dir, 'icon-512x512.jpg'), newPath: path.join(dir, 'icon-512x512.png') }
];

files.forEach(f => {
    if (fs.existsSync(f.oldPath)) {
        fs.renameSync(f.oldPath, f.newPath);
        console.log(`Renamed ${f.oldPath} to ${f.newPath}`);
    } else {
        console.log(`${f.oldPath} not found`);
    }
});

// Double check dir content
console.log('Current files in public:', fs.readdirSync(dir));
