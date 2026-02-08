import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

const routes: Array<{
  path: string
  priority: number
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}> = [
  {
    path: '/',
    priority: 1.0,
    changeFrequency: 'daily',
  },
  {
    path: '/marathon',
    priority: 0.9,
    changeFrequency: 'daily',
  },
  {
    path: '/random',
    priority: 0.9,
    changeFrequency: 'daily',
  },
  {
    path: '/leaderboard',
    priority: 0.7,
    changeFrequency: 'hourly',
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastModified = new Date()

  return routes.map((route) => ({
    url: new URL(route.path, baseUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
