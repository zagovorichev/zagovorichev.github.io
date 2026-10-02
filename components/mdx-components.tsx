import type {ComponentPropsWithoutRef} from 'react';
import type {MDXComponents} from 'mdx/types';
import Link from 'next/link';
import ZoomImage from './ZoomImage';
import CodeBlock from './CodeBlock';
import {explicitArchitectureDiagrams} from './diagrams/ExplicitArchitecture';

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

const diagrams = {...explicitArchitectureDiagrams};

/** Theme-aware SVG diagram drawn in code: `<Diagram name="ea-big-picture" />` */
function Diagram({name}: {name: keyof typeof diagrams}) {
  const Component = diagrams[name];
  if (!Component) throw new Error(`Unknown diagram "${name}"`);
  return <Component />;
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  img: Img,
  pre: CodeBlock,
  Muted,
  Diagram,
};
