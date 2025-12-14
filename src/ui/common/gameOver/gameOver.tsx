'use client'

import { RefreshCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface IGameOverProps {
  currentScore: number
  record: number
  onRestart: () => void
}

const GameOver = ({ currentScore, record, onRestart }: IGameOverProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      className="p-6 flex flex-col items-center justify-center gap-4 bg-card text-card-foreground rounded-lg shadow-md max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.h1
        className="text-4xl font-bold text-destructive"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {t('gameOver.title')}
      </motion.h1>

      <motion.p className="text-muted-foreground">
        {t('gameOver.wrongAnswer')}{' '}
        <span className="font-bold">{currentScore}</span>
      </motion.p>

      <motion.p className="text-primary-foreground">
        {t('gameOver.record')}{' '}
        <span className="font-bold">{record}</span>
      </motion.p>

      <motion.button
        aria-label={t('gameOver.restart')}
        className="mt-4 px-5 py-3 bg-primary text-primary-foreground rounded-lg flex items-center gap-2"
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCcw className="w-5 h-5" />
        {t('gameOver.restart')}
      </motion.button>
    </motion.div>
  )
}

export default GameOver
