import { refreshTokenApi } from '@/api/authApi'
import { CookieKey, getCookie, removeCookie } from '@/lib/utils/cookies'
import axios from 'axios'


const REFRESH_TOKEN_KEY = 'refreshToken'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
api.interceptors.request.use((config) => {
  const token = getCookie('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshTokenApi()

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        removeCookie(CookieKey.token)
        removeCookie(REFRESH_TOKEN_KEY)

        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
