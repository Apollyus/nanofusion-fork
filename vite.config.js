import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  publicDir: 'public',
  server: {
    port: 5173,
    host: true,
  },
  plugins: [
    {
      name: 'serve-subpages-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const cleanUrl = req.url.split('?')[0].split('#')[0];

          if (cleanUrl === '/o-nas' || cleanUrl === '/o-nas/') {
            req.url = '/o-nas/index.html';
          } else if (cleanUrl === '/faq' || cleanUrl === '/faq/') {
            req.url = '/faq/index.html';
          } else if (cleanUrl === '/poptavka' || cleanUrl === '/poptavka/') {
            req.url = '/poptavka/index.html';
          }

          // Match /sluzby/[slug] or /sluzby/[slug]/
          const match = cleanUrl.match(/^\/sluzby\/([^/]+)/);
          
          if (match) {
            const slug = match[1];
            
            // Bypass asset files
            if (!slug.includes('.')) {
              const filePath = path.join(process.cwd(), 'sluzby', slug, 'index.html');
              
              if (fs.existsSync(filePath)) {
                // Rewrite request URL to point directly to the physical index.html file.
                // Vite's internal HTML middleware will then catch it, compile its scripts/assets, and serve it natively.
                req.url = `/sluzby/${slug}/index.html`;
              }
            }
          }
          next();
        });
      }
    }
  ]
});
