import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { ILeaderboard } from '@/types/leaderboard'

interface LeaderboardItemProps {
  player: ILeaderboard
  index: number
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return '👑'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return null
  }
}

const getRowStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-transparent border-l-4 border-l-yellow-500'
    case 2:
      return 'bg-gradient-to-r from-gray-400/10 via-gray-300/5 to-transparent border-l-4 border-l-gray-400'
    case 3:
      return 'bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-transparent border-l-4 border-l-amber-600'
    default:
      return 'hover:bg-muted/30 border-l-4 border-l-transparent'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return { date: `${day} ${month} ${year}`, time: `${hours}:${minutes}` }
}

export const LeaderboardItem = ({ player, index }: LeaderboardItemProps) => {
  const rankIcon = getRankIcon(player.rank)
  const { date, time } = formatDate(player.lastAchievedAt)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group transition-all duration-300 ${getRowStyle(player.rank)}`}
    >
      <div className="hidden md:grid md:grid-cols-[80px_1fr_150px_150px_180px] gap-4 items-center px-6 py-5">
        <div className="flex items-center gap-2">
          {rankIcon ? (
            <span className="text-2xl">{rankIcon}</span>
          ) : (
            <span className="text-xl font-bold text-muted-foreground">{player.rank}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {player.fullName}
          </span>
          {player.rank === 1 && (
            <Crown size={18} className="text-yellow-500" />
          )}
        </div>

        <div className="text-center">
          <span className="text-lg font-bold text-foreground">{player.frontendScore.toFixed(2)}</span>
          <span className="block text-xs text-muted-foreground">
            {((player.frontendScore / (player.frontendScore + player.backendScore)) * 100).toFixed(2)}%
          </span>
        </div>

        {/* Backend Score */}
        <div className="text-center">
          <span className="text-lg font-bold text-foreground">{player.backendScore.toFixed(2)}</span>
          <span className="block text-xs text-muted-foreground">
            {((player.backendScore / (player.frontendScore + player.backendScore)) * 100).toFixed(2)}%
          </span>
        </div>

        {/* Date */}
        <div className="text-right">
          <span className="text-sm font-medium text-foreground">{date}</span>
          <span className="block text-xs text-muted-foreground">{time}</span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {rankIcon ? (
              <span className="text-2xl">{rankIcon}</span>
            ) : (
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                {player.rank}
              </span>
            )}
            <span className="text-lg font-semibold text-foreground">{player.fullName}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <span className="block text-muted-foreground text-xs mb-1">Frontend</span>
            <span className="font-bold text-foreground">{player.frontendScore.toFixed(2)}</span>
          </div>
          <div>
            <span className="block text-muted-foreground text-xs mb-1">Backend</span>
            <span className="font-bold text-foreground">{player.backendScore.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="block text-muted-foreground text-xs mb-1">Date</span>
            <span className="font-medium text-foreground text-xs">{date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
