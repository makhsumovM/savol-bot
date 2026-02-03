import { api } from '@/lib/utils/axiosConfig'
import { CookieKey, getCookie, removeCookie, setCookie } from '@/lib/utils/cookies'
import { IChangePassword, ILogin, IRegister } from '@/types/auth'

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

export const getProfileApi = async () => {
  try {
    const response = await api.get('/auth/profile')
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateProfileApi = async (data: FormData) => {
  try {
    const response = await api.patch('/auth/update-profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const logoutApi = async ({ refreshToken }: { refreshToken: string }) => {
  try {
    const response = await api.post('/auth/logout', { refreshToken })
    return response.data
  } catch (error) {
    throw error
  }
}



export const changePasswordApi = async (data: IChangePassword) => {
  try {
    const response = await api.post('/auth/change-password', data)
    return response.data
  } catch (error) {
    throw error
  }
}
