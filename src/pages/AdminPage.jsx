import { useState } from 'react'
import { colors, fonts, layout } from '../theme'
import { decoratePhotographer } from '../data/photographers'
import { usePhotographers } from '../context/photographersStore'
import PhotographerModal from '../components/PhotographerModal'

// דף הניהול - מקביל ל-sc-if isAdmin שב-design-template.html.
// כניסה מוגנת בסיסמה (דמו: כל סיסמה תעבוד), רשימת יוצרות עם הוספה / עריכה / מחיקה.

export default function AdminPage() {
  const { photographers, addPhotographer, updatePhotographer, removePhotographer } =
    usePhotographers()

  const [locked, setLocked] = useState(true)
  const [pass, setPass] = useState('')
  const [modal, setModal] = useState(null) // null | { editId: number | null, initial: object }

  if (locked) {
    return (
      <main style={{ maxWidth: layout.maxWidth, margin: '0 auto', padding: '26px 18px 80px' }}>
        <div
          style={{
            maxWidth: 380,
            margin: '8vh auto',
            background: '#fff',
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 26,
            padding: 30,
            boxShadow: '0 14px 34px rgba(90,62,71,.08)',
          }}
        >
          <h1 style={{ margin: '0 0 6px', fontFamily: fonts.display, fontWeight: 400, fontSize: 26 }}>
            ממשק ניהול
          </h1>
          <p style={{ margin: '0 0 18px', fontSize: 15.5, color: colors.muted }}>
            אזור מוגן למנהלת המיזם.
          </p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="סיסמה"
            style={{
              width: '100%',
              minHeight: 50,
              borderRadius: 14,
              border: `1px solid ${colors.pinkBorder}`,
              background: colors.bg,
              padding: '0 14px',
              fontSize: 16,
              marginBottom: 10,
            }}
          />
          <button
            onClick={() => setLocked(false)}
            style={{
              width: '100%',
              minHeight: 52,
              border: 0,
              borderRadius: 14,
              background: colors.rose,
              color: '#fff',
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            כניסה
          </button>
          <p style={{ margin: '12px 0 0', fontFamily: fonts.mono, fontSize: 11, color: '#B08C96' }}>
            DEMO: כל סיסמה תעבוד
          </p>
        </div>
      </main>
    )
  }

  const handleSave = (rec) => {
    if (modal?.editId) {
      updatePhotographer(modal.editId, rec)
    } else {
      addPhotographer(rec)
    }
    setModal(null)
  }

  return (
    <main style={{ maxWidth: layout.maxWidth, margin: '0 auto', padding: '26px 18px 80px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: '0 0 4px',
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: 'clamp(26px, 7vw, 38px)',
            }}
          >
            ניהול יוצרות
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, color: colors.muted }}>
            {photographers.length} יוצרות ברשת
          </p>
        </div>
        <button
          onClick={() => setModal({ editId: null, initial: null })}
          style={{
            minHeight: 50,
            padding: '0 22px',
            border: 0,
            borderRadius: 16,
            background: colors.rose,
            color: '#fff',
            fontSize: 16.5,
            fontWeight: 700,
          }}
        >
          + הוספת יוצרת
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {photographers.map((raw) => {
          const p = decoratePhotographer(raw)
          return (
            <div
              key={raw.id}
              style={{
                background: '#fff',
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 20,
                padding: '14px 16px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#FDF1F3',
                  color: colors.rose,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.display,
                  fontSize: 17,
                }}
              >
                {p.initial}
              </div>
              <div style={{ flex: '1 1 160px', minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: 14.5, color: colors.muted }}>{p.adminMeta}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginInlineStart: 'auto' }}>
                <button
                  onClick={() => setModal({ editId: raw.id, initial: raw })}
                  style={{
                    minHeight: 44,
                    padding: '0 16px',
                    borderRadius: 12,
                    border: `1px solid ${colors.deep}`,
                    background: colors.deep,
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  עריכה
                </button>
                <button
                  onClick={() => removePhotographer(raw.id)}
                  style={{
                    minHeight: 44,
                    padding: '0 16px',
                    borderRadius: 12,
                    border: '1px solid #F6C9D4',
                    background: '#FDF1F3',
                    color: colors.roseDark,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  מחיקה
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {modal && (
        <PhotographerModal
          editing={!!modal.editId}
          initial={modal.initial}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </main>
  )
}
