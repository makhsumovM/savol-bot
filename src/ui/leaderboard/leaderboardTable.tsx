'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Calendar } from 'lucide-react'
import { ILeaderboard } from '@/types/leaderboard'
import { LeaderboardItem } from '@/ui/common/leaderboardItem'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'
import mobileIcon from '../../../public/flutter.png'

interface LeaderboardTableProps {
  players: ILeaderboard[]
}

export const LeaderboardTable = ({ players }: LeaderboardTableProps) => {
  const { t } = useTranslation()

  return (
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
        {players.map((player, idx) => (
          <LeaderboardItem key={idx} player={player} index={idx} />
        ))}
      </div>
    </motion.div>
  )
}
