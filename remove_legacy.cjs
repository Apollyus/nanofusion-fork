const fs = require('fs');
const path = require('path');
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('admin-panel') && !file.includes('node_modules')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.html')) {
      results.push(file);
    }
  });
  return results;
};
const files = walk('.');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('index-DnPFhj9u.js')) {
    content = content.replace(/<script type="module" [^>]*src="\/assets\/index-DnPFhj9u\.js"[^>]*><\/script>/g, '');
    content = content.replace(/<script type="module" src="\/assets\/index-DnPFhj9u\.js"><\/script>/g, '');
    fs.writeFileSync(file, content);
    console.log('Removed from', file);
  }
});
