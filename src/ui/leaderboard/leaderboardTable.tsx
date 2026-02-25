'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Calendar, Layers } from 'lucide-react'
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative w-full rounded-2xl border border-border bg-card/60 backdrop-blur-xl overflow-hidden shadow-sm"
      data-aos="fade-up"
    >
      <div className="hidden lg:grid grid-cols-[60px_1.5fr_1fr_1fr_1fr_1.2fr] items-center gap-4 px-6 py-4 border-b border-border bg-muted/30">
        <div className="text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {t('leaderboard.columns.rank', '#')}
        </div>
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {t('leaderboard.columns.name', 'Participant')}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Image src={reactIcon} alt="FE" width={16} height={16} className="opacity-80" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('common.frontend')}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Image src={charmIcon} alt="BE" width={16} height={16} className="opacity-80" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('common.backend')}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Image src={mobileIcon} alt="MB" width={16} height={16} className="opacity-80" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('common.mobile')}</span>
        </div>

        <div className="flex items-center justify-end gap-2 text-right">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground/70" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {t('leaderboard.columns.date', 'Last Activity')}
          </span>
        </div>
      </div>

      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t('leaderboard.rankings', 'Rankings')}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
          {players.length} {t('leaderboard.players', 'Players')}
        </span>
      </div>

      <div className="flex flex-col divide-y divide-border/50">
        {players.map((player, idx) => (
          <LeaderboardItem key={idx} player={player} index={idx} />
        ))}
      </div>
    </motion.div>
  )
}