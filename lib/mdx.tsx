import {evaluate} from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import {mdxComponents} from '@/components/mdx-components';

/** A heading for the table of contents; `id` is the anchor rehype-slug gave it. */
export type TocItem = {id: string; text: string; depth: 2 | 3};

type HastNode = {type: string; tagName?: string; value?: string; properties?: {id?: unknown}; children?: HastNode[]};

const textOf = (node: HastNode): string =>
  node.type === 'text' ? (node.value ?? '') : (node.children ?? []).map(textOf).join('');

/** Rehype plugin: collects h2/h3 (after rehype-slug has set their ids) into `toc`. */
function collectHeadings(toc: TocItem[]) {
  return () => (tree: HastNode) => {
    let seenH2 = false;
    const walk = (node: HastNode) => {
      if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3') && node.properties?.id) {
        seenH2 ||= node.tagName === 'h2';
        // an h3 is nested only under a preceding h2; older guides open with h3 sections
        toc.push({id: String(node.properties.id), text: textOf(node).trim(), depth: seenH2 && node.tagName === 'h3' ? 3 : 2});
        return;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

/** Compiles MDX at build time (pages are statically exported, nothing runs in the browser). */
export async function renderMdx(source: string) {
  const toc: TocItem[] = [];
  const {default: Content} = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      collectHeadings(toc),
      [rehypePrettyCode, {theme: {light: 'github-light', dark: 'github-dark-dimmed'}, keepBackground: false}],
    ],
  });
  return {content: <Content components={mdxComponents} />, toc};
}
