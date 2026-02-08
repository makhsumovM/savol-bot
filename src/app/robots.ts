import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

const DISALLOW_PATHS = [
  '/api/',
  '/_next/',
  '/admin/',
  '/private/',
  '/login',
  '/register',
  '/profile',
  '/my-rank',
]

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_PATHS,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
