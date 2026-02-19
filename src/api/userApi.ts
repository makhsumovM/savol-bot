import axios from 'axios'

export const getTotalUsers = async () => {
  try {
    const response = await axios.get('/api/analytics/total-users')
    return response.data
  } catch (error) {
    console.error('Error fetching total users:', error)
  }
}