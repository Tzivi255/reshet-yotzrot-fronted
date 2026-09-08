import { useState } from 'react'

// הוק קטן לשחזור אפקטי ה-hover שהופיעו כ-style-hover בתבנית העיצוב.
export default function useHover() {
  const [hovered, setHovered] = useState(false)
  const bind = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  }
  return [hovered, bind]
}
