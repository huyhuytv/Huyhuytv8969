const fs = require('fs');
const path = require('path');
const https = require('https');

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

// 1. Extract all unique Chinese phrases
const CHINESE_REGEX = /[\u4e00-\u9fa5，。？！、：；“”（）《》]+/g;
let uniquePhrases = new Set();
// We also maintain a mapping of file -> matched phrases to replace later
let fileMatches = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let matchesInFile = new Set();
  lines.forEach((line) => {
    // Ignore comments
    if(line.trim().startsWith('//')||line.trim().startsWith('/*')||line.trim().startsWith('*')||line.trim().startsWith('<!--')) return;
    const match = line.match(CHINESE_REGEX);
    if (match) {
      match.forEach(m => {
        uniquePhrases.add(m);
        matchesInFile.add(m);
      });
    }
  });
  if (matchesInFile.size > 0) {
    fileMatches[f] = Array.from(matchesInFile);
  }
});

const phrasesArray = Array.from(uniquePhrases);
console.log(`Found ${phrasesArray.length} unique Chinese phrases that need translation.`);

async function translateBatch(texts) {
    return new Promise((resolve, reject) => {
        const body = new URLSearchParams();
        body.append('client', 'gtx');
        body.append('sl', 'zh-CN');
        body.append('tl', 'vi');
        body.append('dt', 't');
        body.append('q', texts.join('\n\n|\n\n'));

        const req = https.request('https://translate.googleapis.com/translate_a/single', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return resolve(texts.map(() => "")); // Fallback if rate limited
                }
                try {
                    const parsed = JSON.parse(data);
                    let resultStr = "";
                    parsed[0].forEach(part => {
                        if (part[0]) resultStr += part[0];
                    });
                    const translatedArr = resultStr.split('\n\n|\n\n').map(s => s.trim());
                    // Fallback to original length if split mismatch
                    if (translatedArr.length !== texts.length) {
                         const singleTransReqs = texts.map(t => translateSingle(t));
                         return resolve(Promise.all(singleTransReqs));
                    }
                    resolve(translatedArr);
                } catch (e) {
                    console.log("Error parsing:", e.message);
                    resolve(texts.map(() => ""));
                }
            });
        });
        req.on('error', reject);
        req.write(body.toString());
        req.end();
    });
}

async function translateSingle(text) {
     return new Promise((resolve, reject) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    let resultStr = "";
                    parsed[0].forEach(part => { if(part[0]) resultStr += part[0]; });
                    resolve(resultStr.trim());
                } catch (e) {
                    resolve(text);
                }
            });
        }).on('error', () => resolve(text));
    });
}

async function run() {
    let dict = {};
    const BATCH_SIZE = 50;
    console.log(`Starting translation... Batches: ${Math.ceil(phrasesArray.length / BATCH_SIZE)}`);
    
    for (let i = 0; i < phrasesArray.length; i += BATCH_SIZE) {
        const batch = phrasesArray.slice(i, i + BATCH_SIZE);
        console.log(`Translating ${i} to ${i+batch.length}...`);
        const translatedBatch = await translateBatch(batch);
        for(let j=0; j<batch.length; j++){
            let trans = translatedBatch[j] || batch[j];
            // Remove vietnamese quotes if they were added due to formatting
            if (trans !== batch[j]) {
                 dict[batch[j]] = trans;
            }
        }
        // sleep a bit
        await new Promise(r => setTimeout(r, 500));
    }
    
    fs.writeFileSync('translation_dict.json', JSON.stringify(dict, null, 2));
    console.log("Translation done! Now replacing in files...");
    
    let updatedFiles = 0;
    for (const [f, phrases] of Object.entries(fileMatches)) {
        let content = fs.readFileSync(f, 'utf8');
        let changed = false;
        // Sort phrases by length descending to prevent partial replacements!
        phrases.sort((a,b) => b.length - a.length);
        phrases.forEach(phrase => {
            if (dict[phrase] && dict[phrase] !== phrase) {
                // escape special regex chars in phrase
                const regexStr = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const pReg = new RegExp(regexStr, 'g');
                content = content.replace(pReg, dict[phrase]);
                changed = true;
            }
        });
        if (changed) {
            fs.writeFileSync(f, content, 'utf8');
            updatedFiles++;
        }
    }
    console.log(`Updated ${updatedFiles} files! Translation completed.`);
}

run();
