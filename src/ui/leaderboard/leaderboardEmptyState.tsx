'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy } from 'lucide-react'

export const LeaderboardEmptyState = () => {
  const { t } = useTranslation()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
      <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
      <p className="text-muted-foreground">
        {t('leaderboard.empty', 'No participants in the leaderboard yet')}
      </p>
    </motion.div>
  )
}
