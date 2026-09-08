import { useState } from 'react'
import { colors, fonts } from '../theme'
import { EMPTY_PHOTOGRAPHER } from '../data/photographers'

// מודאל הוספה / עריכה של יוצרת - מתוך ה-sc-if modalOpen שב-design-template.html.

const FIELDS = [
  { label: 'שם', key: 'name', placeholder: 'שם מלא' },
  { label: 'מה היא מצלמת', key: 'shootingCategory', placeholder: 'קליפים, חתונות, תדמית...' },
  { label: 'סגנון', key: 'style', placeholder: 'קינמטי / נקי / צבעוני' },
  { label: 'מיקום', key: 'location', placeholder: 'אזור או יישוב' },
  { label: 'מחיר מבוקש', key: 'price', placeholder: '1500' },
  { label: 'טלפון', key: 'phone', placeholder: '052-0000000' },
  { label: 'מייל', key: 'email', placeholder: 'name@example.com' },
  { label: 'קישור לתיק עבודות', key: 'portfolio', placeholder: 'https://' },
]

const inputStyle = {
  minHeight: 50,
  borderRadius: 14,
  border: `1px solid ${colors.pinkBorder}`,
  background: colors.bg,
  padding: '0 14px',
  fontSize: 16,
}

export default function PhotographerModal({ initial, editing, onSave, onClose }) {
  const [draft, setDraft] = useState(() => ({ ...EMPTY_PHOTOGRAPHER, ...(initial || {}) }))

  const setField = (key) => (e) => setDraft((d) => ({ ...d, [key]: e.target.value }))

  const handleSave = () => {
    if (!draft.name) return
    onSave({ ...draft, price: Number(String(draft.price).replace(/\D/g, '')) || 0 })
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(44,30,35,.45)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: 560,
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '28px 28px 0 0',
          padding: '22px 20px 26px',
          animation: 'riseIn .28s ease both',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 400, fontSize: 23 }}>
            {editing ? 'עריכת יוצרת' : 'הוספת יוצרת'}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: `1px solid ${colors.pinkBorder}`,
              background: '#fff',
              fontSize: 18,
              color: colors.muted,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FIELDS.map((f) => (
            <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: colors.muted }}>{f.label}</span>
              <input
                type="text"
                value={draft[f.key] == null ? '' : String(draft[f.key])}
                onChange={setField(f.key)}
                placeholder={f.placeholder}
                style={inputStyle}
              />
            </label>
          ))}

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: colors.muted }}>כמה מילים עלי</span>
            <textarea
              value={draft.bio || ''}
              onChange={setField('bio')}
              rows={4}
              style={{
                borderRadius: 14,
                border: `1px solid ${colors.pinkBorder}`,
                background: colors.bg,
                padding: '12px 14px',
                fontSize: 16,
                resize: 'vertical',
              }}
            />
          </label>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#FDF1F3',
              borderRadius: 14,
              padding: 14,
              minHeight: 52,
            }}
          >
            <input
              type="checkbox"
              checked={!!draft.hasWhatsApp}
              onChange={(e) => setDraft((d) => ({ ...d, hasWhatsApp: e.target.checked }))}
              style={{ width: 20, height: 20, accentColor: colors.green }}
            />
            <span style={{ fontSize: 16, fontWeight: 600 }}>יש וואטסאפ</span>
          </label>

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                minHeight: 54,
                border: 0,
                borderRadius: 16,
                background: colors.rose,
                color: '#fff',
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              שמירה
            </button>
            <button
              onClick={onClose}
              style={{
                minHeight: 54,
                padding: '0 20px',
                borderRadius: 16,
                border: `1px solid ${colors.pinkBorder}`,
                background: '#fff',
                fontSize: 16,
              }}
            >
              ביטול
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
