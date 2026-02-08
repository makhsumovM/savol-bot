'use client'

import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'
import { ThemeProvider } from '@/lib/providers/theme-provider'
import { Toaster } from 'sonner'
import { setupTokenCleanup } from '@/lib/utils/jwt'
import AOSProvider from '@/lib/providers/aos-provider'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    setupTokenCleanup()
  }, [])

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Toaster closeButton richColors />
          <AOSProvider>{children}</AOSProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default Providers
