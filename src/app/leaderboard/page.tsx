'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getLeaderboard } from '@/api/leaderboardApi'
import { ILeaderboard } from '@/types/leaderboard'
import { LeaderboardItem } from '@/ui/common/leaderboardItem'

const LeaderboardPage = () => {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery<ILeaderboard[]>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchOnWindowFocus: false,
  })

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary-2/25 blur-3xl animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-6xl md:text-8xl font-black text-center bg-linear-to-r from-primary via-primary-2 to-primary bg-clip-text text-transparent tracking-tight"
        >
          {t('leaderboard.title')}
        </motion.h1>

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.leaderboardLoadError')} />}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16"
          >
            <div className="hidden md:grid md:grid-cols-[80px_1fr_150px_150px_180px] gap-4 px-6 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30">
              <span>#</span>
              <span>{t('leaderboard.columns.name')}</span>
              <span className="text-center">Frontend</span>
              <span className="text-center">Backend</span>
              <span className="text-right">{t('leaderboard.columns.date')}</span>
            </div>

            <div className="divide-y divide-border/20">
              {data.map((player, idx) => (
                <LeaderboardItem key={idx} player={player} index={idx} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default LeaderboardPage
