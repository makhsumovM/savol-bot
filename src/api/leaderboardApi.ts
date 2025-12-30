import { api } from '@/lib/utils/axiosConfig'
import { ILeaderboard } from '@/types/leaderboard'

export const getLeaderboard = async () => {
  try {
    const response = await api.get<ILeaderboard>('/marathon/leaderboard')
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
}
