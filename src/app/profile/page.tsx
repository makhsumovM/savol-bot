import ProfileClient from '@/app/profile/profileClient'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)
const pagePath = '/profile'
const ogImageUrl = new URL(siteConfig.ogImage, metadataBase)

export const metadata: Metadata = {
  metadataBase,

  title: 'Profile',
  description:
    'Manage your SkillCheck profile, view your stats, best scores in frontend and backend, rank, and update your personal information.',

  keywords: [
    ...siteConfig.keywords,
    'profile',
    'user profile',
    'personal stats',
    'best scores',
    'interview preparation progress',
    'account settings',
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
    title: `Profile | ${siteConfig.title}`,
    description:
      'Manage your SkillCheck profile, view your stats, best scores in frontend and backend, rank, and update your personal information.',
    images: [ogImageUrl],
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: `${siteConfig.url}${pagePath}`,
    siteName: siteConfig.name,
    title: `Profile | ${siteConfig.title}`,
    description:
      'Manage your SkillCheck profile, view your stats, best scores in frontend and backend, rank, and update your personal information.',
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

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileClient />
    </Suspense>
  )
}
