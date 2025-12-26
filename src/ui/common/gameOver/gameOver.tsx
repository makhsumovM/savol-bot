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
      className="relative p-6 sm:p-8 flex flex-col items-center gap-6
        bg-card/90 backdrop-blur-2xl text-card-foreground
        rounded-3xl shadow-2xl border-2 border-destructive/30
        max-w-md mx-auto text-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* background */}
      <div className="absolute inset-0 bg-destructive/10 blur-3xl animate-pulse-slow" />

      {/* title */}
      <motion.h1
        className="relative text-3xl md:text-5xl font-black tracking-tight"
        style={{ color: 'rgb(245, 73, 0)' }}
      >
        {t('gameOver.title')}
      </motion.h1>

      {/* description */}
      <p className="relative text-base font-semibold text-muted-foreground max-w-xs">
        {t('gameOver.wrongAnswer')}
      </p>

      {/* score + record */}
      <div className="relative flex gap-10 mt-2">
        <div className="flex flex-col items-center gap-1">
          <span className="text-base font-semibold text-muted-foreground">
            {t('gameOver.score')}
          </span>

          <span
            className="text-3xl font-black"
            style={{ color: 'oklch(0.75 0.20 185)' }}
          >
            {currentScore}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-base font-semibold text-muted-foreground">
            {t('gameOver.record')}
          </span>

          <span
            className="text-3xl font-black"
            style={{ color: 'rgb(245, 73, 0)' }}
          >
            {record}
          </span>
        </div>
      </div>

      {/* button */}
      <motion.button
        className="relative mt-4 px-6 py-3
          bg-primary-2 text-white rounded-xl
          flex items-center gap-2
          text-lg font-black
          shadow-2xl border-2 border-white/20"
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
