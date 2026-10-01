// Check the production output, including rustkyll's generated sitemap.
// Usage: node scripts/check-seo.mjs [_site]
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '_site');
const origin = 'https://pocketshell.io';
const errors = [];
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
  .map(([, key, value]) => [key, decode(value)]));
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => decode(url));
if (!urls.length) errors.push('Sitemap has no URLs');
if (new Set(urls).size !== urls.length) errors.push('Sitemap contains duplicate URLs');
let blogPages = 0;
let blogLinks = 0;
for (const url of urls) {
  const parsed = new URL(url);
  if (parsed.origin !== origin) errors.push(`${url}: unexpected sitemap origin`);
  const relative = decodeURIComponent(parsed.pathname).replace(/^\//, '');
  const file = parsed.pathname.endsWith('/') ? `${relative}index.html` : relative;
  let html;
  try { html = await readFile(path.join(root, file), 'utf8'); }
  catch { errors.push(`${url}: missing generated HTML`); continue; }
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attrs(tag));
  const canonicals = links.filter(tag => tag.rel === 'canonical');
  if (canonicals.length !== 1 || canonicals[0].href !== url)
    errors.push(`${url}: canonical must match sitemap URL exactly`);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attrs(tag));
  const meta = (key, value) => metas.find(tag => tag[key] === value)?.content;
  if (meta('name', 'robots')?.includes('noindex')) errors.push(`${url}: noindex page in sitemap`);
  if (meta('property', 'og:url') !== url) errors.push(`${url}: og:url must match canonical`);
  const descriptions = metas.filter(tag => tag.name === 'description');
  const description = descriptions[0]?.content;
  if (descriptions.length !== 1 || !description || [...description].length > 160)
    errors.push(`${url}: expected one description of 1–160 characters`);
  for (const key of [['property', 'og:description'], ['name', 'twitter:description']])
    if (meta(...key) !== description) errors.push(`${url}: ${key[1]} differs from description`);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');
  if (!title || [...title].length > 70) errors.push(`${url}: expected title of 1–70 characters`);
  for (const [, source] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(source);
      if (data.url && data.url !== url) errors.push(`${url}: structured-data URL differs from canonical`);
    } catch { errors.push(`${url}: invalid JSON-LD`); }
  }
  if (parsed.pathname.startsWith('/blog/')) blogPages++;
  for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attrs(tag).href;
    if (!href) continue;
    const target = new URL(href, url);
    if (target.origin !== origin || !/^\/blog(?:\/|$)/.test(target.pathname)) continue;
    blogLinks++;
    if (!target.pathname.endsWith('/')) errors.push(`${url}: redirecting blog link ${href}`);
    if (!urls.includes(`${origin}${target.pathname}`)) errors.push(`${url}: blog link absent from sitemap ${href}`);
  }
}
if (!blogPages) errors.push('No blog pages checked');
if (!blogLinks) errors.push('No internal blog links checked');
if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`SEO check failed: ${errors.length} problems`);
  process.exitCode = 1;
} else {
  console.log(`SEO check passed: ${urls.length} sitemap pages, ${blogPages} blog pages, ${blogLinks} internal blog links`);
}
