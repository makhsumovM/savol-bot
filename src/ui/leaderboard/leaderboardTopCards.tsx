'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { useTranslation } from 'react-i18next'
import { TrendingUp } from 'lucide-react'
import { ILeaderboard } from '@/types/leaderboard'
import { formatDateLabel } from './leaderboardUtils'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'
import mobileIcon from '../../../public/flutter.png'

interface LeaderboardTopCardsProps {
  topFrontend: ILeaderboard | null
  topBackend: ILeaderboard | null
  topMobile: ILeaderboard | null
  latestDate: Date | null
}

export const LeaderboardTopCards = ({
  topFrontend,
  topBackend,
  topMobile,
  latestDate,
}: LeaderboardTopCardsProps) => {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6" data-aos="fade-up">
      {topFrontend && (
        <TopCard
          icon={reactIcon}
          label={t('leaderboard.stats.frontend', 'Frontend')}
          player={topFrontend}
          score={topFrontend.frontendScore}
          gradient="from-primary/10 to-primary/5"
          accentColor="text-primary"
          border="border-primary/20"
          delay={0}
        />
      )}
      {topBackend && (
        <TopCard
          icon={charmIcon}
          label={t('leaderboard.stats.backend', 'Backend')}
          player={topBackend}
          score={topBackend.backendScore}
          gradient="from-primary-2/10 to-primary-2/5"
          accentColor="text-primary-2"
          border="border-primary-2/20"
          delay={0.1}
        />
      )}
      {topMobile && (
        <TopCard
          icon={mobileIcon}
          label={t('leaderboard.stats.mobile', 'Mobile')}
          player={topMobile}
          score={topMobile.mobdevScore || 0}
          gradient="from-primary-3/10 to-primary-3/5"
          accentColor="text-primary-3"
          border="border-primary-3/25"
          delay={0.2}
        />
      )}

      <StatsCard latestDate={latestDate} />
    </div>
  )
}

const TopCard = ({
  icon,
  label,
  player,
  score,
  gradient,
  accentColor,
  border,
  delay
}: {
  icon: StaticImageData
  label: string
  player: ILeaderboard
  score: number
  gradient: string
  accentColor: string
  border: string
  delay: number
}) => {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
         group relative overflow-hidden rounded-4xl
         border bg-card/40 backdrop-blur-xl p-6 sm:p-7 shadow-sm
         transition-all duration-300 hover:shadow-xl ${border}
         hover:border-opacity-60
      `}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-background/50 shadow-sm transition-colors duration-300 ${border}`}>
              <Image src={icon} alt={label} className="h-6 w-6 object-contain" />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-background/40 ${border} ${accentColor}`}>
              {label}
            </span>
          </div>

          {player.profilePicture && (
            <div className="relative h-12 w-12 rounded-full border-2 border-background shadow-sm overflow-hidden ring-4 ring-background/50 group-hover:ring-background/80 transition-all duration-300">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${player.profilePicture}`}
                alt={player.fullName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="mt-auto">
          <h3 className={`text-xl font-black tracking-tight leading-tight truncate transition-colors duration-300 group-hover:${accentColor}`}>
            {player.fullName}
          </h3>
          <p className="text-3xl font-black tracking-tighter mt-1 text-foreground">
            {score.toFixed(0)} <span className="text-sm font-medium text-muted-foreground/70 uppercase tracking-widest">{t('common.pts')}</span>
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`h-1 w-8 rounded-full transition-all duration-500 group-hover:w-16 bg-current ${accentColor}`} />
          <div className="h-px flex-1 bg-border/40" />
        </div>
      </div>
    </motion.div>
  )
}

const StatsCard = ({ latestDate }: { latestDate: Date | null }) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-4xl border border-border/40 bg-card/40 backdrop-blur-xl p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary-2/5 opacity-50" />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
            {t('leaderboard.stats.updated', 'Status')}
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-1.5">
          {t('leaderboard.lastUpdated', 'Last Updated')}
        </p>
        <p className="text-2xl font-black text-foreground tracking-tight">
          {latestDate ? formatDateLabel(latestDate) : '-'}
        </p>
      </div>
    </motion.div>
  )
}
