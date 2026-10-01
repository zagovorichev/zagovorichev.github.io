import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container section">
      <h1>Page not found</h1>
      <p>
        <Link href="/">← Back to all articles</Link>
      </p>
    </div>
  );
}
