export const site = {
  name: 'Oleksandr Zagovorychev',
  shortName: 'Zagovorychev',
  role: 'Senior Software Engineer',
  tagline: 'Developer log',
  description:
    'Practical guides, useful videos and links, and notes on the tech I follow — by Oleksandr Zagovorychev, software engineer.',
  url: 'https://zagovorichev.github.io',
  repo: 'https://github.com/zagovorichev/zagovorichev.github.io',
  github: 'https://github.com/zagovorichev',
  // Google Analytics is enabled only when the GA_ID repository variable is set (see README)
  gaId: process.env.NEXT_PUBLIC_GA_ID,
};

export type SectionKey = 'guides' | 'videos' | 'links' | 'news' | 'about';

export const sections: Record<SectionKey, {title: string; href: string; blurb: string}> = {
  guides: {
    title: 'Guides',
    href: '/guides/',
    blurb: 'Step-by-step instructions for problems I have solved — tooling, process, quality.',
  },
  videos: {
    title: 'Videos',
    href: '/videos/',
    blurb: 'Talks and tutorials worth your time, with my notes on what to take away.',
  },
  links: {
    title: 'Links',
    href: '/links/',
    blurb: 'Websites I find genuinely useful, and what exactly I found there.',
  },
  news: {
    title: 'News',
    href: '/news/',
    blurb: 'Short notes on releases, ideas and data I follow.',
  },
  about: {
    title: 'About',
    href: '/about/',
    blurb: 'Who writes this log.',
  },
};

export const navOrder: SectionKey[] = ['guides', 'videos', 'links', 'news', 'about'];
