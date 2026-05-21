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
      if (file.endsWith('.ts') || file.endsWith('.vue') || file.endsWith('.json')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('taoyuan-main/src/data');
let anyChinese = false;
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (/[\u4e00-\u9fa5]/.test(content)) {
    console.log(`Found Chinese in: ${f}`);
    anyChinese = true;
  }
});
if (!anyChinese) console.log('No Chinese in data!');
