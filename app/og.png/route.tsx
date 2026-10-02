import {ogAccent, ogImage} from '@/lib/og';
import {site} from '@/lib/site';

// Default link preview for every page without its own (home, lists, about)
export const dynamic = 'force-static';

export function GET() {
  return ogImage({
    label: site.role,
    title: 'I write down what works.',
    description: site.description,
    meta: 'Guides · Claude · Videos · Links · News',
    accent: ogAccent.site,
  });
}
