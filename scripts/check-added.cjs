const fs = require('fs');

const refCSS = fs.readFileSync('ref-style.css', 'utf-8');
const curCSS = fs.readFileSync('src/index.css', 'utf-8');

// Find what's at the end or uniquely in curCSS
console.log('Comparing css contents...');
const lines = curCSS.split('\n');
console.log('Total lines:', lines.length);

