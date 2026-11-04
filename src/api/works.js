import { request } from './client'

// "תצוגת עבודות" - הסרטונים שנשלפים מתיקיית ה-Drive של כל יוצרת (route: /api/works).

export function getWorks() {
  return request('/works').then((rows) =>
    Array.isArray(rows)
      ? rows.map((r) => ({
          profileId: r.profileId,
          name: r.name ?? '',
          shootingCategory: r.shootingCategory ?? '',
          logoUrl: r.logoUrl ?? '',
          clips: Array.isArray(r.clips) ? r.clips : [],
        }))
      : [],
  )
}

// כתובות של Google Drive לפי מזהה הקובץ
export const driveThumb = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`
export const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview`
