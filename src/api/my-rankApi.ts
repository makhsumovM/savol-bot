import { api } from '@/lib/utils/axiosConfig'
import { IMyRank } from '@/types/my-rank'

export const getMyRank = async () => {
  try {
    const response = await api.get<IMyRank>('/marathon/my-rank')
    return response.data || []
  } catch (error) {
    throw error || []
  }
}
