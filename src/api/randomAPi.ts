import axios from 'axios'
import { RandomQuestion } from '@/types/random'

export const randomApi = async (
  lang: string,
  type: 'frontend' | 'backend' = 'frontend',
  topic: string = 'all',
  difficulty?: string,
) => {
  try {
    const params: Record<string, string> = {
      lang,
      type,
      topic,
    }
    if (difficulty) {
      params.difficulty = difficulty
    }
    const response = await axios.get('/api/ai/random', {
      params,
    })
    const resultString = response.data.result

    if (!resultString) return []

    const questions: RandomQuestion[] = JSON.parse(resultString)
    return questions
  } catch (error) {
    console.error('Error fetching random questions:', error)
    return []
  }
}
