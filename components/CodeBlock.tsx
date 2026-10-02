'use client';

import {useEffect, useRef, useState, type ComponentPropsWithoutRef} from 'react';
import {Check, Copy} from 'lucide-react';

/** `<pre>` of an MDX code block with a "Copy" button in the corner. */
export default function CodeBlock(props: ComponentPropsWithoutRef<'pre'>) {
  const pre = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pre.current?.textContent ?? '');
      setCopied(true);
    } catch {
      // clipboard can be blocked (permissions, insecure context); the code stays selectable by hand
    }
  };

  return (
    <div className="code-block">
      <pre ref={pre} {...props} />
      <button type="button" className="copy-btn" onClick={copy} title="Copy code">
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}
