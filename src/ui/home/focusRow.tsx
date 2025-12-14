'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface FocusRowProps {
  label: string
  delay?: number
}

export function FocusRow({ label, delay = 0 }: FocusRowProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
      className="group"
    >
      <div className="mb-2 flex justify-between text-xs font-medium">
        <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
          {label}
        </span>
        <span className="text-muted-foreground/60 group-hover:text-primary/80 transition-colors duration-200">
          {t('home.rows.hover')}
        </span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-muted/60 overflow-hidden backdrop-blur-sm shadow-inner">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-primary via-primary to-secondary shadow-lg"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 0.2,
          }}
        />
      </div>
    </motion.div>
  )
}
