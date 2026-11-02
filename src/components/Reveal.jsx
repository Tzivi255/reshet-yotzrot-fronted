import useReveal from '../hooks/useReveal'

// עוטף שמופיע בעדינות (עלייה + דהייה) כשהוא נכנס למסך בזמן הגלילה.
// delay במילישניות - לשימוש בכניסה מדורגת של כרטיסים.
// waitForScroll - לא להופיע לפני שהגולשת מתחילה לגלול.
// variant="rise" - כניסה דרמטית יותר (עלייה גבוהה, הגדלה וטשטוש שמתבהר).
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  waitForScroll = false,
  variant,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, isVisible] = useReveal({ waitForScroll })
  const classes = ['reveal', variant && `reveal-${variant}`, isVisible && 'is-visible', className]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag ref={ref} className={classes} style={{ '--reveal-delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
