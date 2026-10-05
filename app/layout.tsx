import {ViewTransition} from 'react';
import type {Metadata, Viewport} from 'next';
import {Inter, JetBrains_Mono} from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import {ogImageMeta} from '@/lib/og';
import {site} from '@/lib/site';
import './globals.css';

const inter = Inter({subsets: ['latin', 'cyrillic'], variable: '--font-sans'});
const mono = JetBrains_Mono({subsets: ['latin'], variable: '--font-mono'});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}`},
  description: site.description,
  authors: [{name: site.name, url: site.github}],
  openGraph: {siteName: site.name, type: 'website', locale: 'en_US', images: ogImageMeta('/og.png')},
  // X falls back to og:image; this makes it a large preview
  twitter: {card: 'summary_large_image'},
  alternates: {types: {'application/rss+xml': '/feed.xml'}},
};

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#ffffff'},
    {media: '(prefers-color-scheme: dark)', color: '#0b1017'},
  ],
};

// Runs before paint: pick the saved theme or the system one (no flash of the wrong theme),
// set Google consent defaults (everything denied unless the visitor allowed analytics, see CookieConsent),
// and send old hash-router links (/#/article/qa) to the guide pages.
const bootScript = `(function(){window.dataLayer=window.dataLayer||[];function g(){dataLayer.push(arguments)}var c='denied';try{if(localStorage.getItem('consent')==='granted')c='granted'}catch(e){}g('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c});try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}var h=location.hash;if(h.indexOf('#/article/')===0){var s=h.slice(10).replace(/\\/$/,'');location.replace(s==='freelance'?'/links/':'/guides/'+s+'/')}})();`;

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
        <main id="main">
          {/* page content crossfades on navigation; the header stays put (see "View transitions" in globals.css) */}
          <ViewTransition default="page-fade">{children}</ViewTransition>
        </main>
        <Footer />
        {site.gaId && <CookieConsent gaId={site.gaId} />}
      </body>
    </html>
  );
}
