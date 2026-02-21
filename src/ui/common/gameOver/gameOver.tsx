'use client'

import { RefreshCcw, Trophy, Target, Flame, Sparkles, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface IGameOverProps {
  currentScore: number
  record: number
  onRestart: () => void
}

const GameOver = ({ currentScore, record, onRestart }: IGameOverProps) => {
  const { t } = useTranslation()
  const isNewRecord = currentScore > 0 && currentScore >= record

  return (
    <motion.div
      className="relative p-6 sm:p-8 md:p-10 flex flex-col items-center gap-6
        bg-card/80 backdrop-blur-2xl text-card-foreground
        rounded-3xl shadow-2xl border border-border/50
        max-w-md mx-auto text-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      data-aos="zoom-in"
      data-aos-delay="80"
    >
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-destructive/20 blur-[80px] " />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary-2/20 blur-[80px] " style={{ animationDelay: '0.5s' }} />
      <div className="absolute inset-0 bg-linear-to-br from-destructive/5 via-transparent to-primary-2/5 pointer-events-none" />

      {isNewRecord && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute top-1 right-1 flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-yellow-500 to-amber-500 rounded-full text-white text-xs font-bold shadow-lg"
        >
          <Sparkles className="w-3 h-3" />
          {t('gameOver.newRecord')}
        </motion.div>
      )}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl " />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-destructive/20 to-destructive/5 border border-destructive/30">
          <Flame className="w-10 h-10 text-destructive" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative text-3xl md:text-4xl font-black tracking-tight bg-linear-to-r from-destructive via-orange-500 to-destructive bg-clip-text text-transparent"
      >
        {t('gameOver.title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative text-sm font-medium text-muted-foreground max-w-xs"
      >
        {t('gameOver.wrongAnswer')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative grid grid-cols-2 gap-4 w-full mt-2"
        data-aos="fade-up"
        data-aos-delay="140"
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-primary-2/30 bg-linear-to-br from-primary-2/10 to-primary-2/5 p-4"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <div className="absolute inset-0 bg-primary-2/5 blur-xl" />
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-primary-2">
              <Target className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t('gameOver.score')}
              </span>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="text-4xl font-black text-primary-2 tabular-nums"
            >
              {currentScore}
            </motion.span>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/10 to-orange-500/5 p-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="absolute inset-0 bg-amber-500/5 blur-xl" />
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t('gameOver.record')}
              </span>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="text-4xl font-black text-amber-500 tabular-nums"
            >
              {isNewRecord ? currentScore : record}
            </motion.span>
          </div>
          {isNewRecord && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-2 right-2"
            >
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative mt-4 group overflow-hidden px-8 py-3.5
          bg-linear-to-r from-primary-2 to-primary-2/90 text-white rounded-2xl
          flex items-center gap-2.5
          text-base font-bold
          shadow-xl shadow-primary-2/25 border border-white/10
          transition-all duration-300 hover:shadow-2xl hover:shadow-primary-2/30"
        onClick={onRestart}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{ translateX: ['100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        <RefreshCcw className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
        <span className="relative z-10">{t('gameOver.restart')}</span>
      </motion.button>
    </motion.div>
  )
}

export default GameOver
