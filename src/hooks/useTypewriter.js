import { useEffect, useState } from 'react'

// בודק אם המשתמשת ביקשה להפחית תנועה (הגדרת מערכת או תפריט הנגישות באתר).
function motionReduced() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('a11y-no-motion')
  )
}

// אפקט הקלדה: מחזיר כמה תווים מהטקסט להציג כרגע.
// כשהתנועה מופחתת - הטקסט כולו מוצג מיד.
export default function useTypewriter(text, { startDelay = 900, speed = 75 } = {}) {
  const [count, setCount] = useState(() => (motionReduced() ? text.length : 0))

  useEffect(() => {
    if (motionReduced()) return undefined
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, startDelay, speed])

  return { count, done: count >= text.length }
}
