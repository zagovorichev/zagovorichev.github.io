'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, X} from 'lucide-react';
import {LogoMark, GitHubMark, SectionIcon} from './icons';
import ThemeToggle from './ThemeToggle';
import {navOrder, sections, site} from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} — home`} onClick={() => setOpen(false)}>
          <LogoMark size={34} />
          <span className="brand-text">
            <span className="brand-name">{site.shortName}</span>
            <span className="brand-sub">{site.tagline}</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {navOrder.map((key) => {
            const s = sections[key];
            const active = pathname?.startsWith(s.href);
            return (
              <Link
                key={key}
                href={s.href}
                className={`nav-link${active ? ' active' : ''}`}
                data-section={key}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="nav-icon">
                  <SectionIcon section={key} size={18} />
                </span>
                {s.title}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <a className="icon-btn" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubMark size={18} />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
