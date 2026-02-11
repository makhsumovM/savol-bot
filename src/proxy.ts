import { CookieKey } from '@/lib/utils/cookies'
import { decodeJwt, getTokenExpiryInfo, isTokenExpired } from '@/lib/utils/jwt'
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get(CookieKey.token)?.value
  const { pathname } = request.nextUrl

  let isLoggedIn = false
  let isTokenValid = false

  if (token) {
    const payload = decodeJwt(token)

    if (payload) {
      isLoggedIn = true

      if (!isTokenExpired(payload)) {
        isTokenValid = true
        const expiryInfo = getTokenExpiryInfo(payload)

        if (expiryInfo) {
          console.log(
            `[JWT PROXY] Токен активен. Осталось: ${expiryInfo.hoursLeft}ч ${expiryInfo.minutesLeft}м`,
          )
        }
      } else {
        console.log('[JWT PROXY] Токен истек - пользователь будет разлогинен')
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete(CookieKey.token)
        return response
      }
    }
  }

  if (isTokenValid && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  const protectedPaths = ['/my-best', '/my-rank', '/profile']
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path))

  if (!isTokenValid && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)

    const response = NextResponse.redirect(url)
    response.cookies.delete(CookieKey.token)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
