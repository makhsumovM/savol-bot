import axios from 'axios'

export const randomApi = async (lang: string, type: 'frontend' | 'backend' = 'frontend') => {
  try {
    const response = await axios.get('/api/gemini/random', {
      params: {
        lang,
        type,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
