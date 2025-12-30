'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import { ILeaderboard } from '@/types/leaderboard'
import { getLeaderboard } from '@/api/leaderboardApi'
import { Trophy } from 'lucide-react'
import Loading from '@/ui/common/loading'

const LeaderboardPage = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useQuery<ILeaderboard[]>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchOnWindowFocus: false,
  })

  if (isLoading || !data) {
    return <Loading />
  }

  if (isError) {
    return <Error message={t('errors.leaderboardLoadError')} />
  }

  const getRowColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 dark:bg-yellow-900/30'
    if (rank === 2) return 'bg-gray-100 dark:bg-gray-900/30'
    if (rank === 3) return 'bg-amber-100 dark:bg-amber-900/30'
    if (rank === 4) return 'bg-blue-100 dark:bg-blue-900/30'
    if (rank === 5) return 'bg-green-100 dark:bg-green-900/30'
    return 'bg-card'
  }

  const getTrophyColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400'
    if (rank === 2) return 'text-gray-300'
    if (rank === 3) return 'text-amber-600'
    if (rank === 4) return 'text-blue-400'
    if (rank === 5) return 'text-green-400'
    return 'text-muted-foreground'
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/10">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary-2/15 blur-[120px] animate-pulse-slow" />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-center mb-12 bg-linear-to-r from-primary to-primary-2 bg-clip-text text-transparent"
        >
          {t('leaderboard.title')}
        </motion.h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border/30 shadow-xl bg-card/80 backdrop-blur-sm rounded-3xl">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left text-foreground font-semibold">
                  {t('leaderboard.columns.rank')}
                </th>
                <th className="p-4 text-left text-foreground font-semibold">
                  {t('leaderboard.columns.username')}
                </th>
                <th className="p-4 text-left text-foreground font-semibold">
                  {t('leaderboard.columns.score')}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => (
                <motion.tr
                  key={element.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${getRowColor(
                    element.rank,
                  )} hover:bg-muted/50 transition-colors duration-300 border-t border-border/30`}
                >
                  <td className="p-4 flex items-center gap-2">
                    <Trophy size={20} className={getTrophyColor(element.rank)} />
                    {element.rank}
                  </td>
                  <td className="p-4">{element.fullName}</td>
                  <td className="p-4">{element.totalScore}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default LeaderboardPage
