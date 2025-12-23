// src/api/marathonApi.ts (или где у тебя лежит этот файл)

import { MarathonQuestion } from '@/types/marathon'
import axios from 'axios'

export const marathonApi = async (
  lang: string,
  difficulty: string,
  type: 'frontend' | 'backend' = 'frontend'
): Promise<MarathonQuestion[]> => {
  try {
    const response = await axios.get('/api/gemini/marathon', {
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
