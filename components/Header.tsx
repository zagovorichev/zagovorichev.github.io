'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';

export default function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${stuck ? ' stuck' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="brand">
          .Blog-Tree
        </Link>
      </div>
    </header>
  );
}
