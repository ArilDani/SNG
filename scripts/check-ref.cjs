const fs = require('fs');
const s = fs.readFileSync('referensi/SNG-Agency-Website.html', 'utf8');
console.log('Includes data-page="home":', s.includes('data-page="home"'));
console.log('Includes page-home:', s.includes('page-home'));
const css = fs.readFileSync('ref-style.css', 'utf8');
console.log('CSS includes home:', css.includes('home'));
console.log('CSS occurrences of home:', (css.match(/home/g) || []).length);

