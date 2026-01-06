/** @type {import('next').NextConfig} */
const nextConfig = {
  // FORCE WEBPACK (Stops Turbopack build on Vercel)
  experimental: {
    turbo: false,
  },

  // OPTIONAL but recommended (removes warning)
  reactStrictMode: true,
};

export default nextConfig;
