'use client'

import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/lib/providers/theme-provider'
import { Toaster } from 'sonner'
import AOSProvider from '@/lib/providers/aos-provider'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <Toaster closeButton richColors />
        <AOSProvider>{children}</AOSProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers