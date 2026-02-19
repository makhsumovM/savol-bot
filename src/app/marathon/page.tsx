import MarathonClient from '@/app/marathon/marathonClient'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)
const pagePath = '/marathon'
const ogImageUrl = new URL(siteConfig.ogImage, metadataBase)


export const metadata: Metadata = {
  metadataBase,

  title: 'Marathon',
  description: 'Challenge yourself in Marathon mode with endless interview questions in frontend, backend, or mobile development on our AI-powered platform.',

  keywords: [...siteConfig.keywords, 'marathon', 'interview marathon', 'continuous questions', 'tech challenges', 'score tracking'],

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
    title: `Marathon | ${siteConfig.title}`,
    description: 'Challenge yourself in Marathon mode with endless interview questions in frontend, backend, or mobile development on our AI-powered platform.',
    images: [ogImageUrl],
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: `${siteConfig.url}${pagePath}`,
    siteName: siteConfig.name,
    title: `Marathon | ${siteConfig.title}`,
    description: 'Challenge yourself in Marathon mode with endless interview questions in frontend, backend, or mobile development on our AI-powered platform.',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 600,
        alt: `${siteConfig.name} - Marathon`,
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

export default function MarathonPage() {
  return (
    <Suspense>
      <MarathonClient />
    </Suspense>
  )
}
