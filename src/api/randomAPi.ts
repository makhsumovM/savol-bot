import { RandomQuestion } from '@/types/random'
import axios from 'axios'

export const Randonapi = async (lang: string, type: 'frontend' | 'backend'): Promise<RandomQuestion[]> => {
  try {
    const response = await axios.get<RandomQuestion[]>(
      `/api/gemini/random`,
      { params: { lang, type } }
    )
    return response.data ?? []
  } catch (error) {
    console.error(error)
    return []
  }
}
