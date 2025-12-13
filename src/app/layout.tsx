import type { Metadata } from 'next'
import '../styles/globals.css'
import Providers from '@/lib/providers/providers'
import Header from '@/ui/layout/header'

export const metadata: Metadata = {
  title: 'Savol-bot',
  description: 'AI тестировщик',
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
