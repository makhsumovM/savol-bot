'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy } from 'lucide-react'

export const LeaderboardEmptyState = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/10 blur-3xl animate-pulse" />
        <div className="relative bg-card/40 backdrop-blur-2xl p-8 rounded-4xl border border-border/40 shadow-2xl">
          <Trophy className="w-16 h-16 text-primary/40" />
        </div>
      </div>

      <h3 className="text-3xl font-black text-foreground tracking-tight mb-4">
        {t('leaderboard.emptyTitle', 'Leaderboard is empty')}
      </h3>
      <p className="text-lg text-muted-foreground/60 max-w-sm font-medium leading-relaxed">
        {t('leaderboard.empty', 'No participants have submitted their scores yet. Be the first one!')}
      </p>
    </motion.div>
  )
}
