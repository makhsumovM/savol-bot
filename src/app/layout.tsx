import type { Metadata } from 'next'
import '../styles/globals.css'
import Providers from '@/lib/providers/providers'
import Header from '@/ui/layout/header'
import { siteConfig } from '@/lib/seo'

const metadataBase = new URL(siteConfig.url)

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  category: siteConfig.category,
  creator: siteConfig.creator,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    locale: siteConfig.locale,
    url: metadataBase,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.locale,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <main className="pb-20 md:pb-0">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
