'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy } from 'lucide-react'

export const LeaderboardEmptyState = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse" />
        <div className="relative bg-card/50 backdrop-blur-xl p-6 rounded-full border border-border/50 shadow-xl">
          <Trophy className="w-12 h-12 text-muted-foreground" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">
        {t('leaderboard.emptyTitle', 'Leaderboard is empty')}
      </h3>
      <p className="text-muted-foreground max-w-sm">
        {t('leaderboard.empty', 'No participants have submitted their scores yet. Be the first one!')}
      </p>
    </motion.div>
  )
}