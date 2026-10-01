import Image from 'next/image';
import {site} from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-line" />
        <div className="footer-row">
          <Image src="/images/logo.png" alt={site.name} width={145} height={100} />
          <div className="footer-links">
            <h4>About</h4>
            <a href={site.repo} target="_blank" rel="noopener noreferrer">
              Source on GitHub
            </a>
            <a href={`${site.repo}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
              License (MIT)
            </a>
          </div>
        </div>
        <div className="text-muted copyright">© {new Date().getFullYear()} blog-tree.github.io</div>
      </div>
    </footer>
  );
}
