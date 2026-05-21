const fs = require('fs');
const path = require('path');
const glob = require('glob');

const dataDir = path.join(__dirname, 'src', 'data');
const files = glob.sync('**/*.ts', { cwd: dataDir, absolute: true });

const translationFile = path.join(__dirname, 'data_to_translate.json');

if (!fs.existsSync(translationFile)) {
    console.error('Translation file not found!');
    process.exit(1);
}

const translations = JSON.parse(fs.readFileSync(translationFile, 'utf8'));

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    
    // We will replace all string literals that match exactly one of the keys in translations
    // and if the value is not empty.
    
    for (const [zh, vi] of Object.entries(translations)) {
        if (!vi || vi.trim() === '') continue;
        
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match exact string: 'zh', "zh", or `zh`
        // We only want to replace the exact full string, avoiding partial matches where possible.
        // Or simple replace: if it matches `'$zh'` -> `'$vi'`
        const single = `'${zh}'`;
        const double = `"${zh}"`;
        const backtick = `\`${zh}\``;
        
        if (content.includes(single)) {
            content = content.split(single).join(`'${vi.replace(/'/g, "\\'")}'`);
            hasChanges = true;
        }
        if (content.includes(double)) {
            content = content.split(double).join(`"${vi.replace(/"/g, '\\"')}"`);
            hasChanges = true;
        }
        if (content.includes(backtick)) {
            content = content.split(backtick).join(`\`${vi.replace(/`/g, '\\`')}\``);
            hasChanges = true;
        }
    }
    
    if (hasChanges) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Successfully applied translations to ${updatedCount} files in src/data/`);
