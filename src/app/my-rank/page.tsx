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
import Image from 'next/image'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'

const MyRankPage = () => {
  const { t } = useTranslation()
  const myRankTitle = t('myRank.title')
  const [myRankFirstWord, ...myRankRestWords] = myRankTitle.split(' ')

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
    if (rank === 1) return 'text-yellow-400 drop-shadow-md'
    if (rank === 2) return 'text-gray-300 drop-shadow-md'
    if (rank === 3) return 'text-amber-600 drop-shadow-md'
    return 'text-muted-foreground'
  }

  const firstLetter = fullName?.charAt(0).toUpperCase()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[100px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <motion.div
          className="flex flex-col items-center gap-4 text-center md:items-start md:text-left mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            <span className="text-[#ec6216]">{myRankFirstWord}</span>
            {myRankRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {myRankRestWords.join(' ')}</span>
            )}
          </h1>
        </motion.div>

        {isLoading && <Loading />}
        {hasError && <Error message={t('errors.leaderboardLoadError')} />}

        {hasData && rank !== undefined && fullName && bestResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <div className="rounded-3xl border border-border/50 bg-card/80 backdrop-blur-md p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="relative group">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-primary/50 to-secondary/50 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-muted">
                      {profilePicture ? (
                        <img
                          src={apiUrl + '/' + profilePicture}
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-5xl">
                          {firstLetter}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`absolute -bottom-2 -right-2 px-4 py-1.5 rounded-full border-2 bg-background font-bold text-lg shadow-lg flex items-center gap-2 ${
                      rank === 1
                        ? 'border-yellow-400 text-yellow-500'
                        : rank === 2
                        ? 'border-gray-400 text-gray-500'
                        : rank === 3
                        ? 'border-amber-500 text-amber-600'
                        : 'border-primary/30 text-primary'
                    }`}
                  >
                    <span className="text-xs uppercase text-muted-foreground mr-1">Rank</span>#
                    {rank}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                      {fullName}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-lg font-medium">
                      {t('myRank.currentPosition')}
                    </p>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-4">
                    {rank <= 3 ? (
                      <div className="flex items-center gap-2">
                        <Trophy size={48} className={getTrophyColor(rank)} />
                        <span className="text-lg font-bold text-foreground/80">
                          {rank === 1
                            ? 'Champion!'
                            : rank === 2
                            ? 'Runner Up!'
                            : 'Bronze Medalist!'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground/60">
                        <Trophy size={32} />
                        <span>Keep pushing!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/40 rounded-2xl p-4 border border-border/40 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Image
                      src={reactIcon}
                      alt="Frontend"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      {t('profile.bestFrontendScore')}
                    </p>
                    <p className="text-2xl font-black text-foreground">
                      {bestResult.bestFrontendScore ?? 0}
                    </p>
                  </div>
                </div>

                <div className="bg-background/40 rounded-2xl p-4 border border-border/40 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-xl bg-primary-2/10 flex items-center justify-center shrink-0">
                    <Image
                      src={charmIcon}
                      alt="Backend"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      {t('profile.bestBackendScore')}
                    </p>
                    <p className="text-2xl font-black text-foreground">
                      {bestResult.bestBackendScore ?? 0}
                    </p>
                  </div>
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
