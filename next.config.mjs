/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["92nqwjqc-3000.asse.devtunnels.ms" /* or Codespace port forward url, no including scheme */, "localhost:3000"]
    }
  },
  // experimental: {
  //   serverActions: {
  //     // edit: updated to new key. Was previously `allowedForwardedHosts`
  //     allowedOrigins: ['92nqwjqc-3000.asse.devtunnels.ms'],
  //   },
  // },
  //   basePath: "/test",
  // output: "export",
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true
  // },
  
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
