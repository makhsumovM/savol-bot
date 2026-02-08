'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
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

  const firstLetter = fullName?.charAt(0).toUpperCase()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const rankNumber = Number(rank)
  const rankTone =
    rankNumber === 1
      ? 'text-yellow-400'
      : rankNumber === 2
        ? 'text-gray-300'
        : rankNumber === 3
          ? 'text-amber-500'
          : 'text-primary'

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.035] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/40 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[110px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[110px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10 md:py-14 space-y-8 sm:space-y-10">
        <motion.div
          className="flex flex-col items-center gap-3 text-center md:items-start md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          data-aos="fade-up"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
            <span className="text-primary">{myRankFirstWord}</span>
            {myRankRestWords.length > 0 && (
              <span className="text-primary-2"> {myRankRestWords.join(' ')}</span>
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
            <div
              className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card/80 backdrop-blur-xl shadow-[0_30px_120px_-70px_rgba(0,0,0,0.7)]"
              data-aos="fade-up"
              data-aos-delay="60"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-primary/10 pointer-events-none" />
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

              <div className="relative p-6 sm:p-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  <div className="relative">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-linear-to-br from-primary/60 via-primary-2/40 to-secondary/50 shadow-2xl">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-muted">
                        {profilePicture ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={`${apiUrl}/${profilePicture}`}
                              alt={fullName}
                              fill
                              sizes="(max-width: 768px) 128px, 160px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-5xl">
                            {firstLetter}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-6 text-center lg:text-left">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                          {fullName}
                        </h2>
                        <div className="mt-2 flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {t('myRank.currentPosition')}
                        </div>
                      </div>

                      <div className="flex flex-col items-center md:items-end gap-1">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                          Rank
                        </span>
                        <span className={`text-5xl sm:text-6xl font-black ${rankTone}`}>
                          #{rank}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        data-aos="fade-up"
                        data-aos-delay="140"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
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
                      </div>

                      <div
                        className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-primary-2/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl border border-primary-2/20 bg-primary-2/10 flex items-center justify-center shrink-0">
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
