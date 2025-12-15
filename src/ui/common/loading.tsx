'use client'

import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Loading = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-3 p-6 bg-card text-card-foreground rounded-lg shadow-md w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <Loader2 className="w-8 h-8 text-primary" />
      </motion.div>

      <motion.span
        className="text-base font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {t('loading.text')}
      </motion.span>
    </motion.div>
  )
}

export default Loading
