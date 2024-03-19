/** @type {import('next').NextConfig} */
const nextConfig = {
  //   basePath: "/test",
  // output: "export",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
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
