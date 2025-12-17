'use client'

import HeaderComponent from '@/ui/layout/headerComponent'
import { useEffect, useState } from 'react'

const Header = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <HeaderComponent />
}

export default Header
