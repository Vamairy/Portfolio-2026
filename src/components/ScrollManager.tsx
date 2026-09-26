import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side routing doesn't reset scroll or follow #hash links on its own.
// New pages start at the top; `/#work`-style links scroll to their section once it has rendered.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let frame = 0
    let tries = 0
    const scrollToHash = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else if (tries++ < 30) frame = requestAnimationFrame(scrollToHash)
    }
    scrollToHash()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
