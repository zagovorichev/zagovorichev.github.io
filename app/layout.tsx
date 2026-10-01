import type {Metadata, Viewport} from 'next';
import {Inter, JetBrains_Mono} from 'next/font/google';
import {GoogleAnalytics} from '@next/third-parties/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {site} from '@/lib/site';
import './globals.css';

const inter = Inter({subsets: ['latin', 'cyrillic'], variable: '--font-sans'});
const mono = JetBrains_Mono({subsets: ['latin'], variable: '--font-mono'});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}`},
  description: site.description,
  authors: [{name: site.name, url: site.github}],
  openGraph: {siteName: site.name, type: 'website', locale: 'en_US'},
  alternates: {types: {'application/rss+xml': '/feed.xml'}},
};

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#ffffff'},
    {media: '(prefers-color-scheme: dark)', color: '#0b1017'},
  ],
};

// Runs before paint: pick the saved theme or the system one (no flash of the wrong theme),
// and send old hash-router links (/#/article/qa) to the guide pages.
const bootScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}var h=location.hash;if(h.indexOf('#/article/')===0){var s=h.slice(10).replace(/\\/$/,'');location.replace(s==='freelance'?'/links/':'/guides/'+s+'/')}})();`;

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: bootScript}} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {site.gaId && <GoogleAnalytics gaId={site.gaId} />}
      </body>
    </html>
  );
}
