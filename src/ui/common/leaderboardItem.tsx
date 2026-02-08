'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Code2, Crown, Medal, Server } from 'lucide-react'
import { ILeaderboard } from '@/types/leaderboard'
import Image from 'next/image'

interface LeaderboardItemProps {
  player: ILeaderboard
  index: number
}

const rankConfig = {
  1: {
    icon: <Crown className="w-5 h-5" />,
    emoji: null,
    bg: 'bg-gradient-to-br from-yellow-400/25 via-amber-500/20 to-orange-400/15',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    glow: 'shadow-lg shadow-yellow-500/20',
    badge: 'bg-gradient-to-r from-yellow-500 to-amber-500',
  },
  2: {
    icon: <Medal className="w-5 h-5" />,
    emoji: null,
    bg: 'bg-gradient-to-br from-slate-300/20 via-gray-400/15 to-slate-500/10',
    border: 'border-slate-400/40',
    text: 'text-slate-300',
    glow: 'shadow-lg shadow-slate-400/15',
    badge: 'bg-gradient-to-r from-slate-400 to-gray-500',
  },
  3: {
    icon: <Medal className="w-5 h-5" />,
    emoji: null,
    bg: 'bg-gradient-to-br from-amber-600/20 via-orange-600/15 to-amber-700/10',
    border: 'border-amber-600/40',
    text: 'text-amber-500',
    glow: 'shadow-lg shadow-amber-500/15',
    badge: 'bg-gradient-to-r from-amber-600 to-orange-600',
  },
  4: {
    icon: <Medal className="w-4 h-4" />,
    emoji: null,
    bg: 'bg-gradient-to-br from-blue-500/15 via-blue-600/10 to-indigo-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    glow: 'shadow-md shadow-blue-500/10',
    badge: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  },
  5: {
    icon: <Medal className="w-4 h-4" />,
    emoji: null,
    bg: 'bg-gradient-to-br from-violet-500/15 via-purple-600/10 to-fuchsia-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    glow: 'shadow-md shadow-violet-500/10',
    badge: 'bg-gradient-to-r from-violet-500 to-purple-500',
  },
  default: {
    icon: null,
    emoji: null,
    bg: 'bg-card/50',
    border: 'border-border/30',
    text: 'text-muted-foreground',
    glow: '',
    badge: 'bg-muted',
  },
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const day = date.getDate().toString().padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return { date: `${day} ${month} ${year}`, time: `${hours}:${minutes}` }
}

export const LeaderboardItem = ({ player, index }: LeaderboardItemProps) => {
  const config = rankConfig[player.rank as 1 | 2 | 3 | 4 | 5] ?? rankConfig.default
  const { date, time } = formatDate(player.lastAchievedAt)
  const firstLetter = player.fullName?.charAt(0).toUpperCase()
  const totalScore = player.frontendScore + player.backendScore
  const frontendPercent = totalScore > 0 ? (player.frontendScore / totalScore) * 100 : 0
  const backendPercent = totalScore > 0 ? (player.backendScore / totalScore) * 100 : 0

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  return (
    <motion.div
      data-aos="fade-up"
      data-aos-delay={index * 40}
      initial={{ opacity: 0, x: -30, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        type: 'spring',
        stiffness: 150,
        damping: 20,
      }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`
        group relative overflow-hidden
        rounded-xl border backdrop-blur-sm
        transition-all duration-300 cursor-pointer
        ${config.bg} ${config.border} ${config.glow}
        hover:border-primary/40
      `}
    >
      {player.rank <= 5 && (
        <div className={`absolute inset-0 ${config.bg} opacity-30 blur-xl -z-10`} />
      )}

      {player.rank === 1 && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-yellow-400/10 to-transparent -translate-x-full"
          animate={{ translateX: ['150%', '-150%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
        />
      )}

      <div className="hidden md:grid md:grid-cols-[80px_1fr_150px_150px_180px] gap-4 items-center px-6 py-4">
        <div className="flex items-center justify-center">
          <motion.div
            whileHover={{ rotate: player.rank === 1 ? [0, -10, 10, 0] : 0, scale: 1.1 }}
            className={`
              flex items-center justify-center w-12 h-12 rounded-xl
              border transition-all duration-300
              ${config.bg} ${config.border} ${config.text}
            `}
          >
            {config.icon ?? <span className="text-lg font-bold">{player.rank}</span>}
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/50">
              {player.profilePicture ? (
                <Image
                  src={`${apiUrl}/${player.profilePicture}`}
                  alt={player.fullName}
                  fill
                  sizes="40px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                  {firstLetter}
                </div>
              )}
            </div>
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {player.fullName}
            </span>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-lg font-bold text-foreground tabular-nums">
              {player.frontendScore.toFixed(0)}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${frontendPercent}%` }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="h-full bg-linear-to-r from-primary to-primary/70 rounded-full"
            />
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Server className="w-4 h-4 text-primary-2" />
            <span className="text-lg font-bold text-foreground tabular-nums">
              {player.backendScore.toFixed(0)}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${backendPercent}%` }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.1 }}
              className="h-full bg-linear-to-r from-primary-2 to-primary-2/70 rounded-full"
            />
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2 text-sm font-medium text-foreground">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            {date}
          </div>
          <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mt-1">
            <Clock className="w-3 h-3" />
            {time}
          </div>
        </div>
      </div>

      <div className="md:hidden p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`
                        flex items-center justify-center w-10 h-10 rounded-xl
                        border transition-all duration-300 shadow-sm
                        ${config.bg} ${config.border} ${config.text}
                    `}
            >
              {config.icon ?? <span className="text-sm font-bold">{player.rank}</span>}
            </motion.div>

            <div className="flex flex-col">
              <span className="text-base font-bold text-foreground leading-tight">
                {player.fullName}
              </span>
              {player.rank <= 3 && (
                <span className={`text-[10px] uppercase tracking-wider font-bold ${config.text}`}>
                  Top {player.rank}
                </span>
              )}
            </div>
          </div>

          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/50">
            {player.profilePicture ? (
              <Image
                src={`${apiUrl}/${player.profilePicture}`}
                alt={player.fullName}
                fill
                sizes="40px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                {firstLetter}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/40 rounded-xl p-3 border border-border/40 flex flex-col justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5 text-primary" />
              Frontend
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-xl font-black text-foreground tabular-nums leading-none">
                {player.frontendScore}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium mb-0.5">
                {frontendPercent.toFixed(0)}%
              </span>
            </div>
            <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${frontendPercent}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          <div className="bg-background/40 rounded-xl p-3 border border-border/40 flex flex-col justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <Server className="w-3.5 h-3.5 text-primary-2" />
              Backend
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-xl font-black text-foreground tabular-nums leading-none">
                {player.backendScore}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium mb-0.5">
                {backendPercent.toFixed(0)}%
              </span>
            </div>
            <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${backendPercent}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-primary-2 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground/80 pt-2 border-t border-border/30">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {time}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
