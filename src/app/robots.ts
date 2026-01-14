import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

/**
 * Robots.txt configuration for SkillCheck
 * Optimized for Google crawling and indexing
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url

  return {
    rules: [
      // === GoogleBot (Main Search Crawler) ===
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',        // API endpoints
          '/private/',    // Private pages
          '/_next/',      // Next.js internals
          '/admin/',      // Admin area (if exists)
        ],
      },

      // === All Other Crawlers ===
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/_next/',
          '/admin/',
        ],
      },
    ],

    // === Sitemap Location ===
    sitemap: `${baseUrl}/sitemap.xml`,

    // === Host Directive (Primary Domain) ===
    host: baseUrl,
  }
}
