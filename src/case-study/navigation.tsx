import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlassTone } from '../components/glass'

// Case-study navigation chrome: Back to Work, side "Now viewing" nav and floating controls.

export type CaseStudySection = { id: string; label: string }

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
)

/** "← Back to Work" pill returning to the homepage Work section. */
export function BackToWork({ variant = 'button', className, style }: {
  /** `button`: outline pill (in-content); `text`: quiet link (side navigation) */
  variant?: 'button' | 'text'
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <Link to="/#work" className={[variant === 'text' ? 'cs-back-text' : 'cs-back', className].filter(Boolean).join(' ')} style={style}>
      <ArrowLeft />
      Back to Work
    </Link>
  )
}

// ── Floating controls ─────────────────────────────────────────────────────────

/**
 * Shared behaviour for floating glass controls: they appear after ~1.5 screens
 * of scrolling and switch to a light glass tone whenever the surface under them
 * is dark — sampled from what they overlap, not from scroll offsets.
 */
function useFloatingControl<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  const tone = useGlassTone(ref, () => setVisible(window.scrollY > window.innerHeight * 1.5))
  return { ref, visible, tone }
}

export function BackToTop() {
  const { ref, visible, tone } = useFloatingControl<HTMLButtonElement>()
  return (
    <button
      ref={ref}
      type="button"
      className="cs-glass cs-float cs-to-top"
      data-visible={visible}
      data-tone={tone}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  )
}

/**
 * "← Work" glass pill returning to the homepage Work section. One control, two
 * placements: in the desktop side nav, and floating on smaller screens.
 */
const WorkPill = React.forwardRef<HTMLAnchorElement, {
  tone: 'dark' | 'light'
  className?: string
} & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'ref'>>(function WorkPill({ tone, className, ...rest }, ref) {
  return (
    <Link
      ref={ref}
      to="/#work"
      className={['cs-glass cs-work-pill', className].filter(Boolean).join(' ')}
      data-tone={tone}
      aria-label="Back to Work"
      {...rest}
    >
      <ArrowLeft />
      <span>Work</span>
    </Link>
  )
})

/**
 * Floating placement for screens without room for the side nav: one persistent
 * bottom-left "← Work", visible from the moment the page loads.
 */
export function FloatingBackToWork() {
  const ref = useRef<HTMLAnchorElement>(null)
  const tone = useGlassTone(ref)
  return <WorkPill ref={ref} tone={tone} className="cs-float cs-float-back" data-visible="true" />
}

/** In-flow placement (desktop side nav): same pill, tone from the surface behind it. */
function InlineWorkPill({ className }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const tone = useGlassTone(ref)
  return <WorkPill ref={ref} tone={tone} className={className} />
}

// ── Side navigation ───────────────────────────────────────────────────────────

/**
 * Persistent left-margin navigation for a case study: Back to Work plus a
 * "Now viewing" list of the page's sections. Sections are passed in by each
 * case study, so the component knows nothing about any specific project.
 *
 * Active section = the last listed section whose top has crossed an activation
 * line just below the global navbar; none while still in the hero, which hides the list. This works for any number of sections,
 * any heights, and for anchors nested inside other sections.
 */
export function CaseStudySideNav({ sections, label = 'Now viewing' }: { sections: CaseStudySection[]; label?: string }) {
  // undefined while the reader is still in the hero (above the first section)
  const [active, setActive] = useState<string | undefined>()

  useEffect(() => {
    const targets = sections
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)
    if (!targets.length) return

    const update = () => {
      const navH = parseFloat(getComputedStyle(targets[0]).getPropertyValue('--cs-nav-h')) || 64
      const line = navH + window.innerHeight * 0.3
      let current: string | undefined
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id
      }
      setActive(current)
    }

    // Recompute whenever any section enters/leaves the viewport, and on scroll
    // for continuous tracking within tall sections.
    const io = new IntersectionObserver(update, { threshold: [0, 0.25, 0.5, 0.75, 1] })
    targets.forEach(el => io.observe(el))
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sections])

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' }) // offset via scroll-margin-top in CSS
    setActive(id)
  }

  return (
    <div className="cs-sidenav-rail">
      <nav className="cs-sidenav" aria-label="Case study sections">
        <InlineWorkPill />
        {/* Section list appears once the first section is reached; Work stays regardless */}
        <div className="cs-sidenav-sections" data-visible={active ? 'true' : 'false'} aria-hidden={!active}>
        <p className="cs-sidenav-label">{label}</p>
        <ol className="cs-sidenav-list">
          {sections.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={e => go(e, s.id)}
                tabIndex={active ? undefined : -1}
                aria-current={active === s.id ? 'location' : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ol>
        </div>
      </nav>
    </div>
  )
}
