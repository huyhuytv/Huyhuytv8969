import zh from './src/locales/zh';
import vi from './src/locales/vi';

function getKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
}

const zhKeys = getKeys(zh);
const viKeys = getKeys(vi);

const missing = zhKeys.filter(k => !viKeys.includes(k));
const extra = viKeys.filter(k => !zhKeys.includes(k));

console.log(`Missing keys in vi.ts: ${missing.length}`);
if (missing.length > 0) {
  missing.slice(0, 50).forEach(k => console.log(`Missing: ${k}`));
}

console.log(`Extra keys in vi.ts: ${extra.length}`);
if (extra.length > 0) {
  extra.slice(0, 50).forEach(k => console.log(`Extra: ${k}`));
}
