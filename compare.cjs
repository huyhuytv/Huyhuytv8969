const fs = require('fs');

function loadModule(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/export default/g, 'module.exports =');
  const tmpFile = file.replace(/\//g, '_') + '.tmp.cjs';
  fs.writeFileSync(tmpFile, content);
  const mod = require('./' + tmpFile);
  fs.unlinkSync(tmpFile);
  return mod;
}

try {
  const zh = loadModule('taoyuan-main/src/locales/zh.ts');
  const vi = loadModule('taoyuan-main/src/locales/vi.ts');

  function compareKeys(obj1, obj2, path = '') {
    const keys1 = Object.keys(obj1 || {});
    const keys2 = Object.keys(obj2 || {});
    
    for (const key of keys1) {
      if (!keys2.includes(key)) {
        console.log(`Missing in vi: ${path}.${key} ("${obj1[key]}")`);
      } else {
        const val1 = obj1[key];
        const val2 = obj2[key];
        if (typeof val1 === 'object' && val1 !== null && !Array.isArray(val1)) {
          compareKeys(val1, val2, path ? `${path}.${key}` : key);
        } else if (typeof val2 === 'string') {
          if (/[\u4e00-\u9fa5]/.test(val2)) {
            console.log(`Untranslated in vi (contains Chinese): ${path ? path + '.' + key : key} => "${val2}"`);
          }
        } else if (Array.isArray(val2)) {
          val2.forEach((item, idx) => {
            if (typeof item === 'string' && /[\u4e00-\u9fa5]/.test(item)) {
               console.log(`Untranslated in vi (contains Chinese): ${path ? path + '.' + key : key}[${idx}] => "${item}"`);
            } else if (typeof item === 'object' && item !== null) {
               // Check objects inside arrays (like the riddles)
               compareKeys(obj1[key][idx], item, `${path ? path + '.' + key : key}[${idx}]`);
            }
          });
        }
      }
    }
  }

  compareKeys(zh, vi);
  console.log("Comparison done.");
} catch (err) {
  console.error("Error:", err);
}
