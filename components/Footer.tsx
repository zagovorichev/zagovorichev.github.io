import Link from 'next/link';
import {Rss} from 'lucide-react';
import {GitHubMark, LogoMark} from './icons';
import {navOrder, sections, site} from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link href="/" className="brand">
            <LogoMark size={30} />
            <span className="brand-name">{site.name}</span>
          </Link>
          <p className="muted">{site.description}</p>
        </div>
        <nav className="footer-col" aria-label="Sections">
          <h3>Sections</h3>
          {navOrder.map((k) => (
            <Link key={k} href={sections[k].href}>
              {sections[k].title}
            </Link>
          ))}
        </nav>
        <div className="footer-col">
          <h3>Elsewhere</h3>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            <GitHubMark size={15} /> GitHub
          </a>
          <a href="/feed.xml">
            <Rss size={15} /> RSS feed
          </a>
          <a href={site.repo} target="_blank" rel="noopener noreferrer">
            Source of this site
          </a>
        </div>
      </div>
      <div className="container footer-bottom muted">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Built with Next.js · Hosted on GitHub Pages</span>
      </div>
    </footer>
  );
}
