// Browser-only replacement for Electron IPC. The renderer assets are the actual
// shipped desktop app. Every host, file, session and response below is local data.
(function () {
  'use strict';
  // The desktop composer claims focus on mount. In an embedded demo, that
  // must not scroll the marketing page past its hero. Keep native focus and
  // caller options, adding only the browser's preventScroll flag. A standalone
  // /demo/ window keeps the desktop renderer's original focus behavior.
  if (window.parent !== window) {
    const nativeFocus = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function (options) {
      return nativeFocus.call(this, { ...(options || {}), preventScroll: true });
    };
  }
  const now = Math.floor(Date.now() / 1000);
  const sessions = [['pocketshell-site', 'main', 'codex'], ['pocketshell-site', 'review', 'claude'], ['api-server', 'api-fix', 'codex'], ['api-server', 'tests', 'opencode'], ['pocketshell-cli', 'main', 'grok'], ['pocketshell-cli', 'docs', 'claude']].map(([folder, name, agentKind], i) => ({ name, path: '/home/demo/git/' + folder, workspace: '/home/demo/git/' + folder, tag: name, backend: 'aplexer', aplexerId: 'demo-' + i, agentKind, created: now - 3600, activity: now - i * 60, attached: i === 0, aplexerPhase: 'running' }));
  const host = { name: 'devbox', hostname: 'devbox.example', port: 22, user: 'demo', identityFile: null, proxyJump: null, forwardAgent: false };
  const handlers = new Map(), shells = new Map(), files = new Map(), dirs = new Set(['/home/demo', '/home/demo/git']);
  const encoder = new TextEncoder();
  const normalize = p => (p === '.' || !p ? '/home/demo' : p.replace(/^~(?=\/|$)/, '/home/demo')).replace(/\/$/, '');
  const scenarios = {
    'demo-0': { task: 'Make the homepage navigation usable on phones.', lines: ['• Updated landing-design.css', '  Navigation wraps cleanly at 320px; the desktop rail stays fixed.', '', '• Checked the homepage in Chromium', '  \x1b[32m✓ 320px, 390px, and 1440px layouts passed\x1b[0m', '', '• Ready to review the responsive navigation.'], reply: 'The homepage navigation now fits small screens. The browser checks cover 320px, 390px, and desktop.' },
    'demo-1': { task: 'Review the homepage copy and alpha access details.', lines: ['• Read the hero, setup steps, and security section', '  The product category is clear and the host CLI requirement is visible.', '', '• Found two copy changes', '  Keep the allowlist note beside the sign-in action.', '  Describe encrypted host sync separately from SSH key handling.', '', '• Copy review complete. No source files changed.'], reply: 'The copy review covers the SSH setup requirement, allowlisted alpha access, and the distinction between host sync and private keys.' },
    'demo-2': { task: 'Add a health endpoint to the API service.', lines: ['• Edited src/health.ts', '  GET /health returns { status: "ok" } without authentication.', '', '• Ran npm test -- health', '  \x1b[32m✓ health responds with 200\x1b[0m', '  \x1b[32m✓ response has the expected JSON shape\x1b[0m', '', '• Endpoint is ready for the deployment probe.'], reply: 'The health endpoint returns status ok, and its request tests cover HTTP 200 plus the JSON response.' },
    'demo-3': { task: 'Run the API regression suite before merging.', lines: ['$ npm test', '', ' RUN  v3.2.0 /home/demo/git/api-server', ' \x1b[32m✓ tests/health.test.ts (2 tests)\x1b[0m', ' \x1b[32m✓ tests/auth.test.ts (8 tests)\x1b[0m', ' \x1b[32m✓ tests/validation.test.ts (14 tests)\x1b[0m', '', ' Test Files  3 passed (3)', '      Tests  24 passed (24)', '', '• Regression suite passed.'], reply: 'All 24 API tests pass across health, authentication, and request validation.' },
    'demo-4': { task: 'Improve the CLI attach command error message.', lines: ['• Edited src/attach.ts', '  An unknown session now lists the available session names.', '', '$ pocketshell attach missing-session', 'Session "missing-session" was not found.', 'Available sessions: main, docs', '', '• Ran the command parser tests', '  \x1b[32m✓ 12 parser tests passed\x1b[0m'], reply: 'The attach command now explains an unknown session and shows the names available on that host.' },
    'demo-5': { task: 'Document reconnecting to an existing agent session.', lines: ['• Updated docs/sessions.md', '  Added examples for listing sessions and attaching again.', '', '  $ pocketshell sessions', '  $ a attach main', '', '• Checked the command examples', '  Closing a client leaves the session on the host.', '  Another client can attach to that same session.', '', '• Session guide is ready for review.'], reply: 'The session guide now demonstrates listing sessions, reconnecting with a attach, and what survives a client disconnect.' }
  };
  const projects = {
    'pocketshell-site': { description: 'PocketShell marketing site, with responsive navigation and an embedded desktop demo.', scripts: { build: 'rustkyll build', check: 'node scripts/check-seo.mjs' }, files: { 'landing-design.css': '.ps-nav { display: flex; flex-wrap: wrap; }\n', 'docs/copy-review.md': '# Copy review\n\nKeep alpha access and the host CLI requirement explicit.\n' } },
    'api-server': { description: 'API service with health checks, authentication, and request validation.', scripts: { test: 'vitest run', start: 'node src/server.ts' }, files: { 'src/health.ts': 'export function health() {\n  return { status: "ok" };\n}\n', 'tests/health.test.ts': 'test("health responds with status ok", () => {\n  expect(health()).toEqual({ status: "ok" });\n});\n' } },
    'pocketshell-cli': { description: 'Command-line tools for starting, listing, and attaching to agent sessions.', scripts: { test: 'vitest run -- parser', build: 'tsc' }, files: { 'src/attach.ts': 'export function missingSession(names: string[]) {\n  return "Available sessions: " + names.join(", ");\n}\n', 'docs/sessions.md': '# Reconnect to a session\n\nList sessions with pocketshell sessions, then use a attach main.\n\nClosing the client leaves the session on your host.\n' } }
  };
  for (const [name, project] of Object.entries(projects)) {
    const folder = '/home/demo/git/' + name; dirs.add(folder);
    files.set(folder + '/README.md', '# ' + name + '\n\n' + project.description + '\n');
    files.set(folder + '/package.json', JSON.stringify({ name, scripts: project.scripts }, null, 2));
    for (const [relative, content] of Object.entries(project.files)) {
      const path = folder + '/' + relative;
      let parent = path.slice(0, path.lastIndexOf('/'));
      while (parent.startsWith(folder)) { dirs.add(parent); parent = parent.slice(0, parent.lastIndexOf('/')); }
      files.set(path, content);
    }
  }
  function subscribe(channel, fn) { if (!handlers.has(channel)) handlers.set(channel, new Set()); handlers.get(channel).add(fn); return () => handlers.get(channel).delete(fn); }
  function emit(channel, data) { for (const fn of handlers.get(channel) || []) fn(data); }
  function data(id, text) { emit('shell.onData', { shellId: id, data: encoder.encode(text) }); }
  function write(id, text) { const shell = shells.get(id); if (shell) shell.transcript += text; data(id, text); }
  function initialTranscript(session) {
    const scenario = scenarios[session.aplexerId] || { task: 'Start a new task in this project.', lines: ['• A fresh demo session is ready.'], reply: 'This new session is ready for a project task.' };
    const agent = { codex: 'OpenAI Codex', claude: 'Claude Code', opencode: 'OpenCode', grok: 'Grok' }[session.agentKind] || 'Shell';
    return ['\x1b[36m>_ ' + agent + ' · ' + session.name + '\x1b[0m', '   ' + session.workspace.replace('/home/demo', '~'), '', '\x1b[100m› ' + scenario.task + '\x1b[0m', '', ...scenario.lines, '', '› '].join('\r\n');
  }
  function welcome(id) {
    const shell = shells.get(id); if (!shell) return;
    data(id, '\x1b[3J\x1b[2J\x1b[H' + shell.transcript);
  }
  function attach(payload) {
    // Names such as "main" repeat across projects. Resolve immutable IDs first,
    // then canonical workspace + tag; never select another project's main tab.
    const workspace = payload.workspace ? normalize(payload.workspace) : null;
    const tag = payload.tag || payload.sessionName;
    const session = (payload.aplexerId && sessions.find(s => s.aplexerId === payload.aplexerId))
      || (workspace && sessions.find(s => s.workspace === workspace && s.tag === tag))
      || sessions.find(s => s.name === payload.sessionName && (!workspace || s.workspace === workspace))
      || sessions[0];
    const id = 'demo-shell-' + session.aplexerId;
    if (!shells.has(id)) shells.set(id, { session, input: '', transcript: initialTranscript(session) });
    setTimeout(() => welcome(id), 120);
    return { shellId: id, switched: false };
  }
  function entry(path, type) { return { name: path.split('/').pop(), longname: (type === 'dir' ? 'd' : '-') + 'rwxr-xr-x', rights: { user: 'rwx', group: 'r-x', other: 'r-x' }, owner: 1000, group: 1000, modifyTime: now * 1000, accessTime: now * 1000, type, size: type === 'file' ? encoder.encode(files.get(path) || '').length : 0, mtime: now, mode: type === 'dir' ? 493 : 420 }; }
  function list(path) { path = normalize(path); const prefix = path + '/'; const rows = []; for (const dir of dirs) if (dir.startsWith(prefix) && !dir.slice(prefix.length).includes('/')) rows.push(entry(dir, 'dir')); for (const name of files.keys()) if (name.startsWith(prefix) && !name.slice(prefix.length).includes('/')) rows.push(entry(name, 'file')); return rows; }
  async function call(group, name, args) {
    const [a, b, c] = args;
    if (group === 'shell') {
      if (name === 'attachSession') return attach(a);
      if (name === 'open') return attach({ sessionName: 'main' }).shellId;
      if (name === 'input') {
        const shell = shells.get(a); if (!shell) return false;
        if (c && c !== shell.session.name || args[3] && normalize(args[3]) !== shell.session.workspace) return false;
        const text = String(b).replace(/\x1b\[20[01]~/g, '');
        if (text === '\r' || text === '\n') {
          const prompt = shell.input.trim(); shell.input = '';
          if (prompt) setTimeout(() => {
            const scenario = scenarios[shell.session.aplexerId];
            write(a, '\r\n\r\n• Demo response · ' + shell.session.name + '\r\n  ' + (scenario?.reply || 'This session is ready for your next project task.') + '\r\n  Prompt: ' + prompt.replace(/[\r\n]/g, ' ').slice(0, 300) + '\r\n\r\n› ');
          }, 180);
          else write(a, '\r\n› ');
        } else if (text === '\x7f') {
          shell.input = shell.input.slice(0, -1); write(a, '\b \b');
        } else { shell.input += text; write(a, text); }
        return true;
      }
      if (name === 'windowSize') return { kind: 'live', cols: 100, rows: 30, client: { cols: 100, rows: 30 }, window: { cols: 100, rows: 30 } };
      if (name === 'redraw') { welcome(a); return true; }
      return true;
    }
    if (group === 'helper') {
      if (name === 'sessionsList') return sessions;
      if (name === 'sessionsListing') return { sessions, errors: [] };
      if (name === 'bootstrap') return { pocketshell: 'installed', tmuxctl: 'installed', tmux: 'installed', aplexer: 'installed', installer: 'uv', daemonRunning: true, daemonEnabled: true };
      if (name === 'usage' || name === 'warnings') return [];
      if (name === 'ackWarnings') return { ok: true, acknowledged: 0 };
      return true;
    }
    if (group === 'ssh') { if (name === 'listConfigHosts') return [host]; if (name === 'connect') return { ok: true, connectionId: 'demo' }; if (name === 'exec') return { stdout: 'Sample demo output\n', stderr: '', code: 0, exitCode: 0 }; return true; }
    if (group === 'projects') {
      if (name === 'home') return { ok: true, home: '/home/demo' };
      if (name === 'deriveName') return c || normalize(b).split('/').pop();
      if (name === 'createFolder') { const path = normalize(b.parent) + '/' + b.name; dirs.add(path); return { ok: true, path }; }
      if (name === 'reposList') return { ok: false, repos: [], local: { state: 'ok', repos: [], error: null }, remote: { state: 'gh-unauthenticated', repos: [], error: null } };
      if (name === 'reposClone') return { ok: false, error: 'Cloning external repositories is unavailable in this local demo.' };
      if (name === 'startSession') { const folder = normalize(b.folder || b.path || '/home/demo/git/pocketshell-site'); const name = b.customName || b.name || 'demo-' + (sessions.length + 1); const session = { ...sessions[0], name, tag: name, path: folder, workspace: folder, aplexerId: 'demo-' + sessions.length, agentKind: b.agentKind || 'codex', activity: now }; sessions.push(session); dirs.add(folder); return { ok: true, sessionName: name, folder, via: 'aplexer', error: null, code: null, name, session, reused: false, path: folder, backend: 'aplexer', workspace: folder, tag: name, aplexerId: session.aplexerId }; }
      if (name === 'renameSession') { const session = sessions.find(s => s.name === b); if (session) { session.name = c; session.tag = c; } return { ok: true, name: c, error: null, code: null }; }
      if (name === 'killSession') { const index = sessions.findIndex(s => s.name === b); if (index >= 0) sessions.splice(index, 1); return { ok: true }; }
    }
    if (group === 'sftp') {
      if (name === 'list') return list(b);
      if (name === 'realPath') return normalize(b);
      if (name === 'stat') { const path = normalize(b); return { ...entry(path, dirs.has(path) ? 'dir' : 'file'), path }; }
      if (name === 'readFile') return files.get(normalize(b)) || '';
      if (name === 'readBinary') return encoder.encode(files.get(normalize(b)) || '');
      if (name === 'writeFile' || name === 'createFile') { files.set(normalize(b), c || ''); return true; }
      if (name === 'mkdir') { dirs.add(normalize(b)); return true; }
      if (name === 'rename') { files.set(normalize(c), files.get(normalize(b)) || ''); files.delete(normalize(b)); return true; }
      if (name === 'deleteFile') { files.delete(normalize(b)); return true; }
      if (name === 'rmdir') { dirs.delete(normalize(b)); return true; }
      if (name === 'saveAs') { const blob = new Blob([files.get(normalize(a.remotePath)) || ''], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = a.remotePath.split('/').pop(); link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); return a.remotePath; }
      return true;
    }
    if (group === 'preview') {
      if (name.startsWith('open')) {
        const source = files.get(normalize(b)) || '';
        const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const style = c || { appearance: 'dark', palette: {} };
        if (!c) { const computed = getComputedStyle(document.documentElement); for (const token of ['--bg','--surface','--surface-2','--fg','--fg-secondary','--border','--border-soft','--border-strong','--accent','--term-bg','--term-fg','--font-ui','--font-mono']) style.palette[token] = computed.getPropertyValue(token).trim(); }
        const body = source.split(/\n\n+/).map(block => block.startsWith('# ') ? '<h1>' + escape(block.slice(2)) + '</h1>' : '<p>' + escape(block).replace(/\n/g, '<br>') + '</p>').join('');
        const documentHtml = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>' + window.demoMarkdownStylesheet(style) + '</style><body><main class="md">' + body + '</main></body></html>';
        const url = URL.createObjectURL(new Blob([documentHtml], { type: 'text/html' }));
        return { token: url, url };
      }
      if (name === 'release') URL.revokeObjectURL(a);
      return true;
    }
    if (group === 'forwards') { if (['scan', 'list', 'discovered'].includes(name)) return []; if (name === 'status') return null; if (name === 'isAutoEnabled') return false; return true; }
    if (group === 'agent') { if (name === 'kinds') return ['claude', 'codex', 'opencode', 'grok']; if (['profiles', 'envList'].includes(name)) return []; if (name === 'envGet') return {}; return true; }
    if (group === 'attachments') { if (name === 'pickFiles') return []; if (name === 'stage') return { ok: true, paths: [] }; return encoder.encode('Demo attachment'); }
    if (group === 'sync') { if (name === 'status') return { enabled: false, authenticated: false, available: false, signedIn: false }; if (name === 'accountHosts') return null; if (name === 'login') return null; if (name === 'pull') return { status: 'empty' }; return true; }
    if (group === 'update' && name === 'check') return { kind: 'up-to-date', status: 'up-to-date', currentVersion: '0.1.4' };
    if (group === 'diag') { console.debug('Demo renderer diagnostic:', a); return true; }
    return true;
  }
  const groups = ['win', 'app', 'ssh', 'shell', 'helper', 'projects', 'sftp', 'preview', 'forwards', 'attachments', 'agent', 'diag', 'update', 'editors', 'sync'];
  window.api = Object.fromEntries(groups.map(group => [group, new Proxy({}, { get: (_, name) => typeof name !== 'string' ? undefined : name.startsWith('on') ? fn => subscribe(group + '.' + name, fn) : (...args) => call(group, name, args) })]));
  localStorage.setItem('pocketshell.settings.v1', JSON.stringify({ theme: 'dark', terminalFontSize: 14 }));
  const boot = setInterval(async () => {
    const app = document.querySelector('#app')?.__vue_app__;
    const pinia = app?.config.globalProperties.$pinia;
    const connection = pinia?._s.get('connection');
    if (!connection) return;
    clearInterval(boot);
    connection.connectionId = 'demo'; connection.state = 'connected'; connection.activeHost = host;
    await app.config.globalProperties.$router.push({ name: 'folder', params: { name: 'devbox', folder: '~/git/pocketshell-site' } });
    window.parent.postMessage({ type: 'pocketshell-demo-ready' }, location.origin);
  }, 40);
})();
