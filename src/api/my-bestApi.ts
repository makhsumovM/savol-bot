import { api } from '@/lib/utils/axiosConfig'
import { IMyBestResponse } from '@/types/my-best'

export const getMyBest = async () => {
  try {
    const response = await api.get<IMyBestResponse>('/marathon/my-best')
    return response.data.data || []
  } catch (error) {
    throw error
  }
}