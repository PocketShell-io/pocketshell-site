// PocketShell design contract: status belongs in fills/text, never borders.
// Validates that all site CSS adheres to the no-accent-borders rule.
import { readFileSync, readdirSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import assert from 'node:assert/strict';

const statusToken = /--(?:accent|danger|warn|ok|success|error|focus-ring)(?:[\w-]*)\b/i;
const colorLiteral = /#[\da-f]{3,8}\b|(?:rgba?|hsla?|oklch|oklab|color)\([^)]*\)|\b(?:cyan|green|red|amber|orange|yellow|blue|purple|magenta|lime|teal|pink)\b/gi;

export function colored(value, tokens, seen = new Set()) {
  if (statusToken.test(value)) return true;
  for (const match of value.matchAll(/var\((--[\w-]+)/g)) {
    if (seen.has(match[1])) continue;
    const next = new Set(seen).add(match[1]);
    if ((tokens.get(match[1]) ?? []).some(v => colored(v, tokens, next))) return true;
  }
  return [...value.matchAll(colorLiteral)].some(([color]) => {
    if (/^#/.test(color)) {
      let hex = color.slice(1);
      if (hex.length < 5) hex = [...hex].map(c => c + c).join('');
      const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
      return Math.max(...rgb) - Math.min(...rgb) > 24;
    }
    if (/^rgba?\(/i.test(color)) {
      const rgb = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [];
      return rgb.length !== 3 || Math.max(...rgb) - Math.min(...rgb) > 24;
    }
    return true;
  });
}

export function parseRules(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, m => '\n'.repeat((m.match(/\n/g) || []).length));
  const rules = [];
  let buffer = '';
  let line = 1;
  const stack = [];

  for (let i = 0; i < stripped.length; i++) {
    const ch = stripped[i];
    if (ch === '\n') line++;

    if (ch === '{') {
      const selector = buffer.trim();
      buffer = '';
      stack.push({ selector, startLine: line, isAtRule: selector.startsWith('@') });
    } else if (ch === '}') {
      const top = stack.pop();
      if (top && !top.isAtRule) {
        const decls = [];
        let dBuffer = '';
        let parenDepth = 0;
        for (let j = 0; j < buffer.length; j++) {
          const dCh = buffer[j];
          if (dCh === '(') parenDepth++;
          else if (dCh === ')') parenDepth--;

          if (dCh === ';' && parenDepth === 0) {
            const colonIdx = dBuffer.indexOf(':');
            if (colonIdx > 0) {
              decls.push({
                prop: dBuffer.slice(0, colonIdx).trim(),
                value: dBuffer.slice(colonIdx + 1).trim(),
                line: top.startLine,
              });
            }
            dBuffer = '';
          } else {
            dBuffer += dCh;
          }
        }
        if (dBuffer.trim()) {
          const colonIdx = dBuffer.indexOf(':');
          if (colonIdx > 0) {
            decls.push({
              prop: dBuffer.slice(0, colonIdx).trim(),
              value: dBuffer.slice(colonIdx + 1).trim(),
              line: top.startLine,
            });
          }
        }
        rules.push({ selector: top.selector, decls, line: top.startLine });
      }
      buffer = '';
    } else {
      buffer += ch;
    }
  }
  return rules;
}

export function accentBorderViolations(css, inheritedTokens = new Map()) {
  const rules = parseRules(css);
  const tokens = new Map([...inheritedTokens].map(([key, values]) => [key, [...values]]));

  for (const rule of rules) {
    for (const d of rule.decls) {
      if (d.prop.startsWith('--')) {
        tokens.set(d.prop, [...(tokens.get(d.prop) ?? []), d.value]);
      }
    }
  }

  const violations = [];
  for (const rule of rules) {
    const selectors = rule.selector.split(',').map(s => s.trim());
    const isFocusOnly = selectors.every(s => /:focus-visible\b/.test(s));

    for (const d of rule.decls) {
      if (!/^(?:border(?:-(?!radius)[\w-]+)?|outline(?:-(?:color|width|style))?|box-shadow)$/.test(d.prop)) continue;
      if (isFocusOnly && /^(outline|box-shadow)/.test(d.prop)) continue;

      const cleanValue = d.value.replace(/\s*!important/i, '').trim();
      if (colored(cleanValue, tokens)) {
        violations.push({ line: d.line, selector: rule.selector, property: d.prop, value: d.value, reason: 'accent/status color on a border, outline, or shadow' });
      } else if (/^border-(?:width|color|style)$/.test(d.prop)) {
        const sides = cleanValue.split(/\s+/);
        if (sides.length > 1 && new Set(sides).size > 1) {
          violations.push({ line: d.line, selector: rule.selector, property: d.prop, value: d.value, reason: 'unequal per-side border list' });
        }
      }
    }
  }
  return violations;
}

export function styleSources(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '_site', '.bin', 'assets'].includes(entry.name)) continue;
      results.push(...styleSources(file));
    } else if (extname(file) === '.css') {
      results.push({ file, css: readFileSync(file, 'utf8') });
    }
  }
  return results;
}

export function scanAccentBorders(directory) {
  const sources = styleSources(directory);
  const tokens = new Map();
  for (const { css } of sources) {
    for (const rule of parseRules(css)) {
      for (const d of rule.decls) {
        if (d.prop.startsWith('--')) {
          tokens.set(d.prop, [...(tokens.get(d.prop) ?? []), d.value]);
        }
      }
    }
  }
  return sources.flatMap(({ file, css }) => accentBorderViolations(css, tokens).map(v => ({ file, ...v })));
}

// Self-test with design contract fixtures
function runFixtures() {
  const rejects = [
    'border-left: 3px solid var(--accent)',
    'border-inline-start: 2px solid cyan',
    'border-block-end: 1px solid var(--warning)',
    'border: 1px solid var(--danger)',
    'border-color: #ff0000',
    'outline: 2px solid rgb(255, 0, 0)',
    'box-shadow: inset 0 0 0 1px var(--ok)',
    'box-shadow: 0 0 0 2px var(--success-soft)',
    'border-width: 1px 0 0 3px',
    'border-color: #23272e #33383f',
  ];
  for (const decl of rejects) {
    const v = accentBorderViolations(`.card { ${decl}; }`);
    assert(v.length > 0, `Expected rejection for: ${decl}`);
  }

  const allows = [
    '.card { border: 1px solid var(--border); }',
    '.row { border-top: 1px solid #23272e; border-bottom: 1px solid var(--border-soft); }',
    'input:hover { border-color: var(--border-strong); }',
    'button:focus-visible { outline: 2px solid var(--accent); }',
    'input:focus-visible { box-shadow: 0 0 0 2px var(--accent); }',
    '.warning { background: var(--error-soft); color: var(--error); border: none; }',
    '.card { border-width: 1px 1px 1px 1px; }',
  ];
  for (const css of allows) {
    const v = accentBorderViolations(css);
    assert.deepEqual(v, [], `Expected allowed for: ${css}`);
  }

  assert.equal(
    accentBorderViolations('.card, button:focus-visible { outline: 1px solid red; }').length,
    1,
    'Expected rejection when non-focus selector is mixed with focus-visible',
  );

  assert.equal(
    accentBorderViolations(':root { --stripe: var(--error); } .card { border: 1px solid var(--stripe); }').length,
    1,
    'Expected rejection for color token aliases',
  );

  return rejects.length + allows.length + 2;
}

// When run directly as a script
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename ?? '');
if (isMain || !process.env.VITEST) {
  let fixtureCount = 0;
  try {
    fixtureCount = runFixtures();
  } catch (err) {
    console.error('Fixture test failed:', err);
    process.exit(1);
  }

  const root = resolve(process.argv[2] || '.');
  const sources = styleSources(root);
  const violations = scanAccentBorders(root);

  if (violations.length > 0) {
    console.error(`Accent borders check failed: ${violations.length} violation(s) found:`);
    for (const v of violations) {
      console.error(`  ${v.file}:${v.line} [${v.selector}] ${v.property}: ${v.value} (${v.reason})`);
    }
    process.exit(1);
  } else {
    console.log(`Accent borders check passed: ${fixtureCount} fixture tests passed, ${sources.length} CSS files checked with 0 violations`);
  }
}
