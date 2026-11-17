const fs = require('fs');

const refCSS = fs.readFileSync('ref-style.css', 'utf-8');
const curCSS = fs.readFileSync('src/index.css', 'utf-8');

// Parse selector blocks roughly
function extractSelectors(css) {
  const selectors = [];
  const regex = /([^{}]+)\{/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    const sel = match[1].trim();
    if (!sel.startsWith('@') && !sel.startsWith('from') && !sel.startsWith('to') && !sel.match(/^\d+%/)) {
      selectors.push(sel);
    }
  }
  return selectors;
}

const refSels = extractSelectors(refCSS);
const curSels = extractSelectors(curCSS);

console.log('Ref total rules:', refSels.length);
console.log('Cur total rules:', curSels.length);

const missingInCur = refSels.filter(s => !curCSS.includes(s));
console.log('Missing in Cur count:', missingInCur.length);
if (missingInCur.length > 0) {
  console.log('Sample missing:', missingInCur.slice(0, 10));
}

