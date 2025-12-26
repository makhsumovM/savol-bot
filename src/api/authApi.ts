import { api } from '@/lib/utils/axiosConfig'
import { ILogin, IRegister } from '@/types/auth'

export const loginApi = async (data: ILogin) => {
  try {
    const response = await api.post('/auth/login', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const registerApi = async (data: IRegister) => {
  try {
    const response = await api.post('/auth/register', data)
    return response.data
  } catch (error) {
    throw error
  }
}
