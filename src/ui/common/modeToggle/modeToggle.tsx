/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function ModeToggle() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isLight = theme === 'light'

  const toggleTheme = () => {
    setTheme(isLight ? 'dark' : 'light')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-9 w-16 items-center rounded-full px-1 shadow-inner
        transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${isLight ? 'bg-muted/80 border border-border' : 'bg-muted/80 border border-border'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isLight ? t('theme.switchToDark', 'Switch to dark mode') : t('theme.switchToLight', 'Switch to light mode')}
    >
      <span className="sr-only">{t('theme.toggle', 'Toggle theme')}</span>

      <motion.div
        className={`
          flex h-7 w-7 items-center justify-center rounded-full shadow-md z-10
          ${isLight ? 'bg-background' : 'bg-background'}
        `}
        animate={{
          x: isLight ? 0 : 28
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={isLight ? 'light' : 'dark'}
          initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isLight ? (
            <Sun className="h-4 w-4 text-primary" strokeWidth={2} />
          ) : (
            <Moon className="h-4 w-4 text-primary" strokeWidth={2} />
          )}
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <div className={`opacity-0`}></div>
      </div>

    </motion.button>
  )
}
