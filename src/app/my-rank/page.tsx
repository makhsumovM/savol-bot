'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import { Trophy } from 'lucide-react'
import Loading from '@/ui/common/loading'
import { getMyRank } from '@/api/my-rankApi'
import { IMyRank } from '@/types/my-rank'

const MyRankPage = () => {
  const { t } = useTranslation()
  const {
    data: response,
    isPending,
    isError,
  } = useQuery<IMyRank>({
    queryKey: ['my-rank'],
    queryFn: getMyRank,
    refetchOnWindowFocus: false,
  })

  if (isPending || !response) {
    return <Loading />
  }

  if (isError || response.statusCode !== 200) {
    return <Error message={t('errors.leaderboardLoadError')} />
  }

  const rank = response.data

  const getTrophyColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400'
    if (rank === 2) return 'text-gray-300'
    if (rank === 3) return 'text-amber-600'
    if (rank === 4) return 'text-blue-400'
    if (rank === 5) return 'text-green-400'
    return 'text-muted-foreground'
  }

  const getRankColor = (rank: number) => {
    if (rank === 1)
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    if (rank === 2) return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-300'
    if (rank === 3) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
    if (rank === 4) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    if (rank === 5) return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    return 'bg-card text-foreground'
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/10">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary-2/15 blur-[120px] animate-pulse-slow" />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 space-y-12 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-center mb-12 bg-linear-to-r from-primary to-primary-2 bg-clip-text text-transparent"
        >
          {t('myRank.title')}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`p-8 rounded-3xl shadow-xl backdrop-blur-sm ${getRankColor(
            rank,
          )} max-w-md w-full text-center`}
        >
          <div className="flex flex-col items-center gap-4">
            <Trophy size={64} className={`${getTrophyColor(rank)} mb-4`} />
            <h2 className="text-4xl font-bold">{t('myRank.yourRank')}</h2>
            <p className="text-6xl font-black">{rank}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MyRankPage
