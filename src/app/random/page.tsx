import RandomClient from '@/app/random/randomClient'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)
const pagePath = '/random'
const ogImageUrl = new URL(siteConfig.ogImage, metadataBase)

export const metadata: Metadata = {
  metadataBase,

  title: 'Random Mode',
  description:
    'Practice with random interview questions in frontend, backend, or mobile development. Endless mode with topic filtering to sharpen your skills on our AI-powered platform.',

  keywords: [
    ...siteConfig.keywords,
    'random questions',
    'random interview practice',
    'tech interview random',
    'frontend random',
    'backend random',
    'mobile development questions',
    'endless quiz',
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
    title: `Random Mode | ${siteConfig.title}`,
    description:
      'Practice with random interview questions in frontend, backend, or mobile development. Endless mode with topic filtering to sharpen your skills on our AI-powered platform.',
    images: [ogImageUrl],
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: `${siteConfig.url}${pagePath}`,
    siteName: siteConfig.name,
    title: `Random Mode | ${siteConfig.title}`,
    description:
      'Practice with random interview questions in frontend, backend, or mobile development. Endless mode with topic filtering to sharpen your skills on our AI-powered platform.',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 600,
        alt: `${siteConfig.name} - Random Mode`,
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

export default function RandomPage() {
  return (
    <Suspense>
      <RandomClient />
    </Suspense>
  )
}
