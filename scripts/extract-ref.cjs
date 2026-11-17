const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('referensi/SNG-Agency-Website.html', 'utf-8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync('ref-style.css', styleMatch[1].trim());
  console.log('Saved ref-style.css, length:', styleMatch[1].length);
}

