import { RandomQuestion } from '@/types/random'
import axios from 'axios'

export const Randonapi = async (
  lang: string
): Promise<RandomQuestion[]> => {
  try {
    const response = await axios.get(
      `/api/gemini/random?lang=${encodeURIComponent(lang)}`
    )

    const questions: RandomQuestion[] = JSON.parse(response.data.result)

    return questions
  } catch (error) {
    console.error(error)
    return []
  }
}
