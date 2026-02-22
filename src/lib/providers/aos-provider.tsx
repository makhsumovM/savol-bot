'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import AOS from 'aos'

const AOSProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    const timeout = setTimeout(() => {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        offset: 80,
        once: true,
        mirror: false,
      })
    }, 100);

    return () => clearTimeout(timeout);
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [pathname])

  return children
}

export default AOSProvider
