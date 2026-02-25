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
      className="relative w-full rounded-4xl border border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      data-aos="fade-up"
    >
      <div className="hidden lg:grid grid-cols-[60px_1.5fr_1fr_1fr_1fr_1.2fr] items-center gap-4 px-8 py-5 border-b border-border/40 bg-muted/20">
        <div className="text-center text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
          {t('leaderboard.columns.rank', '#')}
        </div>
        <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
          {t('leaderboard.columns.name', 'Participant')}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Image src={reactIcon} alt="FE" width={14} height={14} className="opacity-40" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{t('common.frontend')}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Image src={charmIcon} alt="BE" width={14} height={14} className="opacity-40" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{t('common.backend')}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Image src={mobileIcon} alt="MB" width={14} height={14} className="opacity-40" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{t('common.mobile')}</span>
        </div>

        <div className="flex items-center justify-end gap-2 text-right">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground/40" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
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