import RegisterClient from '@/app/register/registerClient'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)
const pagePath = '/register'
const ogImageUrl = new URL(siteConfig.ogImage, metadataBase)


export const metadata: Metadata = {
  metadataBase,

  title: 'Register',
  description: 'Create your SkillCheck account to start preparing for tech interviews with AI-powered questions in frontend, backend, and mobile development.',

  keywords: [
    ...siteConfig.keywords,
    'register',
    'sign up',
    'create account',
    'tech interview preparation',
    'AI interview practice',
    'join skillcheck',
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
    title: `Register | ${siteConfig.title}`,
    description: 'Create your SkillCheck account to start preparing for tech interviews with AI-powered questions in frontend, backend, and mobile development.',
    images: [ogImageUrl],
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: `${siteConfig.url}${pagePath}`,
    siteName: siteConfig.name,
    title: `Register | ${siteConfig.title}`,
    description: 'Create your SkillCheck account to start preparing for tech interviews with AI-powered questions in frontend, backend, and mobile development.',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 600,
        alt: `${siteConfig.name} - Register`,
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

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterClient />
    </Suspense>
  )
}
