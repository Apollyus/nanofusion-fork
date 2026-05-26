import fs from 'fs';
import https from 'https';

const code = fs.readFileSync('public/static/offers.js', 'utf8');
const urls = [...code.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^\s'"]*/g)].map(m => m[0]);
const uniqueUrls = [...new Set(urls)];

console.log(`Found ${uniqueUrls.length} unique URLs`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode, location: res.headers.location });
    }).on('error', (e) => {
      resolve({ url, status: 'Error', error: e.message });
    });
  });
}

(async () => {
  for (const url of uniqueUrls) {
    const res = await checkUrl(url);
    console.log(`${res.status} - ${url} ${res.location ? '-> ' + res.location : ''}`);
  }
})();
