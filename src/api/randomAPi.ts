import axios from 'axios'
import { RandomQuestion } from '@/types/random'

export const randomApi = async (lang: string, type: 'frontend' | 'backend' = 'frontend') => {
  try {
    const response = await axios.get('/api/gemini/random', {
      params: { lang, type },
    })
    const resultString = response.data.result

    if (!resultString) return []

    const questions: RandomQuestion[] = JSON.parse(resultString)
    return questions
  } catch (error) {
    console.error(error)
    return []
  }
}
