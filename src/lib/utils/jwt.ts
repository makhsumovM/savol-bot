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

export function getCurrentTimeInTajikistan(): {
  unix: number
  formatted: string
} {
  const now = new Date()
  const tajikTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dushanbe' }))
  const unix = Math.floor(tajikTime.getTime() / 1000)
  const formatted = tajikTime.toLocaleString('ru-RU', { timeZone: 'Asia/Dushanbe' })

  return { unix, formatted }
}

export function isTokenExpired(payload: JwtPayload): boolean {
  const { unix: currentTime } = getCurrentTimeInTajikistan()
  return payload.exp < currentTime
}

export function getJwtFromCookie(): JwtPayload | null {
  const token = getCookie('token')
  if (!token) return null

  const payload = decodeJwt(token)

  if (!payload) return null

  if (isTokenExpired(payload)) {
    removeCookie('token')
    console.log('[JWT] Токен удален из куки (истек)')
    return null
  }

  return payload
}

export function setupTokenCleanup(): void {
  const token = getCookie('token')
  if (!token) {
    console.log('[JWT] Токен не найден в куки')
    return
  }

  const payload = decodeJwt(token)
  if (!payload) {
    console.log('[JWT] Не удалось декодировать токен')
    return
  }

  const { unix: currentTime } = getCurrentTimeInTajikistan()
  const timeUntilExpiry = (payload.exp - currentTime) * 1000

  if (timeUntilExpiry > 0) {
    setTimeout(() => {
      removeCookie('token')
      console.log('[JWT] Токен автоматически удален по истечении времени')
    }, timeUntilExpiry)
  } else {
    console.log('[JWT] Токен уже истек, немедленное удаление')
    removeCookie('token')
  }
}

export function getTokenExpiryInfo(payload?: JwtPayload): {
  isExpired: boolean
  timeUntilExpiry: number
  minutesLeft: number
  hoursLeft: number
  formattedTime: string
} | null {
  let tokenPayload = payload

  if (!tokenPayload) {
    const token = getCookie('token')
    if (!token) return null

    tokenPayload = decodeJwt(token) || undefined
    if (!tokenPayload) return null
  }

  const { unix: currentTime } = getCurrentTimeInTajikistan()
  const timeUntilExpiry = (tokenPayload.exp - currentTime) * 1000

  return {
    isExpired: timeUntilExpiry <= 0,
    timeUntilExpiry,
    minutesLeft: Math.floor(timeUntilExpiry / 1000 / 60),
    hoursLeft: Math.floor(timeUntilExpiry / 1000 / 60 / 60),
    formattedTime: `${Math.floor(timeUntilExpiry / 1000 / 60 / 60)}ч ${Math.floor((timeUntilExpiry / 1000 / 60) % 60)}м`,
  }
}