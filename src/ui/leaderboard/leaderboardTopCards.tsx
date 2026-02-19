'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { useTranslation } from 'react-i18next'
import { BarChart3 } from 'lucide-react'
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

interface LeaderboardTopCardProps {
  icon: StaticImageData
  alt: string
  trackLabel: string
  fullName: string
  score: number
  tintClass: string
  iconWrapClass: string
  trackTextClass: string
}

const LeaderboardTopCard = ({
  icon,
  alt,
  trackLabel,
  fullName,
  score,
  tintClass,
  iconWrapClass,
  trackTextClass,
}: LeaderboardTopCardProps) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-4 shadow-lg">
    <div className={`absolute inset-0 bg-linear-to-br ${tintClass} opacity-90`} />
    <div className="relative flex items-center gap-3">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${iconWrapClass}`}>
        <Image src={icon} alt={alt} width={28} height={28} className="object-contain" />
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-semibold uppercase tracking-wide ${trackTextClass}`}>{trackLabel}</p>
        <p className="text-lg font-bold text-foreground truncate">{fullName}</p>
        <span className="text-sm font-semibold text-muted-foreground">{score.toFixed(0)} pts</span>
      </div>
    </div>
  </div>
)

export const LeaderboardTopCards = ({
  topFrontend,
  topBackend,
  topMobile,
  latestDate,
}: LeaderboardTopCardsProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4"
      data-aos="fade-up"
    >
      {topFrontend && (
        <LeaderboardTopCard
          icon={reactIcon}
          alt="Frontend"
          trackLabel={t('leaderboard.stats.frontend', 'Frontend')}
          fullName={topFrontend.fullName}
          score={topFrontend.frontendScore}
          tintClass="from-primary/12 via-primary/6 to-primary/18"
          iconWrapClass="bg-primary/15 border-primary/30"
          trackTextClass="text-primary"
        />
      )}

      {topBackend && (
        <LeaderboardTopCard
          icon={charmIcon}
          alt="Backend"
          trackLabel={t('leaderboard.stats.backend', 'Backend')}
          fullName={topBackend.fullName}
          score={topBackend.backendScore}
          tintClass="from-primary-2/12 via-primary-2/6 to-primary-2/18"
          iconWrapClass="bg-primary-2/15 border-primary-2/30"
          trackTextClass="text-primary-2"
        />
      )}

      {topMobile && (
        <LeaderboardTopCard
          icon={mobileIcon}
          alt="Mobile"
          trackLabel={t('leaderboard.stats.mobile', 'Mobile')}
          fullName={topMobile.fullName}
          score={topMobile.mobdevScore || 0}
          tintClass="from-purple-500/12 via-purple-500/6 to-purple-500/18"
          iconWrapClass="bg-purple-500/15 border-purple-500/30"
          trackTextClass="text-purple-400"
        />
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
  )
}
