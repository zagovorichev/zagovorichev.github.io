// Fast content sanity checks with readable messages (the build catches the rest).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {load} from 'js-yaml';

const root = process.cwd();
const errors = [];
const isDate = (v) => v instanceof Date || /^\d{4}-\d{2}-\d{2}$/.test(String(v));
const isUrl = (v) => {
  try {
    return ['http:', 'https:'].includes(new URL(v).protocol);
  } catch {
    return false;
  }
};

const guides = new Set();
for (const dir of ['guides', 'news', 'claude']) {
  const full = path.join(root, 'content', dir);
  for (const file of fs.readdirSync(full).filter((f) => f.endsWith('.mdx'))) {
    const where = `content/${dir}/${file}`;
    if (!/^[a-z0-9-]+\.mdx$/.test(file)) errors.push(`${where}: file name must be lowercase-kebab-case`);
    const {data} = matter(fs.readFileSync(path.join(full, file), 'utf8'));
    for (const key of ['title', 'description', 'date']) if (!data[key]) errors.push(`${where}: missing ${key}`);
    if (data.date && !isDate(data.date)) errors.push(`${where}: date must be YYYY-MM-DD`);
    if (data.tags && !Array.isArray(data.tags)) errors.push(`${where}: tags must be a list`);
    if (dir === 'claude' && !['claude-md', 'skill', 'command', 'hook', 'workflow'].includes(data.kind))
      errors.push(`${where}: kind must be claude-md | skill | command | hook | workflow`);
    if (dir === 'claude' && data.track && !['overview', 'discovery', 'delivery', 'standalone', 'guardrails'].includes(data.track))
      errors.push(`${where}: track must be overview | discovery | delivery | standalone | guardrails`);
    if (dir === 'guides') guides.add(file.replace(/\.mdx$/, ''));
  }
}

const videos = load(fs.readFileSync(path.join(root, 'content/videos.yaml'), 'utf8')) ?? [];
if (!Array.isArray(videos)) errors.push('content/videos.yaml: must be a list (use [] when empty)');
else
  videos.forEach((v, i) => {
    const where = `content/videos.yaml #${i + 1} (${v?.title ?? 'no title'})`;
    if (!v?.title) errors.push(`${where}: missing title`);
    if (!isUrl(v?.url)) errors.push(`${where}: url must be http(s)`);
    if (!v?.date || !isDate(v.date)) errors.push(`${where}: date must be YYYY-MM-DD`);
  });

const groups = load(fs.readFileSync(path.join(root, 'content/links.yaml'), 'utf8')) ?? [];
const seen = new Set();
groups.forEach((g) => {
  if (!g?.category || !Array.isArray(g.items)) return errors.push('content/links.yaml: each group needs category and items');
  g.items.forEach((l) => {
    const where = `content/links.yaml [${g.category}] ${l?.title ?? 'no title'}`;
    if (!l?.title) errors.push(`${where}: missing title`);
    if (!isUrl(l?.url)) errors.push(`${where}: url must be http(s)`);
    if (!l?.description) errors.push(`${where}: missing description`);
    if (l?.guide && !guides.has(l.guide)) errors.push(`${where}: guide "${l.guide}" does not exist`);
    if (seen.has(l?.url)) errors.push(`${where}: duplicate url`);
    seen.add(l?.url);
  });
});

if (errors.length) {
  console.error('Content problems:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log(`✔ Content OK: ${guides.size} guides, ${videos.length} videos, ${seen.size} links`);
