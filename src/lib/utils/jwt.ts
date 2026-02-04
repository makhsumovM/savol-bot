import { jwtDecode } from 'jwt-decode'
import { getCookie, removeCookie } from '@/lib/utils/cookies'

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

export function isTokenExpired(payload: JwtPayload): boolean {
  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}

export function getJwtFromCookie(): JwtPayload | null {
  const token = getCookie('token')
  if (!token) return null

  const payload = decodeJwt(token)

  if (!payload) return null

  if (isTokenExpired(payload)) {
    removeCookie('token')
    return null
  }

  return payload
}

export function setupTokenCleanup(): void {
  const token = getCookie('token')
  if (!token) return

  const payload = decodeJwt(token)
  if (!payload) return

  const currentTime = Math.floor(Date.now() / 1000)
  const timeUntilExpiry = (payload.exp - currentTime) * 1000

  if (timeUntilExpiry > 0) {
    setTimeout(() => {
      removeCookie('token')
    }, timeUntilExpiry)
  }
}
