import { ILeaderboard } from '@/types/leaderboard'

export const formatDateLabel = (date?: Date | null) => {
  if (!date) return '-'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getTopByScore = (
  players: ILeaderboard[] | undefined,
  key: 'frontendScore' | 'backendScore' | 'mobdevScore',
) => {
  if (!players || !players.length) return null
  return players.reduce<ILeaderboard | null>((best, player) => {
    const currentBest = best ? best[key] || 0 : -Infinity
    const currentValue = player[key] || 0
    return currentValue > currentBest ? player : best
  }, null)
}

export const getLatestDate = (players: ILeaderboard[] | undefined) => {
  const latestStamp = players?.reduce<number>((latest, player) => {
    const ts = new Date(player.lastAchievedAt).getTime()
    return ts > latest ? ts : latest
  }, 0)

  return latestStamp ? new Date(latestStamp) : null
}