import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import planned from '@/content/planned.json';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export type ArticleMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  date: string;
};

export type Article = ArticleMeta & {source: string};

export type PlannedTopic = {title: string; description: string; image?: string};

function readArticle(slug: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.mdx`), 'utf8');
  const {data, content} = matter(raw);
  if (!data.title || !data.description || !data.date) {
    throw new Error(`content/articles/${slug}.mdx: frontmatter needs title, description and date`);
  }
  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    image: data.image,
    // YAML parses bare dates into Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    source: content,
  };
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getArticle(slug: string): Article {
  return readArticle(slug);
}

/** Newest first; articles published the same day keep alphabetical order. */
export function getArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug): ArticleMeta => {
      const {title, subtitle, description, image, date} = readArticle(slug);
      return {slug, title, subtitle, description, image, date};
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPlannedTopics(): PlannedTopic[] {
  return planned;
}
