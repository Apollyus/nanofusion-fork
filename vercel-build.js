import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function run(cmd, cwd = process.cwd()) {
    fs.writeSync(1, `\n--- Running: ${cmd} (in ${cwd}) ---\n`);
    try {
        execSync(cmd, { stdio: 'inherit', cwd });
        fs.writeSync(1, `✅ Success: ${cmd}\n`);
    } catch (error) {
        fs.writeSync(1, `❌ Failed: ${cmd}\nError: ${error.message}\n`);
        process.exit(1);
    }
}

fs.writeSync(1, '🏁 Starting Vercel Build Wrapper...\n');
run('node sync-content.js');
run('mkdir -p dist');
run('cp -rv public/assets public/static dist/');
run('cp -rv index.html o-nas.html faq dist/');
run('npm install --legacy-peer-deps', path.join(process.cwd(), 'admin-panel'));
run('npm run build', path.join(process.cwd(), 'admin-panel'));
fs.writeSync(1, '🎉 Vercel Build Wrapper Completed Successfully!\n');
