/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed `output: 'export'` to allow dynamic rendering for detail pages
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    domains: ['localhost'],
  },
};

export default nextConfig;
