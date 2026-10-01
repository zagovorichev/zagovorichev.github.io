import type {ComponentPropsWithoutRef} from 'react';
import type {MDXComponents} from 'mdx/types';
import Link from 'next/link';
import ZoomImage from './ZoomImage';

/** Secondary explanatory text, e.g. `- Term. <Muted>explanation</Muted>` */
function Muted({children}: {children: React.ReactNode}) {
  return <span className="text-muted">{children}</span>;
}

function Anchor({href = '', ...props}: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function Img({src, alt = ''}: ComponentPropsWithoutRef<'img'>) {
  return typeof src === 'string' ? <ZoomImage src={src} alt={alt} /> : null;
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  img: Img,
  Muted,
};
