let assetPrefixPath = ''

switch (process.env.NEXT_PUBLIC_ENV) {
  case 'prod':
  case 'dev':
    assetPrefixPath = `https://www.mirrormedia.mg/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break

  default:
    assetPrefixPath = 'http://localhost:3000'
    break
}

const nextConfig = {
  assetPrefix: assetPrefixPath,
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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
