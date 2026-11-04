import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, fonts } from '../theme'
import useHover from '../hooks/useHover'

// חלונית ההטבה הבלעדית (5% הנחה) - קופצת מלמעלה 2 שניות אחרי שהאתר עולה.
// עיצוב "קופון": צד ה-5% מופרד בקו מקווקו עם חריצים, ברקע הצהוב-קרם של תגית המחיר בגלריה
// (colors.chipAmberBg), עם הוורוד והטיפוגרפיה של האתר.

const SHOW_AFTER_MS = 2000
const EXIT_MS = 320
const MESSAGE = 'הטבה בלעדית לסוגרות דרך האתר: 5% הנחה על כל הפקת קליפ אצל בוגרות הרשת!'

export default function DiscountPopup() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeBtnRef = useRef(null)
  const prevFocusRef = useRef(null)
  const [ctaHover, ctaBind] = useHover()

  // רק בעלייה הראשונה של האתר (לא בכל מעבר עמוד), ולא בעמוד הניהול
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return undefined
    const t = setTimeout(() => {
      prevFocusRef.current = document.activeElement
      setOpen(true)
    }, SHOW_AFTER_MS)
    return () => clearTimeout(t)
  }, [])

  const close = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
      prevFocusRef.current?.focus?.()
    }, EXIT_MS)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    closeBtnRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!open) return null

  const goGallery = () => {
    close()
    navigate('/gallery')
  }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '84px 14px 14px',
        background: 'rgba(44,30,35,.32)',
        backdropFilter: 'blur(3px)',
        animation: `${closing ? 'popupFadeOut' : 'popupFadeIn'} ${EXIT_MS}ms ease both`,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={MESSAGE}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 620,
          display: 'flex',
          alignItems: 'stretch',
          background: colors.chipAmberBg,
          borderRadius: 24,
          boxShadow: '0 24px 60px rgba(44,30,35,.28), 0 0 0 1px rgba(138,84,16,.14)',
          overflow: 'hidden',
          animation: closing
            ? `popupSlideUp ${EXIT_MS}ms ease both`
            : 'popupSlideDown .7s cubic-bezier(.2,.85,.25,1.15) both',
        }}
      >
        {/* ברק אור שעובר על החלונית */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '28%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.38), transparent)',
            animation: 'bannerShine 4.5s ease-in-out 1s infinite',
            pointerEvents: 'none',
          }}
        />

        {/* צד ה-5% של הקופון */}
        <div
          aria-hidden="true"
          style={{
            flex: '0 0 auto',
            width: 'clamp(96px, 26vw, 150px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px 8px',
            background: `linear-gradient(160deg, ${colors.rose}, ${colors.roseDark})`,
            color: '#fff',
          }}
        >
          <span
            style={{
              fontFamily: fonts.brand,
              fontWeight: 700,
              fontSize: 'clamp(44px, 12vw, 68px)',
              lineHeight: 0.9,
              direction: 'ltr',
            }}
          >
            5%
          </span>
          <span style={{ fontFamily: fonts.display, fontSize: 'clamp(17px, 4.4vw, 22px)', marginTop: 4 }}>
            הנחה
          </span>
        </div>

        {/* קו החיתוך המקווקו של הקופון */}
        <div aria-hidden="true" style={{ position: 'relative', flex: '0 0 auto', width: 0 }}>
          <span
            style={{
              position: 'absolute',
              top: 12,
              bottom: 12,
              right: -1,
              borderRight: `2px dashed rgba(138,84,16,.35)`,
            }}
          />
        </div>

        {/* תוכן */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: 'clamp(16px, 4vw, 24px) clamp(16px, 4vw, 26px)',
            paddingInlineEnd: 48,
            textAlign: 'right',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontFamily: fonts.mono,
              fontSize: 10.5,
              letterSpacing: '.16em',
              color: colors.chipAmberText,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#E0325A',
                animation: 'recBlink 1.6s infinite',
              }}
            />
            EXCLUSIVE OFFER
          </div>
          <p
            aria-hidden="true"
            style={{
              margin: '0 0 14px',
              fontSize: 'clamp(16.5px, 4.3vw, 19px)',
              lineHeight: 1.45,
              color: colors.ink,
              textWrap: 'pretty',
            }}
          >
            <strong style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: '1.12em', color: colors.roseDark }}>
              הטבה בלעדית לסוגרות דרך האתר:
            </strong>
            <br />
            <strong style={{ fontWeight: 800 }}>5% הנחה</strong> על כל הפקת קליפ אצל בוגרות הרשת!
          </p>
          <button
            {...ctaBind}
            onClick={goGallery}
            style={{
              minHeight: 44,
              padding: '0 20px',
              border: 0,
              borderRadius: 999,
              background: ctaHover ? colors.roseDark : colors.rose,
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              boxShadow: '0 10px 22px rgba(199,57,92,.25)',
              transition: 'background .2s ease',
            }}
          >
            לבחירת יוצרת
          </button>
        </div>

        {/* סגירה */}
        <button
          ref={closeBtnRef}
          onClick={close}
          aria-label="סגירת חלונית ההטבה"
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 0,
            background: 'rgba(138,84,16,.1)',
            color: colors.chipAmberText,
            fontSize: 20,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
