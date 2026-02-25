'use client'

import { ElementType } from 'react'
import { motion } from 'framer-motion'
import { Clock, Code2, Crown, Medal, Server, Smartphone, User } from 'lucide-react'
import { ILeaderboard } from '@/types/leaderboard'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface LeaderboardItemProps {
  player: ILeaderboard
  index: number
}

const rankColors = {
  1: { text: 'text-primary', border: 'border-primary/40', bg: 'bg-primary/10' },
  2: { text: 'text-foreground/80', border: 'border-border', bg: 'bg-muted/30' },
  3: { text: 'text-primary-2', border: 'border-primary-2/40', bg: 'bg-primary-2/10' },
  default: { text: 'text-muted-foreground', border: 'border-transparent', bg: 'bg-transparent' },
}

const formatDate = (dateString: string, t: any) => {
  const date = new Date(dateString)
  const monthKey = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ][date.getMonth()]

  return {
    date: `${date.getDate()} ${t(`common.monthsShort.${monthKey}`)}`,
    time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
}

export const LeaderboardItem = ({ player, index }: LeaderboardItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rankStyle = (rankColors as any)[player.rank] ?? rankColors.default
  const { t } = useTranslation()
  const { date, time } = formatDate(player.lastAchievedAt, t)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const totalScore = player.frontendScore + player.backendScore + (player.mobdevScore || 0)
  const getPercent = (score: number) => totalScore > 0 ? (score / totalScore) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`
         group relative
         hover:bg-muted/40 transition-colors duration-200
         px-4 py-3 sm:px-6 sm:py-4
      `}
    >
      <div className="hidden lg:grid grid-cols-[60px_1.5fr_1fr_1fr_1fr_1.2fr] items-center gap-4">

        <div className="flex justify-center">
          <div className={`
               flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm
               ${player.rank <= 3 ? rankStyle.bg + ' ' + rankStyle.text + ' ring-1 ring-inset ' + rankStyle.border : 'bg-muted/20 text-muted-foreground'}
            `}>
            {player.rank === 1 && <Crown className="w-4 h-4" />}
            {player.rank === 2 && <Medal className="w-4 h-4" />}
            {player.rank === 3 && <Medal className="w-4 h-4" />}
            {player.rank > 3 && player.rank}
          </div>
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            {player.profilePicture ? (
              <Image src={`${apiUrl}/${player.profilePicture}`} alt="" fill className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">{player.fullName}</p>
            <p className="text-xs text-muted-foreground">{t('common.total')}: <span className="text-primary font-bold">{totalScore.toFixed(0)}</span></p>
          </div>
        </div>

        <ScoreCell icon={Code2} score={player.frontendScore} percent={getPercent(player.frontendScore)} color="bg-primary" />
        <ScoreCell icon={Server} score={player.backendScore} percent={getPercent(player.backendScore)} color="bg-primary-2" />
        <ScoreCell icon={Smartphone} score={player.mobdevScore || 0} percent={getPercent(player.mobdevScore || 0)} color="bg-blue-500" />

        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-xs font-medium text-foreground/80">{date}</span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> {time}
          </span>
        </div>
      </div>

      <div className="lg:hidden flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`
                  flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shrink-0
                  ${player.rank <= 3 ? rankStyle.bg + ' ' + rankStyle.text + ' ring-1 ring-inset ' + rankStyle.border : 'bg-muted/20 text-muted-foreground'}
               `}>
              {player.rank}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                {player.profilePicture ? (
                  <Image src={`${apiUrl}/${player.profilePicture}`} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
              <span className="font-semibold text-sm text-foreground">{player.fullName}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-sm font-bold text-primary">{totalScore.toFixed(0)}</span>
            <span className="text-[10px] text-muted-foreground">{date}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pl-11">
          <MobileScore pill="FE" score={player.frontendScore} color="text-primary" bg="bg-primary/10" />
          <MobileScore pill="BE" score={player.backendScore} color="text-primary-2" bg="bg-primary-2/10" />
          <MobileScore pill="MB" score={player.mobdevScore || 0} color="text-blue-500" bg="bg-blue-500/10" />
        </div>
      </div>
    </motion.div>
  )
}

const ScoreCell = ({ icon: Icon, score, percent, color }: { icon: ElementType, score: number, percent: number, color: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="font-bold text-sm tabular-nums text-foreground">{score.toFixed(0)}</span>
    </div>
    <div className="h-1 w-20 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`h-full ${color}`}
      />
    </div>
  </div>
)

const MobileScore = ({ pill, score, color, bg }: { pill: string, score: number, color: string, bg: string }) => (
  <div className={`flex items-center justify-between px-2 py-1 rounded-md ${bg}`}>
    <span className={`text-[10px] font-bold ${color}`}>{pill}</span>
    <span className="text-xs font-bold tabular-nums text-foreground">{score.toFixed(0)}</span>
  </div>
)
