const fs = require('fs');
const f = './taoyuan-main/src/views/game/FarmView.vue';
const content = fs.readFileSync(f, 'utf8');
const lines = content.split('\n');
let inHtmlComment = false;
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.includes('<!--')) inHtmlComment = true;
    if (line.includes('-->')) { inHtmlComment = false; continue; }
    if (inHtmlComment) continue;
    if (line.trim().startsWith('//')) continue;
    let cleanLine = line.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
    if (/[\u4e00-\u9fa5]/.test(cleanLine)) {
        console.log(`${i+1}: ${line}`);
    }
}
