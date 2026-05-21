const fs = require('fs');
const dir = './taoyuan-main/src/views/game/';
const files = [
    'InventoryView.vue',
    'AnimalView.vue',
    'SkillView.vue',
    'AchievementView.vue',
    'GuildView.vue',
    'NpcView.vue',
    'ProcessingView.vue',
    'FishPondView.vue',
    'HomeView.vue',
    'FishingView.vue'
];

for (const name of files) {
    const f = dir + name;
    if (!fs.existsSync(f)) continue;
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    let inHtmlComment = false;
    let found = false;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('<!--')) inHtmlComment = true;
        if (line.includes('-->')) { inHtmlComment = false; continue; }
        if (inHtmlComment) continue;

        if (line.trim().startsWith('//')) continue;

        let cleanLine = line.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
        if (/[\u4e00-\u9fa5]/.test(cleanLine)) {
            if (!found) {
                console.log('\n--- ' + f + ' ---');
                found = true;
            }
            console.log(`${i+1}: ${line}`);
        }
    }
}
