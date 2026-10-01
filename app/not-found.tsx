import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container page narrow empty">
      <p className="eyebrow">404</p>
      <h1>This branch doesn&apos;t exist</h1>
      <p className="muted">The page may have moved when the site was rebuilt.</p>
      <Link href="/" className="btn btn-primary">
        <ArrowLeft size={18} /> Back home
      </Link>
    </div>
  );
}
