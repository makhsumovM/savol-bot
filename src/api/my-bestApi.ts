import { api } from '@/lib/utils/axiosConfig'
import { IMyBest } from '@/types/my-best'

export const getMyBest = async () => {
  try {
    const response = await api.get<IMyBest>('/marathon/my-best')
    return response.data || []
  } catch (error) {
    throw error
    console.log(error);

  }
}
