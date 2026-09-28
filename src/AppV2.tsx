import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Portrait halo (About) — faded out with the page blend, since it was drawn for a light background
const portraitHalo = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 268 332' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(4.1311 23.234 -37.96 11.783 141.46 99.659)'><stop stop-color='rgba(241,215,239,1)' offset='0'/><stop stop-color='rgba(251,250,250,0)' offset='0.35'/></radialGradient></defs></svg>")`

// ── Asset paths ───────────────────────────────────────────────────────────────
const assetPathPrefix = '/assets'
const imgArrow = `${assetPathPrefix}/8177a.svg`
const imgVane = `${assetPathPrefix}/16691.png`
const imgEllipse5 = `${assetPathPrefix}/6dc2a.svg`
const imgEllipse6 = `${assetPathPrefix}/9b254.svg`
const imgMask = `${assetPathPrefix}/73b7b.svg`
const imgMapPin = `${assetPathPrefix}/52eba.svg`

// ── Background blend (Hero → Work) ────────────────────────────────────────────
// The page starts on the original near-black and eases to a light neutral as Work scrolls in.
// Stops pass through the hero glow language (deep navy-violet → muted lavender), never a rainbow.
type RGB = [number, number, number]
const BG_STOPS: [number, RGB][] = [
  [0, [11, 11, 13]],       // #0b0b0d — original Home background
  [0.4, [29, 27, 51]],     // deep navy-violet
  [0.72, [169, 163, 200]], // muted lavender
  [0.88, [232, 230, 240]], // lavender-tinted neutral
  [1, [248, 248, 248]],    // #f8f8f8 — same light neutral as About, so Work → About has no seam
]
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map(i => Math.round(a[i] + (b[i] - a[i]) * t)) as RGB
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const rgba = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
function blendBg(p: number): RGB {
  for (let i = 1; i < BG_STOPS.length; i++) {
    const [p0, c0] = BG_STOPS[i - 1]
    const [p1, c1] = BG_STOPS[i]
    if (p <= p1) return mix(c0, c1, (p - p0) / (p1 - p0))
  }
  return BG_STOPS[BG_STOPS.length - 1][1]
}

// Nav, the Work label and the About / Contact text flip from light-on-dark to dark-on-light
// across the lavender range, where both inks keep contrast. Ends are the original dark chrome,
// the light glass the case-study nav already uses, and each section's original text colors.
function blendVars(p: number): Record<string, string> {
  const t = clamp01((p - 0.55) / 0.2)
  return {
    '--home-bg': rgba(blendBg(p)),
    '--home-glow': String(1 - 0.68 * p),
    '--home-nav-bg': rgba(mix([10, 10, 13], [248, 248, 248], t), 0.5 + 0.22 * t),
    '--home-nav-border': t < 0.5 ? `rgba(255,255,255,${0.07 * (1 - t * 2)})` : `rgba(11,11,13,${0.08 * (t * 2 - 1)})`,
    '--home-nav-ink': rgba(mix([242, 242, 244], [11, 11, 13], t)),
    '--home-nav-muted': rgba(mix([242, 242, 244], [11, 11, 13], t), 0.45 + 0.05 * t),
    '--home-label': rgba(mix([196, 196, 196], [108, 108, 108], t)),
    '--sec-ink': rgba(mix([248, 248, 248], [11, 11, 13], t)),
    '--pill-ink': rgba(mix([242, 242, 244], [11, 11, 13], t)),
    '--pill-border': t < 0.5 ? `rgba(255,255,255,${0.3 * (1 - t * 2)})` : `rgba(11,11,13,${t * 2 - 1})`,
    '--sec-invert': (1 - t).toFixed(3),
    '--sec-divider': t < 0.5 ? `rgba(255,255,255,${(0.1 * (1 - t * 2)).toFixed(3)})` : `rgba(0,0,0,${(0.1 * (t * 2 - 1)).toFixed(3)})`,
  }
}
const DARK_VARS = blendVars(0)

// ── Hero particles ────────────────────────────────────────────────────────────
// Small outlined circles floating around the headline. x/y are px from the centre of the Hero
// text block, kept clear of the copy; narrower screens pull them in (--hp-spread) and hide a few.
// f1/f2 are drift waypoints (px), so every circle wanders on its own loop.
type Particle = {
  x: number; y: number; d: number
  f1: [number, number]; f2: [number, number]; dur: number; delay: number
  scale?: number; hideMd?: boolean; hideSm?: boolean
}
const HERO_PARTICLES: Particle[] = [
  { x: -410, y: -150, d: 12, f1: [10, -8], f2: [-6, 7], dur: 9, delay: -2 },
  { x: -330, y: 100, d: 24, f1: [-12, 10], f2: [8, 16], dur: 12, delay: -7, scale: 1.06, hideSm: true },
  { x: -495, y: 30, d: 8, f1: [8, 12], f2: [-10, 4], dur: 7, delay: -4, hideMd: true, hideSm: true },
  { x: -150, y: -200, d: 9, f1: [-9, 8], f2: [7, 12], dur: 10, delay: -1 },
  { x: 360, y: -150, d: 18, f1: [-14, -6], f2: [-4, 12], dur: 11, delay: -5 },
  { x: 455, y: 75, d: 32, f1: [10, -14], f2: [-8, -18], dur: 14, delay: -9, scale: 1.05, hideMd: true, hideSm: true },
  { x: 235, y: 185, d: 13, f1: [12, 6], f2: [4, -10], dur: 8, delay: -3 },
  { x: -70, y: 205, d: 7, f1: [-8, -10], f2: [10, -4], dur: 6, delay: -2.5 },
  { x: 505, y: -195, d: 8, f1: [-10, 8], f2: [6, 14], dur: 9, delay: -6, hideMd: true, hideSm: true },
]

function HeroParticles() {
  return (
    // --hero-deco: fades as the Hero exits (unset with reduced motion)
    <div aria-hidden className="hero-particles" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 'var(--hero-deco, 1)' as unknown as number }}>
      {HERO_PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`hero-particle${p.hideMd ? ' hide-md' : ''}${p.hideSm ? ' hide-sm' : ''}`}
          style={{
            position: 'absolute', width: p.d, height: p.d, borderRadius: '50%', border: '1px solid #6c6c6c',
            left: `calc(50% + ${p.x}px * var(--hp-spread))`, top: `calc(50% + 32px + ${p.y}px * var(--hp-vspread))`,
            marginLeft: -p.d / 2, marginTop: -p.d / 2,
            animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
            '--f1x': `${p.f1[0]}px`, '--f1y': `${p.f1[1]}px`, '--f2x': `${p.f2[0]}px`, '--f2y': `${p.f2[1]}px`, '--fs': p.scale ?? 1,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// ── Rotating hero word ────────────────────────────────────────────────────────
// All words share one grid cell, so the cell is always as wide as the longest word and the
// headline never shifts. Reduced motion: stays on "impactful".
const HERO_WORDS = ['impactful', 'intuitive', 'scalable', 'meaningful']
const HERO_WORD_MS = 3200

function RotatingWord() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex(i => (i + 1) % HERO_WORDS.length), HERO_WORD_MS)
    return () => window.clearInterval(id)
  }, [])
  const prev = (index - 1 + HERO_WORDS.length) % HERO_WORDS.length
  return (
    <>
      <span className="sr-only">{HERO_WORDS[0]}</span>
      <span aria-hidden className="hero-words">
        {HERO_WORDS.map((word, i) => (
          <span key={word} className={`hero-word${i === index ? ' is-active' : i === prev ? ' is-leaving' : ''}`}>{word}</span>
        ))}
      </span>
    </>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function BehanceIcon() {
  // Simple Icons "Behance" — same icon set and 24 × 24 grid as the LinkedIn icon
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/>
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// ── HoverFillLink — pill button with fill-on-hover ───────────────────────────
// Hover/focus states live in the responsive CSS block (.pill-link) so they don't stick on touch.
function HoverFillLink({ href, dark = false, children, target, download }: { href: string; dark?: boolean; children: React.ReactNode; target?: string; download?: string }) {
  return (
    <a
      href={href}
      target={target}
      download={download}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={dark ? 'pill-link pill-link--dark' : 'pill-link'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        height: 40, padding: '0 16px', borderRadius: 100,
        textDecoration: 'none',
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 14,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
    >
      {children}
    </a>
  )
}

// ── Project data ──────────────────────────────────────────────────────────────
// Headlines are the exact Hero titles of each case study; colors come from each case-study theme.
// Thumbnails are 2:1 compositions made for the Home cards (the case-study assets stay untouched).
const homeAssets = `${assetPathPrefix}/home`

const projects: {
  id: string; company: string; headline: string; href: string; image: string
  bg: string; titleGradient: string; hoverBorder: string
}[] = [
  { id: 'izzi', company: 'izzi CMS', headline: 'Giving marketing control at scale.', href: '/work/izzi', image: `${homeAssets}/work-izzi-cms.webp`, bg: 'linear-gradient(135deg, #ffe5fa 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(210,23,114) 1%, rgb(235,104,56) 99%)', hoverBorder: 'rgba(210,23,114,0.4)' },
  { id: 'gluo', company: 'Gluo', headline: "Rebuilding a digital agency's site around a clearer brand identity.", href: '/work/gluo', image: `${homeAssets}/work-gluo.webp`, bg: 'linear-gradient(135deg, rgb(249,255,223) 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, #55b32f 1%, #13c3a0 99%)', hoverBorder: 'rgba(85,179,47,0.4)' },
  { id: 'bebbia', company: 'Bebbia', headline: "Simplifying Bebbia's path end to end.", href: '/work/bebbia', image: `${homeAssets}/work-bebbia.webp`, bg: 'linear-gradient(135deg, #d4f2ff 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, #1b5eea 1%, #14b9ff 99%)', hoverBorder: 'rgba(27,94,234,0.4)' },
  { id: 'izzi-sellers', company: 'izzi Sellers', headline: "Rebuilding trust in a sales team's daily tool", href: '/work/izzi-sellers', image: `${homeAssets}/work-izzi-sellers.webp`, bg: 'linear-gradient(135deg, #fff3d9 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(255,108,7) 1%, rgb(244,126,40) 99%)', hoverBorder: 'rgba(255,108,7,0.4)' },
  { id: 'mi-fidelidad', company: 'Mi Fidelidad', headline: 'Giving churchgoers a clearer, more trustworthy way to donate.', href: '/work/mi-fidelidad', image: `${homeAssets}/work-mi-fidelidad.webp`, bg: 'linear-gradient(135deg, #d5ecf1 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, #245f6b 1%, #3e8391 99%)', hoverBorder: 'rgba(36,95,107,0.4)' },
  { id: 'iventas', company: 'iVentas CRM', headline: 'A CRM built to keep sales teams from losing prospects in the noise.', href: '/work/iventas', image: `${homeAssets}/work-iventas.webp`, bg: 'linear-gradient(135deg, #e5f4ff 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, #0a8ff0 1%, #1dbf8a 99%)', hoverBorder: 'rgba(10,143,240,0.4)' },
]

// ── Project Card ──────────────────────────────────────────────────────────────
// Hover, focus and press states live in the responsive CSS block (.project-card).
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Link
      to={project.href}
      className="project-card"
      style={{
        minWidth: 0,
        borderRadius: 24,
        background: project.bg, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        textDecoration: 'none', color: 'inherit',
        ['--pc-hover-border' as string]: project.hoverBorder,
      }}
    >
      {/* Image area — edge to edge, locked to the thumbnails' 2:1 canvas so nothing is cropped */}
      <div style={{ aspectRatio: '2 / 1', position: 'relative', overflow: 'hidden' }}>
        <div className="pc-media" style={{ position: 'absolute', inset: 0 }}>
          <img src={project.image} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      {/* Text content — leaves space for the absolute button */}
      <div style={{ padding: '16px 64px 24px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, backgroundImage: project.titleGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{project.company}</p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 14, color: '#6c6c6c', lineHeight: 1.45, margin: 0 }}>{project.headline}</p>
      </div>
      {/* Arrow button — absolute bottom-right, always same position */}
      <div className="pc-arrow" aria-hidden style={{
        position: 'absolute', bottom: 20, right: 20,
        width: 40, height: 40, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={imgArrow} alt="" style={{ width: 16, height: 16 }} />
      </div>
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
type Section = 'hero' | 'work' | 'about' | 'contact'

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<Section>('hero')

  // Blend the page background with scroll progress: dark Hero → light Work, then back to dark
  // as Contact comes in. No extra layout — About and Contact are transparent over the blend layer.
  // Reduced motion: no scroll-linked blend; static section colors instead (CSS).
  useEffect(() => {
    const root = rootRef.current
    const hero = heroRef.current
    const work = workRef.current
    const about = aboutRef.current
    const contact = contactRef.current
    if (!root || !hero || !work || !about || !contact) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      // Starts once the Hero is slightly scrolled; fully light when Work's top reaches ~20% of the viewport
      const start = hero.offsetHeight * 0.15
      const end = Math.max(start + 1, work.offsetTop - window.innerHeight * 0.2)
      const p = clamp01((window.scrollY - start) / (end - start))
      // Reverse (in scroll positions): starts once About has been seen whole — its top at the viewport
      // top — or, when About is taller than the viewport, as Contact's top reaches 85%. Fully dark
      // when Contact's top reaches ~30%, or just before the page bottom if the page ends sooner.
      // Short pages / tall viewports get at least 200px of scroll for the change.
      const vh = window.innerHeight
      const maxY = document.documentElement.scrollHeight - vh
      const qEndY = Math.min(contact.offsetTop - vh * 0.3, maxY - 40)
      const qStartY = Math.min(Math.max(about.offsetTop, contact.offsetTop - vh * 0.85), qEndY - 200)
      const q = clamp01((window.scrollY - qStartY) / (qEndY - qStartY))
      for (const [k, v] of Object.entries(blendVars(Math.min(p, 1 - q)))) root.style.setProperty(k, v)
      root.style.setProperty('--hero-deco', (1 - clamp01(window.scrollY / (hero.offsetHeight * 0.9))).toFixed(3))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Track active section for nav indicator
  useEffect(() => {
    const sections: { id: Section; ref: React.RefObject<HTMLDivElement | null> }[] = [
      { id: 'contact', ref: contactRef },
      { id: 'about', ref: aboutRef },
      { id: 'work', ref: workRef },
    ]
    const onScroll = () => {
      const mid = window.innerHeight / 2
      for (const { id, ref } of sections) {
        const el = ref.current
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= mid) {
          setActiveSection(id)
          return
        }
      }
      setActiveSection('hero')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    setMenuOpen(false)
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks: { label: string; ref: React.RefObject<HTMLDivElement | null>; id: Section }[] = [
    { label: 'My Work', ref: workRef, id: 'work' },
    { label: 'About me', ref: aboutRef, id: 'about' },
    { label: 'Contact', ref: contactRef, id: 'contact' },
  ]

  return (
    <div ref={rootRef} style={{ ...DARK_VARS, background: '#0b0b0d', minHeight: '100vh', position: 'relative', overflowX: 'hidden' } as React.CSSProperties}>

      {/* ── Scroll-blended page background (dark Hero → light Work) ── */}
      <div aria-hidden className="home-bg-blend" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'var(--home-bg)' }} />

      {/* ── Rainbow topline ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 60, background: 'linear-gradient(90deg, #7b45f0 0%, #3a8ff5 50%, #c55ab5 100%)' }} />

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 64, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
        background: 'var(--home-nav-bg)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        borderBottom: '0.556px solid var(--home-nav-border)',
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16,
          backgroundImage: 'linear-gradient(97deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          width: 80,
        }}>I'm Vane</button>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', gap: 32 }}>
          {navLinks.map(link => {
            const isActive = activeSection === link.id
            return (
              <button key={link.label} onClick={() => scrollTo(link.ref)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 6px',
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 13,
                color: isActive ? 'var(--home-nav-ink)' : 'var(--home-nav-muted)',
                position: 'relative',
                transition: 'color 0.25s ease',
              }}>
                {link.label}
                <span style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: isActive ? 4 : 0, height: 4, borderRadius: 2,
                  background: 'var(--home-nav-ink)',
                  transition: 'width 0.25s ease, opacity 0.25s ease',
                  opacity: isActive ? 1 : 0,
                }} />
              </button>
            )
          })}
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--home-nav-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }} aria-label="Toggle menu">
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div style={{ width: 80 }} className="nav-desktop" />
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 45,
          background: 'rgba(10,10,13,0.97)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          {navLinks.map(link => (
            <button key={link.label} onClick={() => scrollTo(link.ref)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 28,
              color: '#f2f2f4', letterSpacing: '-0.02em',
            }}>{link.label}</button>
          ))}
        </div>
      )}

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Purple glow — part of the Hero, scrolls away with it */}
        <div aria-hidden style={{
          position: 'absolute', top: -300, left: '50%', transform: 'translateX(-50%)',
          width: 693, height: 693, borderRadius: '50%',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 693 693' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -49.003 -49.003 0 346.5 346.5)'><stop stop-color='rgba(108,52,218,0.88)' offset='0'/><stop stop-color='rgba(91,66,224,0.73)' offset='0.19'/><stop stop-color='rgba(66,86,232,0.58)' offset='0.38'/><stop stop-color='rgba(60,79,223,0.4)' offset='0.5'/><stop stop-color='rgba(44,62,200,0.22)' offset='0.62'/><stop stop-color='rgba(44,62,200,0)' offset='0.75'/></radialGradient></defs></svg>")`,
          filter: 'blur(52px)', pointerEvents: 'none', zIndex: 0, opacity: 'var(--home-glow)' as unknown as number,
        }} />

        {/* Pink glow — part of the Hero, scrolls away with it */}
        <div aria-hidden style={{
          position: 'absolute', top: 59, right: 'calc(50% - 540px)',
          width: 348, height: 336, borderRadius: '50%',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 348 336' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.3'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -23.759 -24.607 0 174 168)'><stop stop-color='rgba(196,59,98,1)' offset='0'/><stop stop-color='rgba(201,89,140,0.775)' offset='0.1875'/><stop stop-color='rgba(205,120,183,0.55)' offset='0.375'/><stop stop-color='rgba(212,120,176,0.1)' offset='0.75'/></radialGradient></defs></svg>")`,
          filter: 'blur(52px)', pointerEvents: 'none', zIndex: 0, opacity: 'var(--home-glow)' as unknown as number,
        }} />


        {/* Floating circles — part of the Hero, scroll away with it */}
        <HeroParticles />

        {/* Text */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 756, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 32, marginTop: 64 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#ffffff', margin: 0 }}>I'M VANE, PRODUCT DESIGNER</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', letterSpacing: '-0.02em' }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 'clamp(32px, 5vw, 48px)', color: '#f2f2f4', lineHeight: 1.15, margin: 0 }}>6+ years crafting</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 48px)', margin: 0, lineHeight: 1.15 }}><RotatingWord /></p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 'clamp(32px, 5vw, 48px)', color: '#f2f2f4', lineHeight: 1.15, margin: 0 }}>digital experiences</p>
          </div>
        </div>
      </section>

      {/* ── My Work ── */}
      <section ref={workRef} id="work" className="home-work" style={{ padding: '40px clamp(20px, 5vw, 40px)', background: 'transparent', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--home-label)', textAlign: 'center', marginBottom: 24, marginTop: 0 }}>My work</p>
        {/* 3 → 2 → 1 columns; see .work-grid in the responsive CSS block */}
        <div className="work-grid" style={{ display: 'grid', gap: 24, maxWidth: 1260, margin: '0 auto' }}>
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* ── About Me ── */}
      <section ref={aboutRef} id="about" style={{ background: 'transparent', padding: 'clamp(60px, 8vw, 107px) clamp(24px, 12vw, 252px)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        {/* Section divider (case-study .cs-divider language) — Work → About */}
        <div role="presentation" style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '0 clamp(24px, 12vw, 252px)' }}>
          <div className="home-divider" style={{ maxWidth: 1260, margin: '0 auto' }} />
        </div>
        <div className="about-layout" style={{ display: 'flex', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center', justifyContent: 'center', maxWidth: 1260, margin: '0 auto' }}>

          {/* Photo card — LEFT on desktop */}
          <div className="about-photo-card" style={{
            position: 'relative', isolation: 'isolate',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 24, padding: 24, borderRadius: 24, flexShrink: 0,
          }}>
            <div style={{ position: 'relative', width: 220, height: 220, flexShrink: 0 }}>
              <div style={{ position: 'absolute', bottom: 0.48, left: 0, width: 92.135, height: 92.135 }}>
                <img src={imgEllipse5} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10.48, width: 28.556, height: 28.556 }}>
                <img src={imgEllipse6} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
              <div style={{
                position: 'absolute', left: 25.95, top: 15.95,
                width: 176.628, height: 176.628,
                maskImage: `url("${imgMask}")`, WebkitMaskImage: `url("${imgMask}")`,
                maskSize: '169.13px 169.13px', maskPosition: '3.749px 3.749px', maskRepeat: 'no-repeat',
              }}>
                <img src={imgVane} alt="Vane Cruz" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Bio text — RIGHT on desktop, first on mobile via CSS order */}
          <div className="about-text" style={{ flex: '0 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
            {/* Label sits 16px above the name (24px column gap − 8) */}
            <p className="about-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--home-label)', margin: '0 0 -8px' }}>About me</p>
            {/* Name / role, then location */}
            <div className="about-name" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, color: 'var(--sec-ink)', margin: 0 }}>Hi! I'm Vane,</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, margin: 0, backgroundImage: 'linear-gradient(107deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Product Designer</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <img src={imgMapPin} alt="" style={{ width: 24, height: 24, flexShrink: 0, filter: 'invert(var(--sec-invert, 0))' }} />
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 16, color: 'var(--sec-ink)', margin: 0 }}>Based in Mexico City</p>
              </div>
            </div>
            <div className="about-desc" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 14, color: 'var(--home-label)', lineHeight: '20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0 }}>I design B2C and B2B digital products across mobile and web.</p>
              <p style={{ margin: 0 }}>Experienced in end-to-end product design, research, data-informed decision-making, design systems, and AI-assisted workflows.</p>
            </div>
            <div className="about-cta" style={{ marginTop: 8 }}>
              <HoverFillLink href="/Vaneleiry-Cruz-Resume.pdf" download="Vaneleiry-Cruz-Resume.pdf" dark>
                Download CV
                <img src={imgArrow} alt="" style={{ width: 16, height: 16, marginLeft: 6, transition: 'filter 0.22s ease' }} className="cv-arrow" />
              </HoverFillLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section ref={contactRef} id="contact" style={{ background: 'transparent', padding: 'clamp(60px, 8vw, 107px) clamp(24px, 12vw, 252px)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 1260, margin: '0 auto' }}>
          {/* Section divider — opens the Contact composition */}
          <div role="presentation" className="home-divider" />
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--home-label)', textAlign: 'center', margin: 0 }}>contact</p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.025em', color: 'var(--sec-ink)', textAlign: 'center', margin: 0, lineHeight: 1.2 }}>
            <span style={{ fontWeight: 400 }}>Let's </span>
            <span style={{ fontWeight: 700, backgroundImage: 'linear-gradient(118deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>create</span>
            <span style={{ fontWeight: 400 }}> together</span>
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: 'var(--home-label)', textAlign: 'center', maxWidth: 420, margin: '-16px auto 0' }}>
            Have a project, opportunity, or idea in mind? Let’s talk.
          </p>
          <div className="contact-pills" style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/vaneleiry/' },
              { label: 'Behance', icon: <BehanceIcon />, href: 'https://www.behance.net/Vamairy' },
              { label: 'Email', icon: <EmailIcon />, href: 'mailto:vaneleiry@gmail.com' },
            ].map(({ label, icon, href }) => (
              <HoverFillLink key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}>
                {icon}{label}
              </HoverFillLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0b0b0d', borderTop: '1px solid #6c6c6c', padding: '24px 40px 48px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p className="footer-signature">Designed by me with Figma, Claude & questionable sleeping hours. © 2026</p>
      </footer>

      {/* ── Responsive CSS ── */}
      <style>{`
        .nav-desktop { display: flex; }

        /* Work grid: 3 columns while cards stay ≥ ~300px wide, 2 down to ~280px, then 1 */
        .work-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        @media (max-width: 1023px) { .work-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 639px) { .work-grid { grid-template-columns: minmax(0, 1fr); } }
        /* Contact pills: one per row on narrow screens, natural width, centred */
        @media (max-width: 639px) { .contact-pills { flex-direction: column; align-items: center; gap: 12px !important; } }
        /* Mobile: main actions (Download CV, contact pills) span the content width; 44px touch height */
        @media (max-width: 639px) {
          .contact-pills { align-items: stretch !important; }
          .contact-pills .pill-link, .about-cta .pill-link { width: 100%; justify-content: center; height: 44px !important; }
        }
        .nav-hamburger { display: none !important; }

        /* Section dividers: 1px, same weight as the case-study .cs-divider; colour follows the page blend */
        .home-divider { height: 1px; width: 100%; background: var(--sec-divider, rgba(0,0,0,0.1)); flex-shrink: 0; }

        /* Portrait halo: follows the section ink flip so it never shows as a pale blob on dark */
        .about-photo-card::before {
          content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 24px; pointer-events: none;
          background-image: ${portraitHalo}; opacity: calc(1 - var(--sec-invert, 0));
        }

        /* Pill links (Download CV, contact) — fill on hover */
        .pill-link {
          border: 0.556px solid var(--pill-border, rgba(255,255,255,0.3)); background: transparent; color: var(--pill-ink, #f2f2f4);
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease;
        }
        .pill-link--dark { border-color: var(--pill-border, #0b0b0d); color: var(--pill-ink, #0b0b0d); }
        .pill-link--dark .cv-arrow { filter: invert(var(--sec-invert, 0)); }
        .pill-link:focus-visible { outline: 2px solid rgb(157,116,232); outline-offset: 3px; }
        .pill-link:active { opacity: 0.8; }
        @media (hover: hover) {
          .pill-link:hover { background: #f2f2f4; border-color: #f2f2f4; color: #0b0b0d; }
          .pill-link--dark:hover { background: #0b0b0d; border-color: #0b0b0d; color: #f2f2f4; }
          /* Arrow icon inside dark HoverFillLink inverts on hover */
          .pill-link--dark:hover .cv-arrow { filter: invert(1); }
        }

        /* Work cards */
        .project-card {
          border: 1px solid #e2e2e2;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .pc-media { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        .pc-arrow { border: 0.556px solid #0b0b0d; background: transparent; transition: background 0.24s ease, border-color 0.24s ease; }
        .pc-arrow img { transition: filter 0.24s ease, transform 0.24s ease; }
        .project-card:focus-visible { outline: 2px solid rgb(157,116,232); outline-offset: 4px; }
        @media (hover: hover) {
          .project-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); border-color: var(--pc-hover-border); }
          .project-card:hover .pc-media { transform: scale(1.04); }
        }
        .project-card:focus-visible .pc-arrow { background: #0b0b0d; border-color: #0b0b0d; }
        .project-card:focus-visible .pc-arrow img { filter: invert(1); transform: translate(2px, -2px); }
        @media (hover: hover) {
          .project-card:hover .pc-arrow { background: #0b0b0d; border-color: #0b0b0d; }
          .project-card:hover .pc-arrow img { filter: invert(1); transform: translate(2px, -2px); }
        }
        /* Touch: brief press feedback instead of hover */
        @media (hover: none) {
          .project-card:active { transform: scale(0.985); border-color: var(--pc-hover-border); }
          .project-card:active .pc-arrow { background: #0b0b0d; border-color: #0b0b0d; }
          .project-card:active .pc-arrow img { filter: invert(1); }
        }

        /* Rotating hero word — short vertical fade; the longest word sets the cell width */
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
        .hero-words { display: inline-grid; justify-items: center; vertical-align: top; }
        .hero-word {
          grid-area: 1 / 1; white-space: nowrap;
          background-image: linear-gradient(97deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          opacity: 0; transform: translateY(0.35em);
          transition: opacity 0.5s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-word.is-active { opacity: 1; transform: translateY(0); }
        .hero-word.is-leaving { opacity: 0; transform: translateY(-0.35em); }

        /* Hero particles — independent slow drift; tighter spread and fewer circles on narrow screens */
        .hero-particles { --hp-spread: 1; --hp-vspread: 1; }
        @media (max-width: 1023px) { .hero-particles { --hp-spread: 0.68; --hp-vspread: 0.9; } .hero-particle.hide-md { display: none; } }
        @media (max-width: 639px) { .hero-particles { --hp-spread: 0.42; --hp-vspread: 0.8; } .hero-particle.hide-sm { display: none; } }
        .hero-particle { animation: hero-float ease-in-out infinite; }
        @keyframes hero-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(var(--f1x), var(--f1y)) scale(var(--fs)); }
          70% { transform: translate(var(--f2x), var(--f2y)) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-particle { animation: none; }
          .hero-word { transition: none; }
          .home-bg-blend { display: none; }
          #about { background: #f8f8f8 !important; --sec-divider: rgba(0,0,0,0.1); --sec-ink: #0b0b0d; --home-label: #6c6c6c; --pill-ink: #0b0b0d; --pill-border: #0b0b0d; --sec-invert: 0; }
          #contact { background: #0b0b0d !important; --sec-divider: rgba(255,255,255,0.1); --sec-ink: #f8f8f8; --home-label: #c4c4c4; --pill-ink: #f2f2f4; --pill-border: rgba(255,255,255,0.3); --sec-invert: 1; }
          .home-work { background: linear-gradient(180deg, #0b0b0d 0, #1d1b33 40px, #a9a3c8 140px, #f8f8f8 260px) !important; }
          .project-card, .pc-media, .pc-arrow img { transition-property: box-shadow, border-color, background, filter; }
          .project-card:hover, .project-card:active,
          .project-card:hover .pc-media,
          .project-card:hover .pc-arrow img, .project-card:focus-visible .pc-arrow img { transform: none !important; }
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .about-layout { flex-direction: column !important; }
          /* Mobile About: label → portrait → name/role → location → description → CV, one column */
          .about-layout { align-items: stretch !important; gap: 0 !important; }
          .about-text { display: contents !important; }
          .about-label { order: 1; margin: 0 0 12px !important; }
          .about-photo-card { order: 2; align-self: flex-start; padding: 0 !important; margin-bottom: 12px; }
          .about-name { order: 3; margin-bottom: 24px; }
          .about-desc { order: 4; margin-bottom: 24px; }
          .about-cta { order: 5; }
        }
      `}</style>
    </div>
  )
}
