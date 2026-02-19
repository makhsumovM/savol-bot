'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy, Sparkles, Clock3 } from 'lucide-react'

export const LeaderboardHeader = () => {
  const { t } = useTranslation()
  const leaderboardTitle = t('leaderboard.title')
  const [leaderboardFirstWord, ...leaderboardRestWords] = leaderboardTitle.split(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col gap-5 md:gap-6 text-center md:text-left md:flex-row md:items-end md:justify-between"
      data-aos="fade-up"
    >
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
            {t('leaderboard.top')}
          </span>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
          <span className="text-[#ec6216]">{leaderboardFirstWord}</span>
          {leaderboardRestWords.length > 0 && (
            <span className="text-[#13aeac]"> {leaderboardRestWords.join(' ')}</span>
          )}
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
          {t(
            'leaderboard.description',
            'Track the best results across frontend, backend, and mobile.',
          )}
        </p>
      </div>

      <div className="flex flex-wrap justify-center md:justify-end gap-3">
        <span className="inline-flex items-center gap-3 rounded-2xl border border-primary/35 bg-linear-to-r from-primary/18 via-primary/10 to-transparent px-4 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-primary/10 backdrop-blur-md">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" />
          </span>
          <span>{t('leaderboard.meta.multiTrack')}</span>
        </span>
        <span className="inline-flex items-center gap-3 rounded-2xl border border-primary-2/35 bg-linear-to-r from-primary-2/20 via-primary-2/10 to-transparent px-4 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-primary-2/10 backdrop-blur-md">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-2/20 border border-primary-2/30">
            <Clock3 className="w-4 h-4 text-primary-2" />
          </span>
          <span>{t('leaderboard.meta.refreshWindow', 'Data refreshed from 15 minutes to 2 hours')}</span>
        </span>
      </div>
    </motion.div>
  )
}
