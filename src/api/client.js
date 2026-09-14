// עטיפת fetch בסיסית מול שרת ה-Node/Express, עם טיפול אחיד בשגיאות.

export const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    // השרת לא זמין / אין רשת / CORS נכשל
    throw new ApiError(
      'לא ניתן להתחבר לשרת. ודאו שה-Backend רץ בכתובת ' + API_BASE,
      0,
    )
  }

  const raw = await res.text()
  let body = null
  if (raw) {
    try {
      body = JSON.parse(raw)
    } catch {
      body = raw
    }
  }

  if (!res.ok) {
    const message =
      (body && typeof body === 'object' && body.message) ||
      `שגיאת שרת (${res.status})`
    throw new ApiError(message, res.status)
  }

  return body
}
