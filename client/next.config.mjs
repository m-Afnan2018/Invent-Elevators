/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['placehold.co', 'images.unsplash.com', 'via.placeholder.com', 'ui-avatars.com'],
  },
};

export default nextConfig;
