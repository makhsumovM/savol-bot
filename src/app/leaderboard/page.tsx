'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Trophy, Calendar, Sparkles, BarChart3, Clock3 } from 'lucide-react'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getLeaderboard } from '@/api/leaderboardApi'
import { ILeaderboard } from '@/types/leaderboard'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'
import mobileIcon from '../../../public/flutter.png'
import { LeaderboardItem } from '@/ui/common/leaderboardItem'

const formatDateLabel = (date?: Date | null) => {
  if (!date) return '-'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const getTopByScore = (
  players: ILeaderboard[] | undefined,
  key: 'frontendScore' | 'backendScore' | 'mobdevScore',
) => {
  if (!players || !players.length) return null
  return players.reduce<ILeaderboard | null>((best, player) => {
    const currentBest = best ? best[key] || 0 : -Infinity
    const currentValue = player[key] || 0
    return currentValue > currentBest ? player : best
  }, null)
}

const LeaderboardPage = () => {
  const { t } = useTranslation()
  const leaderboardTitle = t('leaderboard.title')
  const [leaderboardFirstWord, ...leaderboardRestWords] = leaderboardTitle.split(' ')

  const { data, isLoading, isError } = useQuery<ILeaderboard[]>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchOnWindowFocus: false,
  })

  const topFrontend = getTopByScore(data, 'frontendScore')
  const topBackend = getTopByScore(data, 'backendScore')
  const topMobile = getTopByScore(data, 'mobdevScore')
  const latestStamp = data?.reduce<number>((latest, player) => {
    const ts = new Date(player.lastAchievedAt).getTime()
    return ts > latest ? ts : latest
  }, 0)
  const latestDate = latestStamp ? new Date(latestStamp) : null

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="absolute -top-48 -right-32 h-72 w-72 sm:h-[420px] sm:w-[420px] rounded-full bg-primary/25 blur-[120px] animate-pulse-slow" />
      <div
        className="absolute -bottom-48 -left-32 h-72 w-72 sm:h-[420px] sm:w-[420px] rounded-full bg-primary-2/20 blur-[120px] animate-pulse-slow"
        style={{ animationDelay: '0.6s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-[110px] animate-pulse-slow"
        style={{ animationDelay: '1.2s' }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12 md:py-16 space-y-8 sm:space-y-10">
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

          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/70 backdrop-blur-md px-3 py-2 text-xs font-semibold text-muted-foreground border border-border/50">
              <Sparkles className="w-4 h-4 text-primary" />
              {t('leaderboard.meta.multiTrack', 'Multi-track scoring')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-card/70 backdrop-blur-md px-3 py-2 text-xs font-semibold text-muted-foreground border border-border/50">
              <Clock3 className="w-4 h-4 text-primary-2" />
              {t(
                'leaderboard.meta.refreshWindow',
                'Данные обновляются от 15 минут до 2 часов',
              )}
            </span>

          </div>
        </motion.div>

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.leaderboardLoadError')} />}

        {data && (
          <div className="space-y-6 sm:space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4"
              data-aos="fade-up"
            >


              {topFrontend && (
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-4 shadow-lg">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/12 via-primary/6 to-primary/18 opacity-90" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30">
                      <Image src={reactIcon} alt="Frontend" width={28} height={28} className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {t('leaderboard.stats.frontend', 'Frontend')}
                      </p>
                      <p className="text-lg font-bold text-foreground truncate">{topFrontend.fullName}</p>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {topFrontend.frontendScore.toFixed(0)} pts
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {topBackend && (
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-4 shadow-lg">
                  <div className="absolute inset-0 bg-linear-to-br from-primary-2/12 via-primary-2/6 to-primary-2/18 opacity-90" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-2/15 border border-primary-2/30">
                      <Image src={charmIcon} alt="Backend" width={28} height={28} className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary-2">
                        {t('leaderboard.stats.backend', 'Backend')}
                      </p>
                      <p className="text-lg font-bold text-foreground truncate">{topBackend.fullName}</p>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {topBackend.backendScore.toFixed(0)} pts
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {topMobile && (
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-4 shadow-lg">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500/12 via-purple-500/6 to-purple-500/18 opacity-90" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/30">
                      <Image src={mobileIcon} alt="Mobile" width={28} height={28} className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">
                        {t('leaderboard.stats.mobile', 'Mobile')}
                      </p>
                      <p className="text-lg font-bold text-foreground truncate">{topMobile.fullName}</p>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {(topMobile.mobdevScore || 0).toFixed(0)} pts
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!topMobile && (
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-4 shadow-lg">
                  <div className="absolute inset-0 bg-linear-to-br from-foreground/10 via-transparent to-foreground/5 opacity-80" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t('leaderboard.stats.updated', 'Updated')}
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {latestDate ? formatDateLabel(latestDate) : '-'}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/40 border border-border/40">
                      <BarChart3 className="w-5 h-5 text-foreground/80" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl overflow-hidden"
              data-aos="fade-up"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-primary-2/8 pointer-events-none" />
              <div className="absolute -top-28 right-10 h-36 w-36 rounded-full bg-primary/10 blur-[90px]" />
              <div className="absolute -bottom-28 left-10 h-36 w-36 rounded-full bg-primary-2/10 blur-[90px]" />

              <div className="hidden lg:block px-3 sm:px-4 py-3">
                <div className="grid grid-cols-[64px_1.4fr_1fr_1fr_1fr_1.1fr] items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  <span className="text-center">#</span>
                  <span>{t('leaderboard.columns.name')}</span>
                  <span className="flex items-center gap-2 justify-center">
                    <Image src={reactIcon} alt="Frontend" width={18} height={18} className="w-4 h-4" />
                    Frontend
                  </span>
                  <span className="flex items-center gap-2 justify-center">
                    <Image src={charmIcon} alt="Backend" width={18} height={18} className="w-4 h-4" />
                    Backend
                  </span>
                  <span className="flex items-center gap-2 justify-center">
                    <Image src={mobileIcon} alt="Mobile" width={18} height={18} className="w-4 h-4" />
                    Mobile
                  </span>
                  <span className="flex items-center gap-2 justify-end">
                    <Calendar className="w-3.5 h-3.5" />
                    {t('leaderboard.columns.date')}
                  </span>
                </div>
              </div>

              <div className="hidden md:grid lg:hidden px-3 sm:px-4 py-2.5 grid-cols-3 items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                <span className="text-left"># / {t('leaderboard.columns.name')}</span>
                <span className="text-center">{t('leaderboard.columns.score', 'Scores')}</span>
                <span className="text-right flex items-center justify-end gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {t('leaderboard.columns.date')}
                </span>
              </div>

              <div className="relative space-y-2 sm:space-y-2.5 px-1.5 sm:px-2.5 pb-3">
                {data.map((player, idx) => (
                  <LeaderboardItem key={idx} player={player} index={idx} />
                ))}
              </div>
            </motion.div>

            {data.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {t('leaderboard.empty', 'No participants in the leaderboard yet')}
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default LeaderboardPage
