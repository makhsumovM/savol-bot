import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import Providers from '@/lib/providers/providers'
import Header from '@/ui/layout/header'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export const metadata: Metadata = {
  metadataBase,

  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },

  description: siteConfig.description,
  keywords: siteConfig.keywords,

  applicationName: siteConfig.name,
  category: siteConfig.category,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  authors: [siteConfig.author],

  alternates: {
    canonical: siteConfig.url,
  },

  icons: 'favicon.ico',

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — AI платформа для тестирования программистов`,
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/logo.png`,
    width: 512,
    height: 512,
  },
  description: siteConfig.shortDescription,
  sameAs: [siteConfig.social.github],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: {
    '@id': `${siteConfig.url}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const educationalAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${siteConfig.url}/#app`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <main className="pb-20 md:pb-0">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
