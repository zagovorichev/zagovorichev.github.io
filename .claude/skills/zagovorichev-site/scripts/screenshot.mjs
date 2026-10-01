// Screenshot pages of the built site in light, dark and mobile to review design changes.
// Usage: node .claude/skills/zagovorichev-site/scripts/screenshot.mjs [/path ...]
// Builds nothing: run `npm run build` first. Images go to ./screenshots/ (git-ignored).
import {createServer} from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

let playwright;
try {
  playwright = await import('playwright');
} catch {
  // Claude Code cloud containers ship Playwright globally
  playwright = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
}

const out = path.resolve('out');
if (!fs.existsSync(out)) throw new Error('No ./out — run `npm run build` first');
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const types = {'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain'};

const server = createServer((req, res) => {
  let file = path.join(out, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) file = path.join(out, '404.html');
  res.setHeader('Content-Type', types[path.extname(file)] ?? 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const dir = path.resolve('screenshots');
fs.mkdirSync(dir, {recursive: true});
const browser = await playwright.chromium.launch();
const variants = [
  {name: 'light', viewport: {width: 1366, height: 900}, colorScheme: 'light'},
  {name: 'dark', viewport: {width: 1366, height: 900}, colorScheme: 'dark'},
  {name: 'mobile', viewport: {width: 390, height: 844}, colorScheme: 'light'},
];
for (const route of routes) {
  for (const v of variants) {
    const ctx = await browser.newContext({viewport: v.viewport, colorScheme: v.colorScheme});
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base + route);
    await page.waitForTimeout(400);
    const file = path.join(dir, `${route.replace(/\W+/g, '_') || 'home'}-${v.name}.png`);
    await page.screenshot({path: file, fullPage: true});
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    console.log(`${file}${overflow ? '  ⚠ horizontal overflow' : ''}${errors.length ? '  ⚠ ' + errors.join('; ') : ''}`);
    await ctx.close();
  }
}
await browser.close();
server.close();
