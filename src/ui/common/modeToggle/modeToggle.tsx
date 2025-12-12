'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">theme</span>
      <div className="relative flex items-center rounded-full border border-border/70 bg-card/70 px-1 py-1 backdrop-blur">
        <motion.button
          onClick={() => setTheme('light')}
          className="relative z-10 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground"
          whileTap={{ scale: 0.95 }}
        >
          <Sun className="h-4 w-4" />
          Light
        </motion.button>
        <motion.button
          onClick={() => setTheme('dark')}
          className="relative z-10 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground"
          whileTap={{ scale: 0.95 }}
        >
          <Moon className="h-4 w-4" />
          Dark
        </motion.button>
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="absolute inset-y-1 w-1/2 rounded-full bg-primary/10"
          animate={{ x: theme === 'dark' ? '100%' : '0%' }}
        />
      </div>
    </div>
  )
}
