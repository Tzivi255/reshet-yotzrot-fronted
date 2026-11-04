import { useEffect } from 'react'

// כותרת הלשונית (ומה שגוגל מציג בתוצאות החיפוש) לכל עמוד באתר.
export const SITE_TITLE = 'רשת היוצרות · מיכל וויג'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_TITLE}` : `${SITE_TITLE} | צלמות וקליפים לבת מצווה ולמשפחה`
  }, [title])
}
