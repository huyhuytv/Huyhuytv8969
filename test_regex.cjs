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
let uniqueStrings = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match single, double, backtick strings
  const regex = /(['"`])((?:(?!\1)[^\\]|\\.)*[\u4e00-\u9fa5]+(?:(?!\1)[^\\]|\\.)*)\1/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
      // Exclude strings that look like comments
      uniqueStrings.add(match[2]);
  }
});
console.log(Array.from(uniqueStrings).slice(0, 10));
console.log("Total full strings to translate:", uniqueStrings.size);
