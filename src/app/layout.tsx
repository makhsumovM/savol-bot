import type {Metadata} from 'next'
import '../styles/globals.css'
import Providers from '@/lib/providers/providers'
import Header from '@/ui/layout/header'
import Footer from '@/ui/layout/footer'
import {siteConfig} from '@/lib/seo'
import {GoogleAnalytics} from '@next/third-parties/google'

const metadataBase = new URL(siteConfig.url)
const ogImageUrl = new URL(siteConfig.ogImage, metadataBase)
const iconUrl = new URL(siteConfig.icon, metadataBase)
const socialLinks = Object.values(siteConfig.social).filter(Boolean) as string[]


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

  icons: {
    icon: [
      {url: siteConfig.favicon, type: 'image/x-icon'},
      {url: siteConfig.icon, type: 'image/png', sizes: '512x512'},
    ],
    apple: [{url: siteConfig.icon, type: 'image/png', sizes: '512x512'}],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImageUrl],
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 600,
        alt: `${siteConfig.name} - AI-платформа для подготовки к интервью`,
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
    url: iconUrl.toString(),
    width: 512,
    height: 512,
  },
  description: siteConfig.shortDescription,
  ...(socialLinks.length ? {sameAs: socialLinks} : {}),
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
}

const educationalAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${siteConfig.url}/#app`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(websiteJsonLd)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(educationalAppJsonLd)}}
      />
    </head>
    <body className="antialiased" suppressHydrationWarning={true}>
    <Providers>
      <Header />
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer />
    </Providers>
    </body>
    <GoogleAnalytics gaId="G-06G53LZERE" />
    </html>
  )
}
