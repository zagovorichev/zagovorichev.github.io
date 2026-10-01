import type {NextConfig} from 'next';

// Static export for GitHub Pages: no server, every page is prebuilt into ./out
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {unoptimized: true},
};

export default nextConfig;
