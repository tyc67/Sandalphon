import type { MetadataRoute } from 'next'
import { ENV } from '@/constants/config'

export default function robots(): MetadataRoute.Robots {
  switch (ENV) {
    case 'prod':
      return {
        rules: {
          userAgent: '*',
          allow: '/',
        },
      }
    case 'dev':
    default:
      return {
        rules: {
          userAgent: '*',
          disallow: '/',
        },
      }
  }
}
