import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { ILeaderboard } from '@/types/leaderboard'
import { useTranslation } from 'react-i18next'

interface LeaderboardItemProps {
  player: ILeaderboard
  index: number
}

const getRankBg = (rank: number) => {
  switch (rank) {
    case 1:
      return 'from-yellow-400/20 to-yellow-600/30 dark:from-yellow-900/40 dark:to-yellow-800/20'
    case 2:
      return 'from-gray-400/20 to-gray-600/30 dark:from-gray-900/40 dark:to-gray-800/20'
    case 3:
      return 'from-amber-500/20 to-amber-700/30 dark:from-amber-900/40 dark:to-amber-800/20'
    case 4:
      return 'from-blue-400/20 to-blue-600/30 dark:from-blue-900/40 dark:to-blue-800/20'
    case 5:
      return 'from-green-400/20 to-green-600/30 dark:from-green-900/40 dark:to-green-800/20'
    default:
      return 'from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5'
  }
}

const getTrophyColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'text-yellow-500 drop-shadow-glow-yellow'
    case 2:
      return 'text-gray-400 drop-shadow-glow-gray'
    case 3:
      return 'text-amber-600 drop-shadow-glow-amber'
    case 4:
      return 'text-blue-500'
    case 5:
      return 'text-green-500'
    default:
      return 'text-primary'
  }
}

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-2xl shadow-yellow-500/50'
    case 2:
      return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-2xl shadow-gray-500/50'
    case 3:
      return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-2xl shadow-amber-600/50'
    default:
      return 'bg-primary text-white'
  }
}

export const LeaderboardItem = ({ player, index }: LeaderboardItemProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 rounded-3xl bg-linear-to-r ${getRankBg(
          player.rank,
        )} blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
      />

      <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
        <div className="flex items-center justify-between p-6 md:p-8">
          <div className="flex items-center gap-6 md:gap-10">
            <div className="relative">
              {player.rank <= 3 ? (
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${getRankBadge(
                    player.rank,
                  )} flex items-center justify-center font-black text-3xl md:text-4xl shadow-2xl animate-pulse-slow`}
                >
                  {player.rank}
                </div>
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-foreground/70">
                    {player.rank}
                  </span>
                </div>
              )}
              <Trophy
                size={player.rank <= 3 ? 48 : 36}
                className={`absolute -top-4 -right-4 ${getTrophyColor(player.rank)}`}
              />
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{player.fullName}</h3>
              <p className="text-muted-foreground text-sm md:text-base mt-1">
                Top {player.rank} {t('leaderboard.inLeaderboard')}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-4xl md:text-5xl font-black bg-linear-to-r from-primary to-primary-2 bg-clip-text text-transparent">
              {player.totalScore.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-sm md:text-lg mt-1">
              {t('leaderboard.columns.score')}
            </p>
          </div>
        </div>

        {player.rank <= 5 && <div className="h-2 bg-linear-to-r from-primary/50 to-primary-2/50" />}
      </div>
    </motion.div>
  )
}
