import { jwtDecode } from 'jwt-decode'
import { getCookie } from '@/lib/utils/cookies'

export interface JwtPayload {
  UserId: string
  Email: string
  exp: number
  iss: string
  aud: string
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token)
  } catch {
    return null
  }
}

export function getJwtFromCookie(): JwtPayload | null {
  const token = getCookie('token')
  if (!token) return null

  return decodeJwt(token)
}

