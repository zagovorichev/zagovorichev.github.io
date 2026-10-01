import type {Metadata} from 'next';
import Link from 'next/link';
import {Rss} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {GitHubMark} from '@/components/icons';
import {site} from '@/lib/site';

export const metadata: Metadata = {title: 'About', description: `About ${site.name}`};

export default function AboutPage() {
  return (
    <div className="container page narrow">
      <PageHeader section="about" title={site.name} lead={site.role} />
      <div className="prose">
        <p>
          This is my developer log. I keep it for two reasons: to write down solutions once instead of rediscovering
          them, and to keep the best things I find — videos, tools, articles — in one place with my own notes.
        </p>
        <ul>
          <li>
            <Link href="/guides/">Guides</Link> — step-by-step instructions from real projects.
          </li>
          <li>
            <Link href="/videos/">Videos</Link> and <Link href="/links/">links</Link> — what I recommend and why.
          </li>
          <li>
            <Link href="/news/">News</Link> — short notes on what I follow.
          </li>
        </ul>
      </div>
      <div className="about-actions">
        <a href={site.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          <GitHubMark size={18} /> GitHub
        </a>
        <a href="/feed.xml" className="btn btn-ghost">
          <Rss size={18} /> RSS feed
        </a>
      </div>
    </div>
  );
}
