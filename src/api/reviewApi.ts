import { api } from '@/lib/utils/axiosConfig'
import { ICreateReview } from '@/types/review'

export const createReviewApi = async (data: ICreateReview) => {
  try {
    const response = await api.post('reviews', data)
    return response.data
  } catch (error) {
    throw error
  }
}
export const getReviewApi = async () => {
  try {
    const response = await api.get('reviews')
    return response.data
  } catch (error) {
    throw error
  }
}
export const getPendingReviewApi = async () => {
  try {
    const response = await api.get('reviews/pending')
    return response.data
  } catch (error) {
    throw error
  }
}
export const approveReviewApi = async (id: string) => {
  try {
    const response = await api.post(`reviews/${id}/approve`)
    return response.data
  } catch (error) {
    throw error
  }
}
