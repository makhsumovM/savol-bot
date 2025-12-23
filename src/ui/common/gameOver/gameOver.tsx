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
      className="relative p-8 sm:p-10 flex flex-col items-center justify-center gap-6 bg-card/90 backdrop-blur-2xl text-card-foreground rounded-3xl shadow-2xl border-2 border-destructive/30 max-w-lg mx-auto overflow-hidden"
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 30 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 20 }}
    >
      <div className="absolute inset-0 bg-destructive/10 blur-3xl animate-pulse-slow" />

      <motion.h1
        className="relative text-6xl sm:text-7xl font-black tracking-tight"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{ color: 'rgb(245, 73, 0)' }}
      >
        {t('gameOver.title')}
      </motion.h1>

      <motion.p
        className="relative text-lg font-bold text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('gameOver.wrongAnswer')}{' '}
        <span className="text-3xl font-black" style={{ color: 'oklch(0.75 0.20 185)' }}>
          {currentScore}
        </span>
      </motion.p>

      <motion.p
        className="relative text-lg font-bold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {t('gameOver.record')}{' '}
        <span className="text-3xl font-black" style={{ color: 'rgb(245, 73, 0)' }}>
          {record}
        </span>
      </motion.p>

      <motion.button
        aria-label={t('gameOver.restart')}
        className="relative mt-6 px-8 py-4  bg-primary-2 text-white rounded-2xl flex items-center gap-3 text-xl font-black shadow-2xl border-2 border-white/20"
        onClick={onRestart}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RefreshCcw className="w-6 h-6" />
        {t('gameOver.restart')}
      </motion.button>
    </motion.div>
  )
}

export default GameOver
