import { useEffect, useRef, useState } from 'react'

// חשיפה בגלילה: מחזיר ref ודגל isVisible שהופך ל-true כשהאלמנט נכנס למסך (פעם אחת בלבד).
// בשימוש יחד עם ה-class "reveal" שב-index.css.
// waitForScroll: האלמנט לא יופיע עד שהגולשת מתחילה לגלול, גם אם הוא כבר בתוך המסך בטעינה.
export default function useReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  waitForScroll = false,
} = {}) {
  const ref = useRef(null)
  // בדפדפן ללא IntersectionObserver - מציגים מיד
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || isVisible) return undefined

    let intersecting = false
    let scrolled = !waitForScroll || window.scrollY > 0
    const check = () => {
      if (intersecting && scrolled) setIsVisible(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting
        check()
      },
      { threshold, rootMargin },
    )
    const onScroll = () => {
      scrolled = true
      check()
    }

    observer.observe(el)
    if (!scrolled) window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold, rootMargin, waitForScroll, isVisible])

  return [ref, isVisible]
}
