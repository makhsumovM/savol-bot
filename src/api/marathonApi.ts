import { MarathonQuestion } from '@/types/marathon'
import axios from 'axios'

export const marathonApi = async (): Promise<MarathonQuestion[]> => {
  try {
    const response = await axios.get('/api/gemini/marathon')
    const questions: MarathonQuestion[] = JSON.parse(response.data.result)
    return questions
  } catch (error) {
    console.error(error)
    return []
  }
}
