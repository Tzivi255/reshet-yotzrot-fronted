import { colors, fonts } from '../theme'

// הצגה אחידה של מצב טעינה / שגיאה עבור קריאות ה-API.

export default function StatusMessage({
  loading = false,
  error = null,
  onRetry,
  loadingText = 'טוען...',
}) {
  if (!loading && !error) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        textAlign: 'center',
        padding: '48px 16px',
        color: colors.muted,
      }}
    >
      {loading && (
        <>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: `3px solid ${colors.pinkBorder}`,
              borderTopColor: colors.rose,
              animation: 'spin .8s linear infinite',
            }}
          />
          <span style={{ fontSize: 16 }}>{loadingText}</span>
        </>
      )}

      {!loading && error && (
        <>
          <p style={{ margin: 0, fontSize: 17, color: colors.roseDark, fontWeight: 600 }}>
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              style={{
                minHeight: 46,
                padding: '0 22px',
                borderRadius: 999,
                border: `1px solid ${colors.pinkBorder}`,
                background: '#fff',
                fontSize: 16,
                fontFamily: fonts.body,
              }}
            >
              נסו שוב
            </button>
          )}
        </>
      )}
    </div>
  )
}
