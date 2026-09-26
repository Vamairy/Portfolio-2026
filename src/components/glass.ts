import { useEffect, useState, type RefObject } from 'react'

// Shared logic for glass UI (navbar, floating controls): pick a light or dark
// glass tone from the surface actually painted behind an element.

export type GlassTone = 'dark' | 'light'

/** Luminance (0–1) of the background painted behind a viewport point: first opaque-ish ancestor of whatever is there. */
export function surfaceLuminanceAt(x: number, y: number, skip: Element): number | null {
  const hit = document.elementsFromPoint(x, y).find(el => el !== skip && !skip.contains(el))
  for (let el: Element | null = hit ?? null; el; el = el.parentElement) {
    const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)
    if (!m) continue
    const [r, g, b, a = 1] = m.map(Number)
    if (a < 0.5) continue
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }
  return null
}

/**
 * Glass tone for an element: 'light' glass over dark surfaces, 'dark' glass over light ones.
 * Re-sampled on scroll/resize, so it follows the real layout rather than scroll offsets.
 * `onUpdate` lets callers piggyback other scroll-derived state on the same listener.
 */
export function useGlassTone(ref: RefObject<HTMLElement | null>, onUpdate?: () => void): GlassTone {
  const [tone, setTone] = useState<GlassTone>('dark')

  useEffect(() => {
    // One hit-test + a few style reads per scroll event; cheap enough to run directly
    const update = () => {
      onUpdate?.()
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const lum = surfaceLuminanceAt(r.left + r.width / 2, r.top + r.height / 2, el)
      if (lum !== null) setTone(lum < 0.4 ? 'light' : 'dark')
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return tone
}
