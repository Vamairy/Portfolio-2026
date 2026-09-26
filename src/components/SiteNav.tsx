import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlassTone, type GlassTone } from './glass'

// Global portfolio navbar for routed pages (case studies).
// Mirrors the homepage nav in AppV2.tsx: rainbow topline, dark glass bar,
// "I'm Vane" gradient mark, dot indicator for the active link, hamburger overlay on mobile.

const FONT = "'Plus Jakarta Sans', sans-serif"

const LINKS = [
  { label: 'My Work', to: '/#work', id: 'work' },
  { label: 'About me', to: '/#about', id: 'about' },
  { label: 'Contact', to: '/#contact', id: 'contact' },
] as const

type LinkId = (typeof LINKS)[number]['id']

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

// Glass surfaces shared with the case-study floating controls (Back to top):
// dark glass over light pages, light glass over dark surfaces.
const GLASS: Record<GlassTone, { bg: string; border: string; ink: string; muted: string }> = {
  dark: { bg: 'rgba(10,10,13,0.72)', border: 'rgba(255,255,255,0.12)', ink: '#f2f2f4', muted: 'rgba(242,242,244,0.5)' },
  light: { bg: 'rgba(242,242,244,0.78)', border: 'rgba(11,11,13,0.08)', ink: '#0b0b0d', muted: 'rgba(11,11,13,0.5)' },
}
const LEGACY = { bg: 'rgba(10,10,13,0.5)', border: 'rgba(255,255,255,0.07)', ink: '#f2f2f4', muted: 'rgba(242,242,244,0.45)' }

export default function SiteNav({ active, adaptive = false }: {
  active?: LinkId
  /** Glass surface that adapts to the background behind the bar (case-study pages) */
  adaptive?: boolean
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const sampled = useGlassTone(navRef)
  // The open mobile menu is always a dark overlay, so keep the bar dark with it
  const glass = adaptive ? GLASS[menuOpen ? 'dark' : sampled] : LEGACY

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 60, background: 'linear-gradient(90deg, #7b45f0 0%, #3a8ff5 50%, #c55ab5 100%)' }} />

      <nav ref={navRef} data-tone={adaptive ? (menuOpen ? 'dark' : sampled) : undefined} style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 64, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
        background: glass.bg,
        backdropFilter: adaptive ? 'blur(20px)' : 'blur(28px)', WebkitBackdropFilter: adaptive ? 'blur(20px)' : 'blur(28px)',
        borderBottom: `0.556px solid ${glass.border}`,
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          fontFamily: FONT, fontWeight: 700, fontSize: 16,
          backgroundImage: 'linear-gradient(97deg, rgb(157,116,232) 1%, rgb(212,120,176) 99%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          width: 80,
        }}>I'm Vane</Link>

        <div className="site-nav-desktop" style={{ display: 'flex', gap: 32 }}>
          {LINKS.map(link => {
            const isActive = active === link.id
            return (
              <Link key={link.id} to={link.to} style={{
                textDecoration: 'none', padding: '0 0 6px',
                fontFamily: FONT, fontWeight: 500, fontSize: 13,
                color: isActive ? glass.ink : glass.muted,
                position: 'relative',
                transition: 'color 0.25s ease',
              }}>
                {link.label}
                <span style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: isActive ? 4 : 0, height: 4, borderRadius: 2,
                  background: glass.ink,
                  opacity: isActive ? 1 : 0,
                  transition: 'background 0.35s ease',
                }} />
              </Link>
            )
          })}
        </div>

        <button className="site-nav-hamburger" onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: glass.ink, transition: 'color 0.35s ease', display: 'none', alignItems: 'center', justifyContent: 'center', padding: 4 }} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div style={{ width: 80 }} className="site-nav-desktop" />
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 45,
          background: 'rgba(10,10,13,0.97)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          {LINKS.map(link => (
            <Link key={link.id} to={link.to} onClick={() => setMenuOpen(false)} style={{
              textDecoration: 'none',
              fontFamily: FONT, fontWeight: 600, fontSize: 28,
              color: '#f2f2f4', letterSpacing: '-0.02em',
            }}>{link.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .site-nav-desktop { display: none !important; }
          .site-nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
