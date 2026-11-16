import { useState } from 'react'
import { colors, fonts, layout } from '../theme'
import { decoratePhotographer } from '../data/photographers'
import { usePhotographers } from '../context/photographersStore'
import PhotographerModal from '../components/PhotographerModal'
import StatusMessage from '../components/StatusMessage'
import usePageTitle from '../hooks/usePageTitle'
import { adminLogin, clearAdminToken, getAdminToken } from '../api/adminAuth'

// דף הניהול - מקביל ל-sc-if isAdmin שב-design-template.html.
// כניסה מוגנת בסיסמה (מאומתת מול השרת, POST /api/admin/login), רשימת יוצרות מה-API עם הוספה / עריכה / מחיקה.

export default function AdminPage() {
  usePageTitle('ניהול')
  const {
    photographers,
    loading,
    error,
    reload,
    addPhotographer,
    updatePhotographer,
    removePhotographer,
  } = usePhotographers()

  const [locked, setLocked] = useState(() => !getAdminToken())
  const [pass, setPass] = useState('')
  const [loginBusy, setLoginBusy] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [modal, setModal] = useState(null) // null | { editId, initial }
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState(null)

  // טוקן חסר / פג תוקף - חוזרים למסך הכניסה
  const handleAuthError = (err) => {
    if (err?.status === 401) {
      clearAdminToken()
      setModal(null)
      setLocked(true)
      setLoginError('פג תוקף ההתחברות. יש להתחבר מחדש.')
      return true
    }
    return false
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!pass || loginBusy) return
    setLoginBusy(true)
    setLoginError(null)
    try {
      await adminLogin(pass)
      setPass('')
      setLocked(false)
    } catch (err) {
      setLoginError(err.message || 'ההתחברות נכשלה')
    } finally {
      setLoginBusy(false)
    }
  }

  const handleLogout = () => {
    clearAdminToken()
    setLocked(true)
  }

  if (locked) {
    return (
      <main style={{ maxWidth: layout.maxWidth, margin: '0 auto', padding: '26px 18px 80px' }}>
        <form
          onSubmit={handleLogin}
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
            aria-label="סיסמה"
            autoComplete="current-password"
            autoFocus
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
          {loginError && (
            <p role="alert" style={{ margin: '0 0 10px', fontSize: 14.5, fontWeight: 600, color: colors.roseDark }}>
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={loginBusy || !pass}
            style={{
              width: '100%',
              minHeight: 52,
              border: 0,
              borderRadius: 14,
              background: colors.rose,
              color: '#fff',
              fontSize: 17,
              fontWeight: 700,
              opacity: loginBusy || !pass ? 0.7 : 1,
            }}
          >
            {loginBusy ? 'מתחבר...' : 'כניסה'}
          </button>
        </form>
      </main>
    )
  }

  const handleSave = async (rec) => {
    setBusy(true)
    setActionError(null)
    try {
      if (modal?.editId) {
        await updatePhotographer(modal.editId, rec)
      } else {
        await addPhotographer(rec)
      }
      setModal(null)
    } catch (err) {
      if (handleAuthError(err)) return
      setActionError(err.message || 'שמירת היוצרת נכשלה')
    } finally {
      setBusy(false)
    }
  }

  const handleRemove = async (id) => {
    if (!window.confirm('למחוק את היוצרת מהרשת?')) return
    setActionError(null)
    try {
      await removePhotographer(id)
    } catch (err) {
      if (handleAuthError(err)) return
      setActionError(err.message || 'מחיקת היוצרת נכשלה')
    }
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
            {loading ? 'טוען...' : `${photographers.length} יוצרות ברשת`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={handleLogout}
          style={{
            minHeight: 50,
            padding: '0 18px',
            borderRadius: 16,
            border: `1px solid ${colors.cardBorder}`,
            background: '#fff',
            color: colors.muted,
            fontSize: 15.5,
            fontWeight: 600,
          }}
        >
          יציאה
        </button>
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
      </div>

      {actionError && (
        <div
          style={{
            background: '#FDF1F3',
            border: '1px solid #F6C9D4',
            color: colors.roseDark,
            borderRadius: 14,
            padding: '12px 16px',
            marginBottom: 14,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          {actionError}
        </div>
      )}

      {(loading || error) && (
        <StatusMessage
          loading={loading}
          error={error}
          onRetry={reload}
          loadingText="טוען יוצרות..."
        />
      )}

      {!loading && !error && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {photographers.length === 0 && (
          <p style={{ fontSize: 15.5, color: colors.muted }}>עדיין אין יוצרות. הוסיפו את הראשונה!</p>
        )}
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
                  onClick={() => handleRemove(raw.id)}
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
      )}

      {modal && (
        <PhotographerModal
          editing={!!modal.editId}
          initial={modal.initial}
          busy={busy}
          onSave={handleSave}
          onClose={() => (busy ? null : setModal(null))}
        />
      )}
    </main>
  )
}
