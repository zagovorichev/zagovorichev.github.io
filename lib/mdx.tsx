import {evaluate} from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import {mdxComponents} from '@/components/mdx-components';

/** Compiles MDX at build time (pages are statically exported, nothing runs in the browser). */
export async function renderMdx(source: string) {
  const {default: Content} = await evaluate(source, {...runtime, remarkPlugins: [remarkGfm]});
  return <Content components={mdxComponents} />;
}
