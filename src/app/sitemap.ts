import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

const routes: Array<{
  path: string
  priority: number
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}> = [
  {
    path: '',
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
    priority: 0.8,
    changeFrequency: 'hourly',
  },
  {
    path: '/profile',
    priority: 0.5,
    changeFrequency: 'weekly',
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastModified = new Date()

  return routes.map((route) => ({
    url: route.path ? `${baseUrl}${route.path}` : baseUrl,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
