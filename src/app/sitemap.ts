import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

const routes = [
  '',
  '/login',
  '/register',
  '/leaderboard',
  '/my-rank',
  '/marathon',
  '/random',
  '/profile',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
