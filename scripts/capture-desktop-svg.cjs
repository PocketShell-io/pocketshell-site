// Export the real desktop renderer, not a hand-drawn imitation.
// The IPC transport supplies sample data; Vue and xterm render the UI unchanged.
// Chromium prints vector geometry and glyphs; Poppler converts it to standalone SVG.
// Requires the built sibling desktop app, Playwright/Chromium, and pdftocairo.
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const desktop = path.resolve(process.argv[2] || path.join(__dirname, '../../pocketshell-desktop'));
const { chromium } = require(path.join(desktop, 'node_modules/playwright'));
const root = path.join(desktop, 'out/renderer');
const output = path.join(__dirname, '../images/desktop/session-workspace.svg');
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'pocketshell-vector-'));
let browser;
function chromiumPath() {
    if (process.env.CHROMIUM_PATH)
        return process.env.CHROMIUM_PATH;
    if (fs.existsSync(chromium.executablePath()))
        return chromium.executablePath();
    const cache = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(os.homedir(), '.cache/ms-playwright');
    for (const directory of fs.readdirSync(cache).filter(name => /^chromium-\d+$/.test(name)).sort().reverse()) {
        for (const file of ['chrome-linux64/chrome', 'chrome-linux/chrome']) {
            const candidate = path.join(cache, directory, file);
            if (fs.existsSync(candidate))
                return candidate;
        }
    }
    throw new Error('Install Playwright Chromium or set CHROMIUM_PATH.');
}
const server = http.createServer((req, res) => { const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0])); if (!file.startsWith(root + path.sep)) {
    res.statusCode = 403;
    res.end();
    return;
} try {
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.woff2') ? 'font/woff2' : 'text/html');
    res.end(fs.readFileSync(file));
}
catch {
    res.statusCode = 404;
    res.end();
} });
(async () => {
    try {
        await new Promise(r => server.listen(0, '127.0.0.1', r));
        browser = await chromium.launch({ headless: true, executablePath: chromiumPath(), args: ['--no-sandbox'] });
        const page = await browser.newPage({ viewport: { width: 1100, height: 620 }, bypassCSP: true });
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.addInitScript(() => {
            const now = Math.floor(Date.now() / 1000);
            const sessions = [['pocketshell-site', 'review', 'claude'], ['pocketshell-site', 'api-fix', 'codex'], ['pocketshell-site', 'main', 'codex'], ['pocketshell', 'main', 'claude'], ['aplexer', 'main', 'codex'], ['aplexer', 'review', 'codex'], ['pocketshell-cli', 'main', 'codex'], ['dataops', 'main', 'codex'], ['ai-shipping-labs', 'main', 'claude'], ['relay', 'main', 'codex']].map(([folder, name, agentKind], i) => ({ name, path: '/home/demo/git/' + folder, workspace: '/home/demo/git/' + folder, tag: name, backend: 'aplexer', aplexerId: 'demo-' + i, agentKind, created: now - 3600, activity: now - i * 60, attached: i === 1, aplexerPhase: 'running' }));
            window.captureSessions = sessions;
            window.captureListeners = [];
            const groups = ['win', 'app', 'ssh', 'shell', 'helper', 'projects', 'sftp', 'preview', 'forwards', 'attachments', 'agent', 'diag', 'update', 'editors', 'sync'];
            window.api = Object.fromEntries(groups.map(group => [group, new Proxy({}, { get: (_, name) => {
                        if (typeof name !== 'string')
                            return undefined;
                        if (name === 'onData')
                            return fn => { window.captureListeners.push(fn); return () => { }; };
                        if (name.startsWith('on'))
                            return () => () => { };
                        if (name === 'listConfigHosts')
                            return async () => [{ name: 'devbox', hostname: 'devbox.example', port: 22, user: 'demo', identityFile: null, proxyJump: null, forwardAgent: false }];
                        if (name === 'sessionsList')
                            return async () => sessions;
                        if (name === 'sessionsListing')
                            return async () => ({ sessions, errors: [] });
                        if (name === 'home')
                            return async () => ({ ok: true, home: '/home/demo' });
                        if (name === 'bootstrap')
                            return async () => ({ pocketshell: 'installed', tmuxctl: 'installed', tmux: 'installed', aplexer: 'installed', installer: 'uv', daemonRunning: true, daemonEnabled: true });
                        if (name === 'attachSession')
                            return async () => ({ shellId: 'capture-shell', switched: false });
                        if (name === 'open')
                            return async () => 'capture-shell';
                        if (name === 'list')
                            return async () => [];
                        if (name === 'status')
                            return async () => ({ enabled: false, authenticated: false });
                        if (name === 'isAutoEnabled')
                            return async () => false;
                        if (name === 'log')
                            return async (...args) => { console.log('DIAG', ...args); return true; };
                        if (name === 'windowSize')
                            return async () => ({ cols: 90, rows: 30 });
                        return async () => true;
                    } })]));
            localStorage.setItem('pocketshell.settings.v1', JSON.stringify({ theme: 'dark', terminalFontSize: 15 }));
        });
        await page.goto('http://127.0.0.1:' + server.address().port);
        await page.waitForSelector('#app > *');
        await page.evaluate(async () => {
            const app = document.querySelector('#app').__vue_app__;
            const pinia = app.config.globalProperties.$pinia;
            const connection = pinia._s.get('connection');
            connection.connectionId = 'capture';
            connection.state = 'connected';
            connection.activeHost = { name: 'devbox', hostname: 'devbox.example', port: 22, user: 'demo', identityFile: null, proxyJump: null, forwardAgent: false };
            await app.config.globalProperties.$router.push({ name: 'folder', params: { name: 'devbox', folder: '~/git/pocketshell-site' } });
        });
        await page.waitForFunction(() => window.captureListeners.length > 0);
        await page.getByRole('button', { name: 'Close the prompt panel', exact: true }).waitFor();
        await page.evaluate(() => {
            const output = [
                '\x1b[2J\x1b[H\x1b[94m>_\x1b[0m OpenAI Codex',
                '   ~/git/pocketshell-site', '',
                '\x1b[100m› Add keyboard navigation to the session tabs.\x1b[0m',
                '\x1b[100m  Keep the active agent visible in the sidebar.\x1b[0m', '',
                '• Updated src/components/SessionTabs.vue',
                '  Arrow keys switch tabs; Enter opens the session.', '',
                '• Ran npm test',
                '  \x1b[32m✓ 24 tests passed\x1b[0m', '',
                '• Ready for review.',
                '  Keyboard navigation and agent icons are in place.', '', '',
                '\x1b[90m› Ask Codex to do anything\x1b[0m', '',
                '\x1b[90mCodex · ~/git/pocketshell-site\x1b[0m',
            ].join('\r\n');
            for (const listener of window.captureListeners)
                listener({ shellId: 'capture-shell', data: new TextEncoder().encode(output) });
        });
        await page.getByRole('button', { name: 'Close the prompt panel', exact: true }).click();
        await page.waitForFunction(() => document.querySelector('.xterm-rows')?.textContent.includes('Ready for review.'));
        await page.evaluate(() => document.fonts.ready);
        await page.emulateMedia({ media: 'screen' });
        await page.addStyleTag({ content: '* { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-shadow: none !important; text-shadow: none !important; filter: none !important; }' });
        if (errors.length)
            throw new Error(errors.join('\n'));
        // Shadows/filters can rasterize during print; omit only those decorations.
        await page.screenshot({ path: path.join(scratch, 'preview.png') });
        await page.pdf({ path: path.join(scratch, 'capture.pdf'), width: '1100px', height: '620px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
        execFileSync('pdftocairo', ['-svg', path.join(scratch, 'capture.pdf'), path.join(scratch, 'capture.svg')]);
        let svg = fs.readFileSync(path.join(scratch, 'capture.svg'), 'utf8');
        if (/<image\b|data:image|<foreignObject\b/.test(svg)) {
            throw new Error('Capture contains raster or HTML content; refusing to replace the vector asset.');
        }
        svg = svg.replace(/width="[^"]+" height="[^"]+"/, 'width="1100" height="620"');
        svg = svg.replace(/(<svg[^>]+>)/, '$1\n<title>PocketShell desktop session workspace</title>\n<desc>Vector capture of the actual desktop renderer with sample project and terminal data.</desc>');
        fs.writeFileSync(output, svg);
        console.log(`Saved vector desktop capture: ${output}`);
    }
    finally {
        if (browser)
            await browser.close();
        server.close();
        fs.rmSync(scratch, { recursive: true, force: true });
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
