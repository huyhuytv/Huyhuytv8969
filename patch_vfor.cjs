const fs = require('fs');

const path = 'taoyuan-main/src/views/game/ShopView.vue';
let code = fs.readFileSync(path, 'utf-8');

// replace 1: lists
code = code.replace(/<div class="flex flex-col space-y-2">/g, '<div class="flex flex-col space-y-2" role="list">');
code = code.replace(/<div class="grid grid-cols-[^>]+>/g, (m) => m + ' role="list"');

// replace 2: list items
let itemRegex = /<div\s+(v-for="[^"]+"\s+:key="[^"]+"\s+class="[^"]*cursor-pointer[^"]*")([^>]*@click="([^"]*)")/g;
code = code.replace(itemRegex, (match, p1, p2, p3) => {
    let newP1 = p1.replace('cursor-pointer', 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40');
    // We add tabindex, role
    newP1 += '\n                role="button"\n                tabindex="0"';
    let newP2 = p2 + `\n                @keydown.enter.prevent="${p3}"\n                @keydown.space.prevent="${p3}"`;
    return `<div\n                ${newP1}${newP2}`;
});

// also for div without v-for but with cursor-pointer and @click (single items)
let singleRegex = /<div\s+((?:[a-zA-Z-\s]+="[^"]*"\s+)*class="[^"]*cursor-pointer[^"]*")([^>]*@click="([^"]*)")/g;
code = code.replace(singleRegex, (match, p1, p2, p3) => {
    // If it already has role="button" skip
    if (match.includes('role="button"')) return match;

    let newP1 = p1.replace('cursor-pointer', 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40');
    newP1 += '\n                role="button"\n                tabindex="0"';
    let newP2 = p2 + `\n                @keydown.enter.prevent="${p3}"\n                @keydown.space.prevent="${p3}"`;
    return `<div\n                ${newP1}${newP2}`;
});


fs.writeFileSync(path, code);
console.log('patched', path);
