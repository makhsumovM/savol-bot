'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy, Calendar, Sparkles } from 'lucide-react'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getLeaderboard } from '@/api/leaderboardApi'
import { ILeaderboard } from '@/types/leaderboard'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'
import { LeaderboardItem } from '@/ui/common/leaderboardItem'
import Image from 'next/image'

const LeaderboardPage = () => {
  const { t } = useTranslation()
  const leaderboardTitle = t('leaderboard.title')
  const [leaderboardFirstWord, ...leaderboardRestWords] = leaderboardTitle.split(' ')

  const { data, isLoading, isError } = useQuery<ILeaderboard[]>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchOnWindowFocus: false,
  })

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="absolute -top-40 -right-40 h-80 w-80 sm:h-[500px] sm:w-[500px] rounded-full bg-primary/25 blur-[120px] animate-pulse" />
      <div
        className="absolute -bottom-40 -left-40 h-72 w-72 sm:h-[450px] sm:w-[450px] rounded-full bg-primary-2/20 blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px] animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
          data-aos="fade-up"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            data-aos="zoom-in"
            data-aos-delay="60"
          >
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('leaderboard.top')}</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="text-[#ec6216]">{leaderboardFirstWord}</span>
            {leaderboardRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {leaderboardRestWords.join(' ')}</span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            {t('leaderboard.description')}
          </motion.p>
        </motion.div>

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.leaderboardLoadError')} />}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:block relative mb-4 overflow-hidden"
            >
              <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm px-6 py-4">
                <div className="grid grid-cols-[80px_1fr_150px_150px_180px] gap-4 items-center">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-center">
                    #
                  </span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    {t('leaderboard.columns.name')}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <Image
                      src={reactIcon}
                      alt="Frontend"
                      width={22}
                      height={22}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                    Frontend
                  </span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <Image
                      src={charmIcon}
                      alt="Backend"
                      width={22}
                      height={22}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                    Backend
                  </span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-right flex items-center justify-end gap-2">
                    <Calendar className="w-4 h-4" />
                    {t('leaderboard.columns.date')}
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3">
              {data.map((player, idx) => (
                <LeaderboardItem key={idx} player={player} index={idx} />
              ))}
            </div>

            {data.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {t('leaderboard.empty', 'Пока нет участников в рейтинге')}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default LeaderboardPage
