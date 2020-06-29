import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const _refreshToken = 'system-refreshToken'
export const TokenName = 'authorization'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, 'MDAwMDAwMDAwMLh3vqXRZoTgvY_O6teenqnFt83S0uCvorF6vKuUqb2yv83abg')
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getRefreshToken() {
  return Cookies.get(_refreshToken)
}

export function setRefreshToken(_data) {
  return Cookies.set(_refreshToken, _data)
}

export function removeRefreshToken() {
  return Cookies.remove(_refreshToken)
}
