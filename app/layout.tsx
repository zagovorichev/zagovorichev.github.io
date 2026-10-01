import type {Metadata} from 'next';
import {Raleway} from 'next/font/google';
import {GoogleAnalytics} from '@next/third-parties/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {site} from '@/lib/site';
import './globals.css';

const raleway = Raleway({subsets: ['latin'], weight: ['300', '400', '600', '700']});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}`},
  description: site.description,
  openGraph: {siteName: site.name, type: 'website', images: '/images/blog-tree_700x400.png'},
};

// Old site used HashRouter (/#/article/qa); send those links to the real pages.
const legacyHashRedirect = `(function(){var h=location.hash;if(h.indexOf('#/')===0){var p=h.slice(1);if(p.slice(-1)!=='/')p+='/';location.replace(p);}})();`;

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={raleway.className}>
      <head>
        <script dangerouslySetInnerHTML={{__html: legacyHashRedirect}} />
      </head>
      <body>
        <div className="bg-logo" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
        {site.gaId && <GoogleAnalytics gaId={site.gaId} />}
      </body>
    </html>
  );
}
