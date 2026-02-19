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
          gradient="from-blue-500/10 to-blue-500/5 dark:from-blue-400/10 dark:to-blue-400/5"
          accentColor="text-blue-600 dark:text-blue-400"
          border="border-blue-500/20"
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
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className={`
         group relative overflow-hidden rounded-3xl
         border bg-card/50 backdrop-blur-md p-5 shadow-sm
         transition-all hover:shadow-md ${border}
      `}
  >
    <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

    <div className="relative z-10 flex items-start justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-border/50 bg-background/50 p-1.5 ">
            <Image src={icon} alt={label} className="h-full w-full object-contain" />
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${accentColor}`}>
            {label}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-foreground leading-tight truncate max-w-40">
            {player.fullName}
          </h3>
          <p className="text-2xl font-black tracking-tight mt-1 text-foreground">
            {score.toFixed(0)} <span className="text-sm font-medium text-muted-foreground">pts</span>
          </p>
        </div>
      </div>

      {player.profilePicture && (
        <div className="relative h-12 w-12 rounded-full border-2 border-background shadow-sm overflow-hidden">
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
  </motion.div>
)

const StatsCard = ({ latestDate }: { latestDate: Date | null }) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md p-5 shadow-sm flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-linear-to-br from-muted/50 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t('leaderboard.stats.updated', 'Status')}
          </span>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {t('leaderboard.lastUpdated', 'Last Updated')}
        </p>
        <p className="text-xl font-bold text-foreground">
          {latestDate ? formatDateLabel(latestDate) : '-'}
        </p>
      </div>
    </motion.div>
  )
}
