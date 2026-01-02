import { api } from '@/lib/utils/axiosConfig'
import {  ILeaderboardResponse } from '@/types/leaderboard'

export const getLeaderboard = async () => {
  try {
    const response = await api.get<ILeaderboardResponse>('/marathon/leaderboard')
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
}
