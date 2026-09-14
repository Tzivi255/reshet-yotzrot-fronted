// עטיפת fetch בסיסית מול שרת ה-Node/Express, עם טיפול אחיד בשגיאות.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
export const API_BASE = `${API_BASE_URL}/api`

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function request(path, options = {}) {
  let res
  // עבור FormData (העלאת קובץ לוגו) לא קובעים Content-Type ידנית -
  // הדפדפן חייב לקבוע אותו בעצמו כולל ה-boundary המתאים.
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: isFormData
        ? options.headers
        : { 'Content-Type': 'application/json', ...options.headers },
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
