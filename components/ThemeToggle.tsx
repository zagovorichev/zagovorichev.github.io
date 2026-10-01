'use client';

import {Moon, Sun} from 'lucide-react';

/** Flips between light and dark; the initial theme is set before paint by the script in layout.tsx. */
export default function ThemeToggle() {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // storage can be unavailable (private mode); the choice then lasts for this page only
    }
  };

  return (
    <button type="button" className="icon-btn theme-btn" onClick={toggle} aria-label="Toggle dark mode">
      <Sun size={18} className="icon-sun" />
      <Moon size={18} className="icon-moon" />
    </button>
  );
}
