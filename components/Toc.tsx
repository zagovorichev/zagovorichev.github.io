'use client';

import {useEffect, useRef, useState} from 'react';
import type {TocItem} from '@/lib/mdx';

/** Table of contents of an article; highlights the section currently being read. */
export default function Toc({items, title}: {items: TocItem[]; title?: string}) {
  const [active, setActive] = useState<string>();
  const nav = useRef<HTMLElement>(null);

  // keep the highlighted entry visible when the list is taller than the sticky column
  // (scrolls only the side column itself: scrollIntoView could move the whole page)
  useEffect(() => {
    const box = nav.current?.closest<HTMLElement>('.toc-side');
    const link = nav.current?.querySelector<HTMLElement>('[aria-current]');
    if (!box || !link) return;
    if (link.offsetTop < box.scrollTop) box.scrollTop = link.offsetTop - 8;
    else if (link.offsetTop + link.offsetHeight > box.scrollTop + box.clientHeight)
      box.scrollTop = link.offsetTop + link.offsetHeight - box.clientHeight + 8;
  }, [active]);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => !!h);
    let frame = 0;
    const update = () => {
      frame = 0;
      // the heading closest above the line just under the sticky header; the last one at the page bottom
      let current: string | undefined;
      for (const h of headings) {
        if (h.getBoundingClientRect().top > 110) break;
        current = h.id;
      }
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) current = headings.at(-1)?.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, {passive: true});
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav ref={nav} className="toc" aria-label="Table of contents">
      {title && <p className="toc-title">{title}</p>}
      <ol>
        {items.map((i) => (
          <li key={i.id} className={`toc-d${i.depth}`}>
            <a href={`#${i.id}`} aria-current={active === i.id ? 'location' : undefined}>
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
