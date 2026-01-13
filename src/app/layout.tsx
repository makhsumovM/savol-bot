import type { Metadata } from 'next'
import '../styles/globals.css'
import Providers from '@/lib/providers/providers'
import Header from '@/ui/layout/header'

export const metadata: Metadata = {
  title: {
    default: 'SkillCheck',
    template: '%s · SkillCheck',
  },
  description: 'AI тестировщик',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'SkillCheck',
    description: 'AI тестировщик',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'SkillCheck',
    description: 'AI тестировщик',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
