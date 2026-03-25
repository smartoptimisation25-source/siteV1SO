import { useEffect, useState } from 'react'

export default function ReadingProgress({ articleRef }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = articleRef?.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const scrolled = -top
      const total = height - windowH
      if (total <= 0) { setProgress(100); return }
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100))
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [articleRef])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      zIndex: 9999,
      background: 'rgba(0,0,0,0.08)',
    }}>
      <div
        role="progressbar"
        aria-label="Progression de lecture"
        style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #3B4FD8, #9B30E8)',
        transition: 'width 0.1s linear',
      }} />
    </div>
  )
}
