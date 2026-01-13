'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Crown, User } from 'lucide-react'
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
    bg: 'bg-yellow-500/15',
    text: 'text-yellow-500',
    label: <Crown className="w-4 h-4" />,
  },
  2: {
    bg: 'bg-gray-400/15',
    text: 'text-gray-300',
    label: '2',
  },
  3: {
    bg: 'bg-amber-600/15',
    text: 'text-amber-500',
    label: '3',
  },
  default: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    label: null,
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
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative mt-8 lg:mt-0"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary-2/10 rounded-3xl blur-xl" />
      <div className="relative rounded-2xl sm:rounded-3xl border border-border/50 bg-card p-5 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
            {t('leaderboard.title')}
          </span>
          <Link
            href="/leaderboard"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {t('common.viewAll')}
          </Link>
        </div>

        {isLoading && <Loading variant="small" />}

        {!isLoading && (
          <div className="space-y-3">
            {top5?.map((player, index) => {
              const style = rankStyles[player.rank as 1 | 2 | 3] ?? rankStyles.default
              const isMe = player.rank === myRank

              return (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className={`
                    flex items-center  justify-between rounded-xl px-3 py-2 backdrop-blur-md
                    hover:scale-[1.02] transition-all duration-200
                    ${
                      isMe
                        ? 'border-2 text-primary-2 border-primary-2 shadow-md '
                        : 'border border-border/40 bg-background/70'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                        isMe ? 'bg-primary/40 text-primary-2 ' : style.bg + ' ' + style.text
                      }`}
                    >
                      {style.label ?? player.rank}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-40 ${
                        isMe ? 'text-primary-2  font-semibold' : 'text-foreground'
                      }`}
                    >
                      {player.fullName}
                      {isMe && (
                        <span className="ml-2 text- text-primary-2">
                          ({t('leaderboard.common')})
                        </span>
                      )}
                    </span>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      isMe ? 'text-primary-2' : 'text-foreground/80'
                    }`}
                  >
                    {player.totalScore.toLocaleString()}
                  </span>
                </motion.div>
              )
            })}

            {!isInTop5 && myRank && myProfile && myRank > 5 && myTotalScore > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center justify-between rounded-xl px-3 py-3 backdrop-blur-md
                           border-2 border-primary bg-primary/20 shadow-lg shadow-primary/40
                           hover:scale-[1.03] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/40 text-primary font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-primary">
                      {myProfile.fullName} ({t('common.you')})
                    </span>
                    <p className="text-xs text-primary/80 mt-0.5">#{myRank}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">
                  {myTotalScore.toLocaleString()}
                </span>
              </motion.div>
            )}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-border/30 flex justify-between text-[10px] text-muted-foreground">
          <span>{t('leaderboard.top5')}</span>
          <span>{t('leaderboard.columns.score')}</span>
        </div>
      </div>
    </motion.div>
  )
}
