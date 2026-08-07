const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.html')) {
        results.push(file);
      }
    }
  });
  return results;
};

const htmlFiles = walk(path.join(__dirname, 'public'));

const contactHtml = `
        <div style="display: flex; align-items: center; gap: 1.5rem;" data-contact-patched="true">
          <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center; line-height: 1.2;">
            <a href="tel:+420774509409" style="color: #0f172a; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: color 0.2s;">+420 774 509 409</a>
            <a href="mailto:info@nanofusion.cz" style="color: #64748b; font-size: 0.8rem; text-decoration: none; transition: color 0.2s;">info@nanofusion.cz</a>
          </div>
          <button class="nav-mobile-toggle" id="nav-toggle" aria-label="Otevřít menu">
`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Only patch if not already patched
  if (!content.includes('data-contact-patched="true"')) {
    // Some might have <!-- Hamburger toggle -->, some might not. We just replace the button.
    content = content.replace(/<button class="nav-mobile-toggle"[^>]*>[\s\S]*?<\/button>/, function(match) {
        return `
        <div style="display: flex; align-items: center; gap: 1.5rem;" data-contact-patched="true">
          <div class="contact-desktop-only" style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center; line-height: 1.2;">
            <a href="tel:+420774509409" style="color: #0f172a; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: color 0.2s;">+420 774 509 409</a>
            <a href="mailto:info@nanofusion.cz" style="color: #64748b; font-size: 0.8rem; text-decoration: none; transition: color 0.2s;">info@nanofusion.cz</a>
          </div>
          ${match}
        </div>
        <style>
          @media (max-width: 768px) {
            .contact-desktop-only { display: none !important; }
          }
        </style>
        `;
    });
    
    // Some might have "gap: 1.5rem;" wrapper already for the button (like template.html)
    // We should be careful not to nest it infinitely.
    content = content.replace(/<div style="display: flex; align-items: center; gap: 1.5rem;" data-nav-patched="true">\s*(<!-- Hamburger toggle -->)?\s*<div style="display: flex; align-items: center; gap: 1.5rem;" data-contact-patched="true">/g, 
    '<div style="display: flex; align-items: center; gap: 1.5rem;" data-contact-patched="true">');
    
    fs.writeFileSync(file, content);
    console.log('Patched', file);
  }
});
