import { CookieKey } from '@/lib/utils/cookies'
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get(CookieKey.token)?.value
  const { pathname } = request.nextUrl

  const isLoggedIn = !!token

  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  const protectedPaths = ['/my-best', '/my-rank', '/profile']
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path))

  if (!isLoggedIn && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
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
