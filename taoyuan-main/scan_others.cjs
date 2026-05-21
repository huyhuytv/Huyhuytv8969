const fs = require('fs');

function scanFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found: " + filePath);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let hasMatch = false;
    
    console.log(`\n=== Scanning ${filePath} ===`);
    lines.forEach((line, index) => {
        if (/[\u4e00-\u9fa5]/.test(line)) {
            console.log(`${index + 1}: ${line.trim()}`);
            hasMatch = true;
        }
    });
    
    if (!hasMatch) {
        console.log("No Chinese characters found.");
    }
}

scanFile('./taoyuan-main/src/views/GameLayout.vue');
