const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist') && !file.includes('android')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.vue')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('taoyuan-main/src');
let allChineseChars = new Set();
let linesWithChinese = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    const match = line.match(/[\u4e00-\u9fa5]+/g);
    if (match) {
      linesWithChinese.push({ file: f, line: index + 1, text: line.trim() });
      match.forEach(m => {
        for (let char of m) {
          allChineseChars.add(char);
        }
      });
    }
  });
});

fs.writeFileSync('chinese_lines.json', JSON.stringify(linesWithChinese, null, 2));
console.log('Unique characters:', Array.from(allChineseChars).join(''));
console.log('Total lines with Chinese:', linesWithChinese.length);
