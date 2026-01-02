import Cookies from 'js-cookie'
export enum CookieKey {
  token = 'token',
}
export function getCookie(key: string) {
  return Cookies.get(key || CookieKey.token)
}

export function setCookie({ token, key }: { token: string; key?: string }) {
  return Cookies.set(key || CookieKey.token, token)
}
export function removeCookie(key: string) {
  return Cookies.remove(key || CookieKey.token)
}
