'use client'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Crown, Medal, User, Sparkles, ChevronRight, Trophy } from 'lucide-react'
import { getLeaderboard } from '@/api/leaderboardApi'
import { getMyRank } from '@/api/my-rankApi'
import { getProfileApi } from '@/api/authApi'
import { ILeaderboard } from '@/types/leaderboard'
import { IMyRank } from '@/types/my-rank'
import { IProfile } from '@/types/auth'
import Loading from '@/ui/common/loading'
import { getCookie } from '@/lib/utils/cookies'

const rankStyles = {
  1: {
    bg: 'bg-gradient-to-br from-yellow-400/25 via-amber-500/20 to-orange-400/15',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/30',
    icon: <Crown className="w-4 h-4" />,
  },
  2: {
    bg: 'bg-gradient-to-br from-slate-300/20 via-gray-400/15 to-slate-500/10',
    border: 'border-slate-400/40',
    text: 'text-slate-300',
    glow: 'shadow-slate-400/20',
    icon: <Medal className="w-4 h-4" />,
  },
  3: {
    bg: 'bg-gradient-to-br from-amber-600/20 via-orange-600/15 to-amber-700/10',
    border: 'border-amber-600/40',
    text: 'text-amber-500',
    glow: 'shadow-amber-500/20',
    icon: <Medal className="w-4 h-4" />,
  },
  4: {
    bg: 'bg-gradient-to-br from-blue-500/15 via-blue-600/10 to-indigo-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/15',
    icon: <Medal className="w-4 h-4" />,
  },
  5: {
    bg: 'bg-gradient-to-br from-primary-3/15 via-purple-600/10 to-fuchsia-500/10',
    border: 'border-primary-3/30',
    text: 'text-primary-3',
    glow: 'shadow-primary-3/15',
    icon: <Medal className="w-4 h-4" />,
  },
  default: {
    bg: 'bg-background/50',
    border: 'border-border/30',
    text: 'text-foreground/70',
    glow: '',
    icon: null,
  },
}

export const HomeLeaderboardPreview = () => {
  const { t } = useTranslation()

  const { data: leaderboardData, isPending: leaderboardPending } = useQuery<ILeaderboard[]>({
    queryKey: ['leaderboard-preview'],
    queryFn: getLeaderboard,
    refetchOnWindowFocus: false,
  })
  const token = getCookie('token')
  const { data: myRankResponse } = useQuery<IMyRank>({
    queryKey: ['my-rank-preview'],
    queryFn: getMyRank,
    refetchOnWindowFocus: false,
    enabled: !!token,
  })

  const { data: profileData } = useQuery<IProfile>({
    queryKey: ['profile-preview'],
    queryFn: getProfileApi,
    enabled: !!token,
    refetchOnWindowFocus: false,
  })

  const top5 = leaderboardData?.slice(0, 5)

  const myRank = myRankResponse?.statusCode === 200 ? myRankResponse.data : null
  const myProfile = profileData

  const isInTop5 = top5?.some((player) => player.rank === myRank)

  const myTotalScore =
    (myProfile?.bestResult?.bestFrontendScore ?? 0) + (myProfile?.bestResult?.bestBackendScore ?? 0)

  const isLoading = leaderboardPending

  return (
    <div className="relative mt-8 lg:mt-0" data-aos="fade-up" data-aos-delay="100">
      <div
        className="relative rounded-2xl sm:rounded-3xl border border-border/40 bg-card/80 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/10"
        data-aos="fade-up"
        data-aos-delay="80"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase">
              {t('leaderboard.title')}
            </span>
          </div>
          <Link
            href="/leaderboard"
            className="group flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-all duration-300"
          >
            {t('common.viewAll')}
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {isLoading && <Loading variant="small" />}

        {!isLoading && (
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {top5?.map((player) => {
                const style = rankStyles[player.rank as 1 | 2 | 3] ?? rankStyles.default
                const isMe = player.rank === myRank

                return (
                  <div
                    key={player.rank}
                    className={`
      relative flex items-center justify-between rounded-xl px-3.5 py-2.5
      backdrop-blur-md cursor-pointer
      transition-all duration-300 hover:scale-[1.02]
      ${isMe
                        ? 'border-2 border-primary-2 bg-primary/19 shadow-lg shadow-primary-2/25'
                        : `border ${style.border} ${style.bg} hover:border-primary/30 ${style.glow} shadow-lg`
                      }
    `}
                  >
                    {player.rank <= 5 && !isMe && (
                      <div
                        className={`absolute inset-0 rounded-xl ${style.bg} opacity-50 blur-sm -z-10`}
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: player.rank === 1 ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.4 }}
                        className={`
          flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold
          transition-all duration-300
          ${isMe
                            ? 'bg-primary/30 text-primary shadow-inner'
                            : `${style.bg} ${style.text} border ${style.border}`
                          }
        `}
                      >
                        {style.icon ?? player.rank}
                      </motion.div>
                      <div className="flex flex-col">
                        <span
                          className={`
            text-sm font-medium truncate max-w-[100px] sm:max-w-[140px]
            ${isMe ? 'text-primary font-semibold' : 'text-foreground'}
          `}
                        >
                          {player.fullName}
                        </span>
                        {isMe && (
                          <span className="text-[10px] text-primary/80 font-medium">
                            {t('leaderboard.common')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.span
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className={`
          text-sm font-bold tabular-nums
          ${isMe ? 'text-primary' : 'text-foreground/80'}
        `}
                      >
                        {player.totalScore.toLocaleString()}
                      </motion.span>
                      <span className="text-[10px] text-muted-foreground">{t('common.pts')}</span>
                    </div>
                  </div>
                )
              })}
            </AnimatePresence>

            {!isInTop5 && myRank && myProfile && myRank > 5 && myTotalScore > 0 && (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {t('common.you')}
                  </span>
                  <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="
                    relative flex items-center justify-between rounded-xl px-3.5 py-3
                    backdrop-blur-md cursor-pointer
                    border-2 border-primary-2 bg-linear-to-r from-primary-2/20 via-primary-2/10 to-primary-2/20
                    shadow-lg shadow-primary-2/30
                    transition-all duration-300
                    overflow-hidden
                  "
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                    animate={{ translateX: ['100%', '-100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-2/30 text-primary-2 shadow-inner">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary-2">
                        {myProfile.fullName}
                      </span>
                      <span className="text-xs text-primary-2/70 font-medium">
                        #{myRank} • {t('common.you')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    <span className="text-sm font-bold text-primary-2 tabular-nums">
                      {myTotalScore.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-primary-2/70">{t('common.pts')}</span>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        )}
        <div className="mt-5 pt-4 border-t border-border/20">
          <div className="flex justify-between text-[10px] text-muted-foreground/80 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3 h-3" />
              {t('leaderboard.top5')}
            </span>
            <span>{t('leaderboard.columns.score')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
