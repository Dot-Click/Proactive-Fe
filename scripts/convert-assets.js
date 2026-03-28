import sharp from "sharp";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec as execCb } from "child_process";

const exec = promisify(execCb);

const ASSETS_DIR = path.resolve(process.cwd(), "src/assets");
const SRC_DIR = path.resolve(process.cwd(), "src");

/**
 * Finds all image files in a directory recursively.
 */
async function findImages(dir) {
    let results = [];
    const list = await fs.promises.readdir(dir);
    for (const file of list) {
        const filePath = path.resolve(dir, file);
        const stat = await fs.promises.stat(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(await findImages(filePath));
        } else {
            if (/\.(png|jpe?g|webp|tiff)$/i.test(file)) {
                results.push(filePath);
            }
        }
    }
    return results;
}

/**
 * Converts images to AVIF format.
 */
async function convertToAvif() {
    console.log("Starting AVIF conversion...");
    const images = await findImages(ASSETS_DIR);
    console.log(`Found ${images.length} images to convert.`);

    const mappings = {};

    for (const imagePath of images) {
        const ext = path.extname(imagePath);
        const baseName = path.basename(imagePath, ext);
        const dir = path.dirname(imagePath);
        const outputPath = path.join(dir, `${baseName}.avif`);

        try {
            await sharp(imagePath)
                .avif({
                    quality: 80,
                    effort: 4, // 0-9
                })
                .toFile(outputPath);
            
            console.log(`Converted: ${path.relative(process.cwd(), imagePath)} -> ${path.relative(process.cwd(), outputPath)}`);
            
            // Record the mapping for updateImports
            const relativeOld = path.relative(ASSETS_DIR, imagePath).replace(/\\/g, "/");
            const relativeNew = path.relative(ASSETS_DIR, outputPath).replace(/\\/g, "/");
            mappings[relativeOld] = relativeNew;

            // Optionally remove the old file if you want to replace it
            // await fs.promises.unlink(imagePath); 
        } catch (error) {
            console.error(`Failed to convert ${imagePath}:`, error.message);
        }
    }
    
    return mappings;
}

/**
 * Updates all source code imports from .png/.jpg to .avif.
 */
async function updateImports(mappings) {
    console.log("Updating imports in source code...");
    const files = await findSourceFiles(SRC_DIR);
    
    let updatedCount = 0;
    for (const file of files) {
        let content = await fs.promises.readFile(file, "utf8");
        let changed = false;
        
        for (const [oldPath, newPath] of Object.entries(mappings)) {
            // Match imports like "@/assets/About.png" or "../assets/About.png"
            // We use a simple regex for the filename
            const oldFileName = oldPath.split("/").pop();
            const newFileName = newPath.split("/").pop();
            
            if (content.includes(oldFileName)) {
                content = content.replaceAll(oldFileName, newFileName);
                changed = true;
            }
        }
        
        if (changed) {
            await fs.promises.writeFile(file, content, "utf8");
            updatedCount++;
        }
    }
    console.log(`Updated imports in ${updatedCount} files.`);
}

async function findSourceFiles(dir) {
    let results = [];
    const list = await fs.promises.readdir(dir);
    for (const file of list) {
        const filePath = path.resolve(dir, file);
        const stat = await fs.promises.stat(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(await findSourceFiles(filePath));
        } else {
            if (/\.(tsx?|jsx?|css|scss|html)$/i.test(file)) {
                results.push(filePath);
            }
        }
    }
    return results;
}

async function main() {
    try {
        const mappings = await convertToAvif();
        await updateImports(mappings);
        console.log("Conversion and import update completed successfully!");
    } catch (error) {
        console.error("Critical error:", error);
    }
}

main();
