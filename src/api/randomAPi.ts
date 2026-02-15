import axios from 'axios'
import { RandomQuestion } from '@/types/random'
export const randomApi = async (
  lang: string,
  type: 'frontend' | 'backend' | 'mobile' = 'frontend',
  topic: string = 'all',
) => {
  try {
    const { data } = await axios.get<{ result: RandomQuestion[] }>('/api/ai/random', {
      params: {
        lang,
        type,
        topic,
      },
    })

    return data.result || []
  } catch (error) {
    console.error('Error fetching random questions:', error)
    return []
  }
}
