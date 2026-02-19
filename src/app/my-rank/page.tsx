import MyRankClient from '@/app/my-rank/myRankClient'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)
const pagePath = '/my-rank'
const ogImageUrl = new URL(siteConfig.ogImage, metadataBase)


export const metadata: Metadata = {
  metadataBase,

  title: 'My Rank',
  description: 'View your personal ranking, profile, and best results in frontend, backend, and mobile development interview preparations on our AI platform.',

  keywords: [...siteConfig.keywords, 'my rank', 'personal ranking', 'user profile', 'best results', 'interview stats'],

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
    title: `My Rank | ${siteConfig.title}`,
    description: 'View your personal ranking, profile, and best results in frontend, backend, and mobile development interview preparations on our AI platform.',
    images: [ogImageUrl],
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: `${siteConfig.url}${pagePath}`,
    siteName: siteConfig.name,
    title: `My Rank | ${siteConfig.title}`,
    description: 'View your personal ranking, profile, and best results in frontend, backend, and mobile development interview preparations on our AI platform.',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 600,
        alt: `${siteConfig.name} - My Rank`,
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

export default function MyRankPage() {
  return (
    <Suspense>
      <MyRankClient />
    </Suspense>
  )
}
