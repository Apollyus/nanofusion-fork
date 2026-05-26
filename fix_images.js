import fs from 'fs';
import path from 'path';

const map = {
  '1558618666-fcd25c85f82e': '1513694203232-719a280e022f',
  '1590076214667-c0f33b98c442': '1581091226825-a6a2a5aee158',
  '1509391366360-fe5bb6583166': '1534438327276-14e5300c3a48',
  '1628033034914-74977460af25': '1564013799919-ab600027ffc6',
  '1596431940026-c75086d7734a': '1520004434532-668416a08753',
  '1584622781564-1d9876a3e601': '1581092916357-5896ebc48073'
};

const dirs = ['public/static', 'static', 'assets'];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
        processDir(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.js.map') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [bad, good] of Object.entries(map)) {
        if (content.includes(bad)) {
          content = content.split(bad).join(good);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}

for (const d of dirs) processDir(d);
