import LeaderboardClient from '@/app/leaderboard/leaderBoardClient'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)
const pagePath = '/leaderboard'
const ogImageUrl = new URL(siteConfig.ogImage, metadataBase)

export const metadata: Metadata = {
  metadataBase,

  title: 'Leaderboard',
  description:
    'View the top rankings in frontend, backend, and mobile development interview preparations on our AI platform.',

  keywords: [
    ...siteConfig.keywords,
    'leaderboard',
    'rankings',
    'interview scores',
    'frontend',
    'backend',
    'mobile dev',
  ],

  applicationName: siteConfig.name,
  category: siteConfig.category,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  authors: [siteConfig.author],

  alternates: {
    canonical: `${siteConfig.url}${pagePath}`,
  },

  icons: {
    icon: [
      { url: siteConfig.favicon, type: 'image/x-icon' },
      { url: siteConfig.icon, type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: siteConfig.icon, type: 'image/png', sizes: '512x512' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: `Leaderboard | ${siteConfig.title}`,
    description:
      'View the top rankings in frontend, backend, and mobile development interview preparations on our AI platform.',
    images: [ogImageUrl],
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: `${siteConfig.url}${pagePath}`,
    siteName: siteConfig.name,
    title: `Leaderboard | ${siteConfig.title}`,
    description:
      'View the top rankings in frontend, backend, and mobile development interview preparations on our AI platform.',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 600,
        alt: `${siteConfig.name} - Leaderboard`,
        type: 'image/png',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  verification: {
    google: siteConfig.verification.google || undefined,
    yandex: siteConfig.verification.yandex || undefined,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function LeaderBoardPage() {
  return (
    <Suspense>
      <LeaderboardClient />
    </Suspense>
  )
}
