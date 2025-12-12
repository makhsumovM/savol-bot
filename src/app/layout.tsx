import type { Metadata } from 'next'
import '../styles/globals.css'
import Providers from '@/lib/providers/providers'

export const metadata: Metadata = {
  title: 'Savol-bot',
  description: 'AI chatbot',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
