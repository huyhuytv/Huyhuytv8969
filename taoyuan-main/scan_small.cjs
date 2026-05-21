const fs = require('fs');
const files = [
    './taoyuan-main/src/views/GameLayout.vue',
    './taoyuan-main/src/views/game/MuseumView.vue',
    './taoyuan-main/src/views/game/CookingView.vue',
    './taoyuan-main/src/views/game/CharInfoView.vue',
    './taoyuan-main/src/views/MainMenu.vue',
    './taoyuan-main/src/views/game/QuestView.vue',
    './taoyuan-main/src/views/game/ToolUpgradeView.vue',
    './taoyuan-main/src/views/game/ForageView.vue',
    './taoyuan-main/src/components/game/KiteFlyingView.vue'
];

for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    console.log('--- ' + f + ' ---');
    let inHtmlComment = false;
    let inJsComment = false;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('<!--')) inHtmlComment = true;
        if (line.includes('-->')) { inHtmlComment = false; continue; }
        if (inHtmlComment) continue;

        if (line.includes('/*')) inJsComment = true;
        if (line.includes('*/')) { inJsComment = false; continue; }
        if (inJsComment) continue;

        if (line.trim().startsWith('//')) continue;

        let cleanLine = line.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
        if (/[\u4e00-\u9fa5]/.test(cleanLine)) {
            console.log(`${i+1}: ${line}`);
        }
    }
}
