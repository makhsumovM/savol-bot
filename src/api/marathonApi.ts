import { MarathonQuestion } from '@/types/marathon'
import axios from 'axios'

export const marathonApi = async (
  lang: string,
  difficulty: string
): Promise<MarathonQuestion[]> => {
  try {
    const response = await axios.get(
      `/api/gemini/marathon?lang=${encodeURIComponent(lang)}&difficulty=${encodeURIComponent(difficulty)}`
    )
    const questions: MarathonQuestion[] = JSON.parse(response.data.result)
    return questions
  } catch (error) {
    console.error(error)
    return []
  }
}
