import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Detail view for case-study visuals. Wrap an image (or MediaFrame) in <Inspectable>
// to make it open in a glass lightbox; decorative artwork is simply left unwrapped.

type Detail = {
  src: string
  alt: string
  /** Largest width to present the image at (px). Defaults to the image's natural width, capped at 1200. */
  width?: number
  /** Corner radius for the detail image when the source has its own rounded corners (any CSS length/percentage) */
  radius?: string
}

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

/** Makes its content open a larger detail view. Shows a small expand cue (always visible on touch). */
export function Inspectable({ src, alt, width, radius, block = false, className, style, children }: Detail & {
  /** Stretch to the container width (for fluid images) instead of shrink-wrapping the content */
  block?: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => {
    setOpen(false)
    trigger.current?.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={['cs-inspect', block && 'cs-inspect-block', className].filter(Boolean).join(' ')}
        style={style}
        aria-label={`View larger: ${alt}`}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {children}
        <span className="cs-inspect-cue" aria-hidden><ExpandIcon /></span>
      </button>
      {open && <Lightbox src={src} alt={alt} width={width} radius={radius} onClose={close} />}
    </>
  )
}

function Lightbox({ src, alt, width, radius, onClose }: Detail & { onClose: () => void }) {
  const [state, setState] = useState<'opening' | 'open' | 'closing'>('opening')
  const closeBtn = useRef<HTMLButtonElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [natural, setNatural] = useState<{ w: number; h: number }>()
  const [area, setArea] = useState<{ w: number; h: number }>()
  const [zoomed, setZoomed] = useState(false)

  // Space available for the image: the scroll area minus its padding (which reserves room for Close)
  useEffect(() => {
    const measure = () => {
      const el = scroller.current
      if (!el) return
      const cs = getComputedStyle(el)
      setArea({
        w: el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
        h: el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom),
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const requestClose = useCallback(() => setState('closing'), [])

  // Enter transition, focus, background scroll lock
  useEffect(() => {
    const frame = requestAnimationFrame(() => setState('open'))
    closeBtn.current?.focus({ preventScroll: true })
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      root.style.overflow = prev
    }
  }, [])

  // Exit transition, then unmount
  useEffect(() => {
    if (state !== 'closing') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(onClose, reduce ? 0 : 200)
    return () => window.clearTimeout(t)
  }, [state, onClose])

  // ESC closes; Tab stays on the dialog's only control
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); requestClose() }
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [requestClose])

  // Initial view always shows the whole image: width limited by the preferred size,
  // the available width and the available height × aspect ratio. Tall images can then
  // be clicked to zoom to their preferred width and scroll.
  const preferred = width ?? Math.min(natural?.w ?? 1200, 1200)
  const fitW = natural && area ? Math.min(preferred, area.w, area.h * (natural.w / natural.h)) : undefined
  const fullW = area ? Math.min(preferred, area.w) : undefined
  const canZoom = fitW !== undefined && fullW !== undefined && fullW - fitW > 24
  const displayW = zoomed && canZoom ? fullW : fitW

  return createPortal(
    <div className="cs-lightbox" data-state={state} role="dialog" aria-modal="true" aria-label={alt}>
      <div className="cs-lightbox-backdrop" aria-hidden />
      {/* Scroll area: tall images scroll inside; clicking anywhere outside the image closes */}
      <div ref={scroller} className="cs-lightbox-scroll" onClick={e => { if (e.target === e.currentTarget) requestClose() }}>
        <img
          className="cs-lightbox-img"
          src={src}
          alt={alt}
          data-zoom={canZoom ? (zoomed ? 'out' : 'in') : undefined}
          title={canZoom ? (zoomed ? 'Click to fit to screen' : 'Click to zoom in') : undefined}
          style={{ width: displayW, borderRadius: radius }}
          onLoad={e => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
          onClick={() => {
            if (!canZoom) return
            setZoomed(z => !z)
            scroller.current?.scrollTo({ top: 0 })
          }}
        />
      </div>
      <button ref={closeBtn} type="button" className="cs-lightbox-close" aria-label="Close" onClick={requestClose}>
        <CloseIcon />
      </button>
    </div>,
    document.body,
  )
}
