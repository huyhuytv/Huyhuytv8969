const fs = require('fs');
const path = require('path');
const glob = require('glob');

const dataDir = path.join(__dirname, 'src', 'data');
const files = glob.sync('**/*.ts', { cwd: dataDir, absolute: true });

let uniqueStrings = new Set();

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Strip comments to avoid translating comments
    content = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

    // Match strings in single, double quotes or backticks that contain Chinese
    // Be careful with escaped quotes, simplified regex:
    const regex = /(['"`])((?:(?!\1)[^\\]|\\.)*[\u4e00-\u9fa5]+(?:(?!\1)[^\\]|\\.)*)\1/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
        const str = match[2];
        if (str.trim().length > 0) {
            uniqueStrings.add(str);
        }
    }
});

const output = {
    // We will build a key-value mapping
};

Array.from(uniqueStrings).forEach(str => {
    output[str] = ""; 
});

const outFile = path.join(__dirname, 'data_to_translate.json');
fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf8');
console.log(`Extracted ${uniqueStrings.size} unique Chinese strings to data_to_translate.json`);
