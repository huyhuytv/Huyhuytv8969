const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let clickWithoutRole = [];
let imgWithoutAlt = [];

walkDir('taoyuan-main/src', (filePath) => {
    if (!filePath.endsWith('.vue')) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        if (/<(div|span|p|img|a)[^>]*@click/i.test(line)) {
             if (!/role=["'][^"']*["']/i.test(line) && !/role=/i.test(line)) {
                clickWithoutRole.push(`${filePath}:${index + 1}: ${line.trim()}`);
             }
        }
        if (/<img[^>]*>/i.test(line) && !/alt=/i.test(line)) {
            imgWithoutAlt.push(`${filePath}:${index + 1}: ${line.trim()}`);
        }
    });
});

console.log("=== 1. Clickable Elements without ANY role ===");
console.log(clickWithoutRole.slice(0, 50).join('\n'));
console.log(`... and ${Math.max(0, clickWithoutRole.length - 50)} more.`);

console.log("\n=== 2. Images without alt text ===");
console.log(imgWithoutAlt.slice(0, 50).join('\n'));
console.log(`... and ${Math.max(0, imgWithoutAlt.length - 50)} more.`);
