// Protect the invariant that the embedded interface is the original app bundle.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const directory = path.resolve(process.argv[2] || '_site/demo');
const manifest = JSON.parse(await readFile(path.join(directory, 'renderer-manifest.json'), 'utf8'));
const entries = Object.entries(manifest.assets);
if (!entries.length) throw new Error('Missing desktop renderer assets');
for (const [name, expected] of entries) {
  if (path.basename(name) !== name) throw new Error('Invalid renderer asset path');
  const bytes = await readFile(path.join(directory, 'assets', name));
  if (createHash('sha256').update(bytes).digest('hex') !== expected)
    throw new Error(`Desktop renderer asset was changed: ${name}`);
}
console.log(`Demo check passed: ${entries.length} original desktop renderer assets`);
