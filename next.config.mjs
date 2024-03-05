/** @type {import('next').NextConfig} */
const nextConfig = {
  //   basePath: "/test",
  // output: "export",

  distDir: "dist",
  images: {
    // domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
