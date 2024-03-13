const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
