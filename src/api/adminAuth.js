import { request } from './client'

// שמירת טוקן המנהלת ב-sessionStorage (נמחק עם סגירת הלשונית).

const KEY = 'reshet-admin-token'

export function getAdminToken() {
  try {
    return sessionStorage.getItem(KEY) || ''
  } catch {
    return ''
  }
}

export function clearAdminToken() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

export function adminHeaders() {
  const token = getAdminToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function adminLogin(password) {
  const { token } = await request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
  sessionStorage.setItem(KEY, token)
  return token
}
