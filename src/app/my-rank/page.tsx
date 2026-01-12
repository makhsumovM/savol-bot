'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { Trophy } from 'lucide-react'
import { getMyRank } from '@/api/my-rankApi'
import { getProfileApi } from '@/api/authApi'
import { IMyRank } from '@/types/my-rank'
import { IProfile } from '@/types/auth'

const MyRankPage = () => {
  const { t } = useTranslation()

  const {
    data: rankResponse,
    isPending: rankPending,
    isError: rankError,
  } = useQuery<IMyRank>({
    queryKey: ['my-rank'],
    queryFn: getMyRank,
    refetchOnWindowFocus: false,
  })

  const {
    data: profileData,
    isPending: profilePending,
    isError: profileError,
  } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    refetchOnWindowFocus: false,
  })

  const isLoading = rankPending || profilePending
  const hasError = rankError || profileError || (rankResponse && rankResponse.statusCode !== 200)
  const hasData = rankResponse && profileData && rankResponse.statusCode === 200

  const rank = rankResponse?.data
  const { fullName, profilePicture, bestResult } = profileData || {}

  const getTrophyColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 drop-shadow-lg'
    if (rank === 2) return 'text-gray-300'
    if (rank === 3) return 'text-amber-600'
    if (rank === 4) return 'text-blue-400'
    if (rank === 5) return 'text-green-400'
    return 'text-muted-foreground'
  }
  const firstLetter = fullName?.charAt(0).toUpperCase()

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1)
      return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-300'
    if (rank === 2)
      return 'bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 border-gray-400'
    if (rank === 3)
      return 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-500'
    if (rank === 4)
      return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-500'
    if (rank === 5)
      return 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-500'
    return 'bg-muted dark:bg-muted/50 text-muted-foreground border-border'
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/10">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary-2/15 blur-[120px] animate-pulse-slow" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-16 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-center bg-linear-to-r from-primary to-primary-2 bg-clip-text text-transparent"
        >
          {t('myRank.title')}
        </motion.h1>

        {isLoading && <Loading />}
        {hasError && <Error message={t('errors.leaderboardLoadError')} />}

        {hasData && rank !== undefined && fullName && bestResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-2xl"
          >
            <div className="p-10 rounded-3xl shadow-2xl backdrop-blur-md bg-card/90 border border-border/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  {profilePicture ? (
                    <img
                      src={process.env.NEXT_PUBLIC_API_URL + '/' + profilePicture}
                      alt={fullName}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/50 shadow-xl"
                    />
                  ) : (
                    <div
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center
                  bg-primary/20 border-4 border-primary/50 shadow-xl"
                    >
                      <span className="text-5xl md:text-6xl font-bold text-primary">
                        {firstLetter}
                      </span>
                    </div>
                  )}

                  <div className="absolute -bottom-2 -right-2">
                    <div
                      className={`px-4 py-2 rounded-full border-2 font-bold text-lg shadow-lg ${getRankBadgeColor(
                        rank,
                      )}`}
                    >
                      #{rank}
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{fullName}</h2>
                    <p className="text-lg text-muted-foreground mt-1">
                      {t('myRank.currentPosition')}
                    </p>
                  </div>

                  <div className="flex flex-col items-center md:items-start">
                    <Trophy size={80} className={`${getTrophyColor(rank)} mb-3`} />
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border/30 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{t('profile.bestFrontendScore')}</p>
                  <p className="text-2xl font-bold text-primary">
                    {bestResult.bestFrontendScore ?? 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{t('profile.bestBackendScore')}</p>
                  <p className="text-2xl font-bold text-primary-2">
                    {bestResult.bestBackendScore ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default MyRankPage
