import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function convertJpgToPng() {
    try {
        if (!fs.existsSync(publicDir)) {
            console.error(`Directory not found: ${publicDir}`);
            return;
        }

        const files = fs.readdirSync(publicDir);
        const jpgFiles = files.filter(file => file.toLowerCase().endsWith('.jpg'));

        if (jpgFiles.length === 0) {
            console.log('No JPG files found in public directory.');
            return;
        }

        console.log(`Found ${jpgFiles.length} JPG files.`);

        for (const file of jpgFiles) {
            const filePath = path.join(publicDir, file);
            const fileRoot = path.parse(file).name;
            const pngPath = path.join(publicDir, `${fileRoot}.png`);

            try {
                const image = await Jimp.read(filePath);
                await image.write(pngPath);
                console.log(`Successfully converted: ${file} -> ${fileRoot}.png`);
            } catch (err) {
                console.error(`Failed to convert ${file}:`, err);
            }
        }
    } catch (error) {
        console.error('Error during conversion process:', error);
    }
}

convertJpgToPng();
