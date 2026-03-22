/** @type {import("next").NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "http", hostname: "ec2-13-200-6-248.ap-south-1.compute.amazonaws.com" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
