import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Asset paths ───────────────────────────────────────────────────────────────
const assetPathPrefix = '/assets'
const imgArrow = `${assetPathPrefix}/8177a.svg`
const imgVane = `${assetPathPrefix}/16691.png`
const imgDotGrid = `${assetPathPrefix}/046c2.svg`
const imgEllipse5 = `${assetPathPrefix}/6dc2a.svg`
const imgEllipse6 = `${assetPathPrefix}/9b254.svg`
const imgMask = `${assetPathPrefix}/73b7b.svg`
const imgMapPin = `${assetPathPrefix}/52eba.svg`

// ── Icons ─────────────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function BehanceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.747-.64.14-1.31.22-2.01.22H0V4.502h6.938zm-.34 4.965c.585 0 1.06-.14 1.42-.42.36-.28.54-.72.54-1.31 0-.33-.06-.61-.18-.84-.12-.23-.28-.41-.49-.55-.21-.14-.45-.24-.72-.3-.27-.06-.56-.09-.87-.09H3.5v3.51h3.1zm.16 5.12c.33 0 .64-.03.93-.1.29-.07.54-.18.75-.33.21-.15.38-.36.5-.62.12-.26.18-.58.18-.96 0-.76-.22-1.31-.67-1.64-.45-.33-1.04-.5-1.77-.5H3.5v4.15h3.26zm9.48.79c.37.36.9.54 1.6.54.5 0 .93-.12 1.29-.37.36-.25.58-.51.67-.79h2.46c-.39 1.21-1 2.08-1.81 2.61-.81.52-1.79.79-2.94.79-.8 0-1.52-.13-2.16-.38-.64-.26-1.19-.62-1.63-1.09-.44-.47-.78-1.03-1.02-1.68-.23-.65-.35-1.36-.35-2.13 0-.75.12-1.44.37-2.08.25-.64.59-1.19 1.04-1.66.45-.47 1-.83 1.64-1.09.64-.26 1.35-.39 2.13-.39.87 0 1.63.17 2.28.5.65.33 1.19.78 1.61 1.34.42.56.73 1.2.91 1.92.18.72.24 1.47.18 2.26h-7.33c.04.8.26 1.39.63 1.75zm2.88-4.74c-.3-.33-.77-.5-1.41-.5-.41 0-.75.07-1.02.2-.27.13-.49.3-.65.5-.17.2-.28.41-.35.64-.07.22-.11.43-.12.62h4.17c-.09-.65-.3-1.13-.62-1.46zM14.5 6.5h4.5v1.2H14.5V6.5z"/>
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
function HoverFillLink({ href, dark = false, children, target }: { href: string; dark?: boolean; children: React.ReactNode; target?: string }) {
  const [hovered, setHovered] = useState(false)
  const bg = dark ? '#0b0b0d' : '#f2f2f4'
  const fg = dark ? '#f2f2f4' : '#0b0b0d'
  const border = dark ? '#0b0b0d' : 'rgba(255,255,255,0.3)'
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hovered={hovered ? 'true' : 'false'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        height: 40, padding: '0 16px', borderRadius: 100,
        border: `0.556px solid ${hovered ? bg : border}`,
        background: hovered ? bg : 'transparent',
        color: hovered ? fg : (dark ? '#0b0b0d' : '#f2f2f4'),
        textDecoration: 'none',
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 14,
        whiteSpace: 'nowrap',
        transition: 'background 0.22s ease, color 0.22s ease, border-color 0.22s ease',
        cursor: 'pointer',
      }}
    >
      {children}
    </a>
  )
}

// ── Project data ──────────────────────────────────────────────────────────────
const projects = [
  { id: 1, company: 'izzi CMS', headline: 'Giving marketing control at scale', bg: 'linear-gradient(135deg, rgba(241,215,239,1) 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(139,21,157) 1%, rgb(210,23,114) 99%)', href: '/work/izzi' },
  { id: 2, company: 'Bebbia · Rotoplas', headline: 'Turning a complex funnel into a simpler decision', bg: 'linear-gradient(135deg, rgba(215,228,241,1) 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(21,80,157) 1%, rgb(23,140,210) 99%)' },
  { id: 3, company: 'iVentas', headline: 'A CRM that connects teams and drives sales', bg: 'linear-gradient(135deg, rgba(215,241,224,1) 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(18,110,65) 1%, rgb(23,185,110) 99%)' },
  { id: 4, company: 'NEXU', headline: 'A more human way to verify identity', bg: 'linear-gradient(135deg, rgba(225,215,241,1) 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(100,21,210) 1%, rgb(157,116,232) 99%)' },
  { id: 5, company: 'Mi Fidelidad', headline: 'Diversifying payment methods for churchgoers', bg: 'linear-gradient(135deg, rgba(241,232,215,1) 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(148,96,42) 1%, rgb(210,160,23) 99%)' },
  { id: 6, company: 'Design System', headline: 'Scaling design consistency across products', bg: 'linear-gradient(135deg, rgba(241,215,215,1) 0%, rgba(251,250,250,1) 60%)', titleGradient: 'linear-gradient(96deg, rgb(210,23,23) 1%, rgb(232,116,116) 99%)' },
]

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const href = (project as any).href as string | undefined

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => href && navigate(href)}
      style={{
        flex: '1 1 280px', minWidth: 0,
        borderRadius: 24,
        border: hovered ? '1px solid rgba(157,116,232,0.4)' : '1px solid #e2e2e2',
        background: project.bg, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.12)' : '0 0 0 rgba(0,0,0,0)',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
        cursor: href ? 'pointer' : 'default',
      }}
    >
      <div style={{ height: 200, background: 'rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 16px 8px' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 12, background: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.6)', transition: 'background 0.28s ease' }} />
      </div>
      {/* Text content — leaves space for the absolute button */}
      <div style={{ padding: '16px 64px 24px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, backgroundImage: project.titleGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{project.company}</p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 14, color: '#6c6c6c', lineHeight: 1.45, margin: 0 }}>{project.headline}</p>
      </div>
      {/* Arrow button — absolute bottom-right, always same position */}
      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        width: 40, height: 40, borderRadius: '50%',
        border: hovered ? 'none' : '0.556px solid #0b0b0d',
        background: hovered ? '#0b0b0d' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.24s ease, border-color 0.24s ease',
      }}>
        <img src={imgArrow} alt="" style={{ width: 16, height: 16, filter: hovered ? 'invert(1)' : 'none', transition: 'filter 0.24s ease' }} />
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
type Section = 'hero' | 'work' | 'about' | 'contact'

export default function App() {
  const workRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<Section>('hero')

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
    <div style={{ background: '#0b0b0d', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* ── Rainbow topline ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 60, background: 'linear-gradient(90deg, #7b45f0 0%, #3a8ff5 50%, #c55ab5 100%)' }} />

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 64, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
        background: 'rgba(10,10,13,0.5)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        borderBottom: '0.556px solid rgba(255,255,255,0.07)',
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
                color: isActive ? '#f2f2f4' : 'rgba(242,242,244,0.45)',
                position: 'relative',
                transition: 'color 0.25s ease',
              }}>
                {link.label}
                <span style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: isActive ? 4 : 0, height: 4, borderRadius: 2,
                  background: '#f2f2f4',
                  transition: 'width 0.25s ease, opacity 0.25s ease',
                  opacity: isActive ? 1 : 0,
                }} />
              </button>
            )
          })}
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f2f2f4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }} aria-label="Toggle menu">
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
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Purple glow — fixed, no movement */}
        <div aria-hidden style={{
          position: 'fixed', top: -300, left: '50%', transform: 'translateX(-50%)',
          width: 693, height: 693, borderRadius: '50%',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 693 693' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -49.003 -49.003 0 346.5 346.5)'><stop stop-color='rgba(108,52,218,0.88)' offset='0'/><stop stop-color='rgba(91,66,224,0.73)' offset='0.19'/><stop stop-color='rgba(66,86,232,0.58)' offset='0.38'/><stop stop-color='rgba(60,79,223,0.4)' offset='0.5'/><stop stop-color='rgba(44,62,200,0.22)' offset='0.62'/><stop stop-color='rgba(44,62,200,0)' offset='0.75'/></radialGradient></defs></svg>")`,
          filter: 'blur(52px)', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Pink glow — fixed, no movement */}
        <div aria-hidden style={{
          position: 'fixed', top: 59, right: 'calc(50% - 540px)',
          width: 348, height: 336, borderRadius: '50%',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 348 336' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.3'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -23.759 -24.607 0 174 168)'><stop stop-color='rgba(196,59,98,1)' offset='0'/><stop stop-color='rgba(201,89,140,0.775)' offset='0.1875'/><stop stop-color='rgba(205,120,183,0.55)' offset='0.375'/><stop stop-color='rgba(212,120,176,0.1)' offset='0.75'/></radialGradient></defs></svg>")`,
          filter: 'blur(52px)', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Dot grid — centered on the section */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src={imgDotGrid} alt="" style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(853px, 90vw)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Text */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 756, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 32, marginTop: 64 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#ffffff', margin: 0 }}>I'M VANE, PRODUCT DESIGNER</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', letterSpacing: '-0.02em' }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 'clamp(32px, 5vw, 48px)', color: '#f2f2f4', lineHeight: 1.15, margin: 0 }}>6+ years crafting</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 48px)', backgroundImage: 'linear-gradient(97deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, lineHeight: 1.15 }}>impactful</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 'clamp(32px, 5vw, 48px)', color: '#f2f2f4', lineHeight: 1.15, margin: 0 }}>digital experiences</p>
          </div>
        </div>
      </section>

      {/* ── My Work ── */}
      <section ref={workRef} id="work" style={{ padding: '40px clamp(20px, 5vw, 40px)', background: 'transparent', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#c4c4c4', textAlign: 'center', marginBottom: 24, marginTop: 0 }}>My work</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1260, margin: '0 auto' }}>
          <div className="work-row" style={{ display: 'flex', gap: 24 }}>
            {projects.slice(0, 3).map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
          <div className="work-row" style={{ display: 'flex', gap: 24 }}>
            {projects.slice(3, 6).map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* ── About Me ── */}
      <section ref={aboutRef} id="about" style={{ background: '#f8f8f8', padding: 'clamp(60px, 8vw, 107px) clamp(24px, 12vw, 252px)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div className="about-layout" style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center', maxWidth: 1260, margin: '0 auto' }}>

          {/* Photo card — LEFT on desktop */}
          <div className="about-photo-card" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 24, padding: 24, borderRadius: 24, flexShrink: 0,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 268 332' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(4.1311 23.234 -37.96 11.783 141.46 99.659)'><stop stop-color='rgba(241,215,239,1)' offset='0'/><stop stop-color='rgba(251,250,250,0)' offset='0.35'/></radialGradient></defs></svg>")`,
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
            <HoverFillLink href="/resume" dark>
              Download CV
              <img src={imgArrow} alt="" style={{ width: 16, height: 16, marginLeft: 6, transition: 'filter 0.22s ease' }} className="cv-arrow" />
            </HoverFillLink>
          </div>

          {/* Bio text — RIGHT on desktop, first on mobile via CSS order */}
          <div className="about-text" style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#6c6c6c', margin: 0 }}>About me</p>
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, color: '#0b0b0d', margin: 0 }}>I'm Vane,</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, margin: 0, backgroundImage: 'linear-gradient(107deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Product Designer</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <img src={imgMapPin} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 16, color: '#0b0b0d', margin: 0 }}>Based in Mexico City</p>
              </div>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 14, color: '#6c6c6c', lineHeight: '20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0 }}>I design B2C and B2B digital products across mobile and web.</p>
              <p style={{ margin: 0 }}>Experienced in end-to-end product design, research, data-informed decision-making, design systems, and AI-assisted workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section ref={contactRef} id="contact" style={{ background: '#0b0b0d', padding: 'clamp(60px, 8vw, 107px) clamp(24px, 12vw, 252px)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 1260, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#c4c4c4', textAlign: 'center', margin: 0 }}>contact</p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.025em', color: '#f8f8f8', textAlign: 'center', margin: 0, lineHeight: 1.2 }}>
            <span style={{ fontWeight: 400 }}>Let's </span>
            <span style={{ fontWeight: 700, backgroundImage: 'linear-gradient(118deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>create</span>
            <span style={{ fontWeight: 400 }}> together</span>
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://linkedin.com/in/vanecruz' },
              { label: 'Behance', icon: <BehanceIcon />, href: 'https://behance.net/vanecruz' },
              { label: 'Email', icon: <EmailIcon />, href: 'mailto:vane@example.com' },
            ].map(({ label, icon, href }) => (
              <HoverFillLink key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}>
                {icon}{label}
              </HoverFillLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #6c6c6c', padding: '24px 40px 48px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 12, color: '#e2e2e2', margin: 0 }}>© 2026. Vaneleiry Cruz</p>
      </footer>

      {/* ── Responsive CSS ── */}
      <style>{`
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none !important; }

        /* Arrow icon inside dark HoverFillLink inverts on hover */
        a[data-hovered="true"] .cv-arrow { filter: invert(1); }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .work-row { flex-direction: column !important; }
          .about-layout { flex-direction: column !important; }
          .about-text { order: 1; }
          .about-photo-card { order: 2; width: 100%; }
        }
      `}</style>
    </div>
  )
}
