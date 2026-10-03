// Copy the shipped desktop renderer byte-for-byte. Only index.html gains the
// browser demo IPC adapter; Vue components, icons, styles, and xterm are unchanged.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
let source = path.resolve(process.argv[2] || path.join(__dirname, '../../pocketshell-desktop/out/renderer'));
if (fs.existsSync(path.join(source, 'out/renderer/index.html'))) source = path.join(source, 'out/renderer');
const destination = path.resolve(__dirname, '../demo');
if (!fs.existsSync(path.join(source, 'index.html'))) throw new Error('Build the sibling desktop renderer first.');
fs.mkdirSync(destination, { recursive: true });
const license = path.resolve(source, '../../LICENSE');
if (fs.existsSync(license)) fs.copyFileSync(license, path.join(destination, 'LICENSE.txt'));
fs.rmSync(path.join(destination, 'assets'), { recursive: true, force: true });
fs.cpSync(path.join(source, 'assets'), path.join(destination, 'assets'), { recursive: true });
// Reuse the built main process's markdown preview stylesheet, not a site skin.
const mainBundle = fs.readFileSync(path.resolve(source, '../main/index.js'), 'utf8');
const tokens = mainBundle.match(/const PALETTE_TOKENS = \[[\s\S]*?\n\];/);
const stylesheet = mainBundle.match(/function markdownStylesheet\(style\) \{[\s\S]*?\n\}/);
if (!tokens || !stylesheet) throw new Error('Actual markdown preview stylesheet was not found in the built desktop main bundle.');
fs.writeFileSync(path.join(destination, 'preview-style.js'), tokens[0] + '\n' + stylesheet[0] + '\nwindow.demoMarkdownStylesheet = markdownStylesheet;\n');
let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
html = html.replace('<title>PocketShell</title>', '<meta name="robots" content="noindex, nofollow" />\n    <title>PocketShell interactive demo</title>');
html = html.replace('<script type="module"', '<script src="./preview-style.js"></script>\n    <script src="./preferences.js"></script>\n    <script src="./adapter.js"></script>\n    <script type="module"');
html = html.replace("connect-src 'self'", "connect-src 'none'");
fs.writeFileSync(path.join(destination, 'index.html'), html);
const hashes = {};
for (const name of fs.readdirSync(path.join(source, 'assets'))) {
 const file = path.join(source, 'assets', name);
 if (fs.statSync(file).isFile()) hashes[name] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
fs.writeFileSync(path.join(destination, 'renderer-manifest.json'), JSON.stringify({ source: 'pocketshell-desktop/out/renderer', assets: hashes }, null, 2) + '\n');
console.log(`Copied actual desktop renderer (${Object.keys(hashes).length} assets) to demo/.`);
