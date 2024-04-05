module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["92nqwjqc-3000.asse.devtunnels.ms" /* or Codespace port forward url, no including scheme */, "localhost:3000"]
    }
  },
};
