import { api } from '@/lib/utils/axiosConfig'
import { ICreateMarathonAttempt, MarathonQuestion } from '@/types/marathon'
import axios from 'axios'

export const marathonApi = async (
  lang: string,
  difficulty: string,
  type: 'frontend' | 'backend' = 'frontend',
) => {
  try {
    const response = await axios.get('/api/ai/marathon', {
      params: {
        lang,
        difficulty,
        type,
      },
    })

    const questions: MarathonQuestion[] = JSON.parse(response.data.result)
    return questions
  } catch (error) {
    console.error('Error fetching marathon questions:', error)
    return []
  }
}
export const createMarathonAttempt = async (data: ICreateMarathonAttempt) => {
  try {
    const response = await api.post('/marathon/attempts', data)
    return response.data
  } catch (error) {
    throw error
  }
}
