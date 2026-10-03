const PALETTE_TOKENS = [
  "--bg",
  "--surface",
  "--surface-2",
  "--fg",
  "--fg-secondary",
  "--border",
  "--border-soft",
  "--border-strong",
  "--accent",
  "--term-bg",
  "--term-fg",
  "--font-ui",
  "--font-mono"
];
function markdownStylesheet(style) {
  const vars = PALETTE_TOKENS.map((token) => `${token}:${style.palette[token]};`).join("");
  return `
:root{${vars}color-scheme:${style.appearance};}
*{box-sizing:border-box;}
html,body{margin:0;padding:0;background:var(--bg);color:var(--fg);}
body{font-family:var(--font-ui);font-size:14px;line-height:1.6;}
.md{max-width:52rem;margin:0 auto;padding:24px 28px 64px;}
.md>*:first-child{margin-top:0;}
h1,h2,h3,h4,h5,h6{line-height:1.25;margin:1.6em 0 .6em;font-weight:600;}
h1{font-size:1.9em;}h2{font-size:1.45em;}h3{font-size:1.2em;}
h4,h5,h6{font-size:1em;}
h1,h2{padding-bottom:.3em;border-bottom:1px solid var(--border-soft);}
h4,h5,h6{color:var(--fg-secondary);}
p{margin:0 0 1em;}
a{color:var(--accent);text-decoration:underline;text-underline-offset:2px;}
strong{font-weight:600;}
hr{border:none;border-top:1px solid var(--border);margin:2em 0;}
ul,ol{margin:0 0 1em;padding-left:1.6em;}
li{margin:.25em 0;}
li>input[type=checkbox]{margin-right:.4em;}
blockquote{margin:0 0 1em;padding:.1em 1em;border-left:3px solid var(--border-strong);color:var(--fg-secondary);}
code,kbd,samp{font-family:var(--font-mono);font-size:.92em;}
:not(pre)>code{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:4px;padding:.12em .35em;}
pre{background:var(--term-bg);color:var(--term-fg);border:1px solid var(--border);border-radius:6px;padding:12px 14px;margin:0 0 1em;overflow-x:auto;}
pre code{background:none;border:none;padding:0;font-size:.92em;}
table{border-collapse:collapse;margin:0 0 1em;display:block;width:max-content;max-width:100%;overflow-x:auto;}
th,td{border:1px solid var(--border);padding:.4em .7em;text-align:left;}
th{background:var(--surface);font-weight:600;}
tr:nth-child(even) td{background:var(--surface-2);}
img{max-width:100%;height:auto;}
/* A long path or URL in prose must wrap rather than widen the document: the
   pane is narrow, and a horizontal scrollbar on the BODY makes every other
   line unreadable. Code blocks and tables scroll inside themselves instead. */
p,li,h1,h2,h3,h4,h5,h6{overflow-wrap:anywhere;}
/* The frontmatter table is metadata, not data: a long content id or video URL
   is every row of it, so the cells wrap like prose does instead of pressing
   the table's own scroller into service for a two-column key/value list. */
.md-frontmatter th,.md-frontmatter td{overflow-wrap:anywhere;}
`.trim();
}
window.demoMarkdownStylesheet = markdownStylesheet;
