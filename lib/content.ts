import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {load as loadYaml} from 'js-yaml';

const CONTENT = path.join(process.cwd(), 'content');

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  tags: string[];
  icon?: string;
  readingMinutes: number;
  source: string;
};

export type PostMeta = Omit<Post, 'source'>;

export type Video = {
  title: string;
  url: string;
  date: string;
  note?: string;
  channel?: string;
  tags: string[];
  thumbnail?: string;
};

export type LinkItem = {
  title: string;
  url: string;
  description: string;
  note?: string;
  guide?: string;
  host: string;
};

export type LinkGroup = {category: string; items: LinkItem[]};

// YAML parses bare dates into Date objects
const toDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''));

const byDateDesc = <T extends {date: string}>(a: T, b: T) => b.date.localeCompare(a.date);

function readPosts(dir: 'guides' | 'news'): Post[] {
  const full = path.join(CONTENT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const {data, content} = matter(fs.readFileSync(path.join(full, file), 'utf8'));
      if (!data.title || !data.description || !data.date) {
        throw new Error(`content/${dir}/${file}: frontmatter needs title, description and date`);
      }
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        date: toDate(data.date),
        tags: data.tags ?? [],
        icon: data.icon,
        readingMinutes: Math.max(1, Math.round(words / 200)),
        source: content,
      };
    })
    .sort((a, b) => byDateDesc(a, b) || a.slug.localeCompare(b.slug));
}

const meta = ({source: _source, ...rest}: Post): PostMeta => rest; // eslint-disable-line @typescript-eslint/no-unused-vars

export const getGuides = (): PostMeta[] => readPosts('guides').map(meta);
export const getNews = (): PostMeta[] => readPosts('news').map(meta);

export function getGuide(slug: string): Post {
  const post = readPosts('guides').find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown guide ${slug}`);
  return post;
}

export function getNewsPost(slug: string): Post {
  const post = readPosts('news').find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown news post ${slug}`);
  return post;
}

function readYaml<T>(file: string): T {
  return loadYaml(fs.readFileSync(path.join(CONTENT, file), 'utf8')) as T;
}

function youtubeId(url: string): string | undefined {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m?.[1];
}

export function getVideos(): Video[] {
  const raw = readYaml<Array<Record<string, unknown>> | null>('videos.yaml') ?? [];
  return raw
    .map((v) => {
      const url = String(v.url);
      const id = youtubeId(url);
      return {
        title: String(v.title),
        url,
        date: toDate(v.date),
        note: v.note as string | undefined,
        channel: v.channel as string | undefined,
        tags: (v.tags as string[] | undefined) ?? [],
        thumbnail: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined,
      };
    })
    .sort(byDateDesc);
}

export function getLinkGroups(): LinkGroup[] {
  const raw = readYaml<Array<{category: string; items: Omit<LinkItem, 'host'>[]}> | null>('links.yaml') ?? [];
  return raw.map((g) => ({
    category: g.category,
    items: g.items.map((i) => ({...i, host: new URL(i.url).hostname.replace(/^www\./, '')})),
  }));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
}
