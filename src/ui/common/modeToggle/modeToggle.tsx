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

  return (
    <motion.button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="
        relative w-11 h-11 rounded-full
        bg-linear-to-br from-yellow-100 to-yellow-200/80
        dark:from-slate-700 dark:to-slate-800/80
        border border-yellow-300/50 dark:border-slate-600/50
        shadow-lg shadow-yellow-200/30 dark:shadow-slate-900/40
        hover:shadow-xl hover:shadow-yellow-200/40 dark:hover:shadow-slate-900/50
        transition-all duration-300 overflow-hidden
        flex items-center justify-center
      "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isLight ? t('theme.dark') : t('theme.light')}`}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-purple-400/20 to-blue-400/20 dark:from-purple-600/20 dark:to-blue-600/20 rounded-full"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute flex items-center justify-center"
        initial={false}
        animate={{
          scale: isLight ? 1 : 0,
          opacity: isLight ? 1 : 0,
          rotate: isLight ? 0 : 180,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Sun className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center"
        initial={false}
        animate={{
          scale: isLight ? 0 : 1,
          opacity: isLight ? 0 : 1,
          rotate: isLight ? -180 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Moon className="w-5 h-5 text-slate-200 dark:text-slate-100" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/30 to-transparent dark:via-white/10"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  )
}
