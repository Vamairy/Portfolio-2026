import { useEffect, useRef, useState } from 'react'

// ── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1, num: '01',
    company: 'izzi',
    title: 'CMS Implementation',
    short: 'Marketing platform redesign for full editorial control.',
    year: '2025',
    category: 'Web Design',
    bg: 'linear-gradient(150deg, #f8cdd8 0%, #fde9c4 55%, #f7d0e8 100%)',
    orb1: { c: 'rgba(235,100,140,0.55)', w: '70%', h: '70%', top: '-15%', right: '-10%' },
    orb2: { c: 'rgba(255,185,110,0.5)', w: '50%', h: '50%', bottom: '-10%', left: '-5%' },
    lines: 'rgba(180,60,90,0.12)',
    ink: '#1a0a10',
    inkMid: 'rgba(26,10,16,0.45)',
    light: true,
  },
  {
    id: 2, num: '02',
    company: 'bebbia · Rotoplas',
    title: 'Agent Portal',
    short: 'CX tool redesign to streamline service operations.',
    year: '2024',
    category: 'Product Design',
    bg: 'linear-gradient(150deg, #060d1e 0%, #0c1c3a 60%, #07122a 100%)',
    orb1: { c: 'rgba(24,65,185,0.7)', w: '65%', h: '65%', top: '-15%', right: '-5%' },
    orb2: { c: 'rgba(55,105,215,0.4)', w: '45%', h: '45%', bottom: '0%', left: '-5%' },
    lines: 'rgba(80,140,235,0.1)',
    ink: '#eef2ff',
    inkMid: 'rgba(238,242,255,0.42)',
    light: false,
  },
  {
    id: 3, num: '03',
    company: 'bebbia · Rotoplas',
    title: 'Subscription Funnel',
    short: 'Optimized flow for water purification subscriptions.',
    year: '2024',
    category: 'Mobile Design',
    bg: 'linear-gradient(150deg, #041624 0%, #083858 60%, #06222e 100%)',
    orb1: { c: 'rgba(18,108,175,0.65)', w: '62%', h: '62%', top: '-10%', right: '5%' },
    orb2: { c: 'rgba(55,165,215,0.4)', w: '44%', h: '44%', bottom: '-8%', left: '8%' },
    lines: 'rgba(70,175,235,0.1)',
    ink: '#d8eefb',
    inkMid: 'rgba(216,238,251,0.42)',
    light: false,
  },
  {
    id: 4, num: '04',
    company: 'iVentas',
    title: 'Sales CRM',
    short: 'Platform bridging prospects and sales teams.',
    year: '2024',
    category: 'Product Design',
    bg: 'linear-gradient(150deg, #071c14 0%, #0e3226 60%, #091e18 100%)',
    orb1: { c: 'rgba(18,98,62,0.72)', w: '60%', h: '60%', top: '-5%', left: '10%' },
    orb2: { c: 'rgba(38,150,98,0.38)', w: '42%', h: '42%', bottom: '-5%', right: '-5%' },
    lines: 'rgba(45,175,105,0.1)',
    ink: '#c8f0e0',
    inkMid: 'rgba(200,240,224,0.42)',
    light: false,
  },
  {
    id: 5, num: '05',
    company: 'Mi Fidelidad',
    title: 'Payment Platform',
    short: 'Diversified payment methods for church communities.',
    year: '2024',
    category: 'Mobile Design',
    bg: 'linear-gradient(150deg, #041018 0%, #092840 60%, #051820 100%)',
    orb1: { c: 'rgba(10,82,118,0.72)', w: '65%', h: '65%', top: '-10%', right: '8%' },
    orb2: { c: 'rgba(22,130,165,0.38)', w: '44%', h: '44%', bottom: '0%', left: '-5%' },
    lines: 'rgba(28,158,200,0.1)',
    ink: '#c4e8f8',
    inkMid: 'rgba(196,232,248,0.42)',
    light: false,
  },
  {
    id: 6, num: '06',
    company: 'izzi',
    title: 'Sellers App',
    short: 'Gamified mobile app for telecom field sales teams.',
    year: '2024',
    category: 'Mobile Design',
    bg: 'linear-gradient(150deg, #0e0418 0%, #1c0828 65%, #100418 100%)',
    orb1: { c: 'rgba(175,15,55,0.72)', w: '62%', h: '62%', top: '-5%', right: '-5%' },
    orb2: { c: 'rgba(225,35,95,0.32)', w: '42%', h: '42%', bottom: '-5%', left: '5%' },
    lines: 'rgba(215,50,100,0.1)',
    ink: '#fcd4e6',
    inkMid: 'rgba(252,212,230,0.42)',
    light: false,
  },
]

type Project = typeof projects[0]

// ── Per-project abstract decoration ──────────────────────────────────────────
function ProjectDecor({ p }: { p: Project }) {
  const s = p.light ? p.ink : p.ink
  const op = p.light ? 0.1 : 0.12

  return (
    <svg
      aria-hidden
      className="absolute pointer-events-none"
      style={{ top: '8%', right: '6%', opacity: op, overflow: 'visible' }}
      width="55%" height="60%"
      viewBox="0 0 260 220"
      fill="none"
    >
      {p.id === 1 && <>
        {/* Wireframe CMS layout */}
        <rect x="10" y="10" width="240" height="200" rx="6" stroke={s} strokeWidth="1.5"/>
        <line x1="10" y1="46" x2="250" y2="46" stroke={s} strokeWidth="1"/>
        <rect x="20" y="60" width="90" height="10" rx="2" stroke={s} strokeWidth="0.8" opacity={0.6}/>
        <rect x="20" y="80" width="140" height="10" rx="2" stroke={s} strokeWidth="0.8" opacity={0.5}/>
        <rect x="20" y="100" width="110" height="10" rx="2" stroke={s} strokeWidth="0.8" opacity={0.4}/>
        <rect x="20" y="125" width="220" height="60" rx="4" stroke={s} strokeWidth="0.8" opacity={0.3}/>
      </>}
      {p.id === 2 && <>
        {/* Orbital rings — agent network */}
        <circle cx="130" cy="110" r="100" stroke={s} strokeWidth="1"/>
        <circle cx="130" cy="110" r="68" stroke={s} strokeWidth="0.7" opacity={0.65}/>
        <circle cx="130" cy="110" r="36" stroke={s} strokeWidth="0.5" opacity={0.45}/>
        <circle cx="130" cy="10" r="4" fill={s} opacity={0.5}/>
        <circle cx="230" cy="110" r="4" fill={s} opacity={0.5}/>
        <circle cx="130" cy="210" r="4" fill={s} opacity={0.5}/>
        <circle cx="30" cy="110" r="4" fill={s} opacity={0.5}/>
      </>}
      {p.id === 3 && <>
        {/* Converging funnel arcs */}
        <path d="M10 30 Q130 75 250 30" stroke={s} strokeWidth="1.5"/>
        <path d="M38 88 Q130 125 222 88" stroke={s} strokeWidth="1.5" opacity={0.7}/>
        <path d="M72 150 Q130 178 188 150" stroke={s} strokeWidth="1.5" opacity={0.5}/>
        <circle cx="130" cy="200" r="10" stroke={s} strokeWidth="1" opacity={0.35}/>
      </>}
      {p.id === 4 && <>
        {/* Dot grid — data/CRM */}
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={10 + c * 34} cy={10 + r * 32}
              r={r * c % 3 === 0 ? 3 : 1.5}
              fill={s}
              opacity={(r * c % 5 === 0 ? 0.7 : 0.35)}
            />
          ))
        )}
      </>}
      {p.id === 5 && <>
        {/* Interlocking circles — community/fidelity */}
        <circle cx="95" cy="110" r="88" stroke={s} strokeWidth="1"/>
        <circle cx="165" cy="110" r="88" stroke={s} strokeWidth="1" opacity={0.65}/>
        <circle cx="130" cy="50" r="50" stroke={s} strokeWidth="0.6" opacity={0.35}/>
      </>}
      {p.id === 6 && <>
        {/* Progress bars — gamification */}
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <rect x="0" y={20 + i * 46} width={260 - i * 25} height="10" rx="5" stroke={s} strokeWidth="1" opacity={0.8 - i * 0.15}/>
            <rect x="0" y={20 + i * 46} width={200 - i * 35} height="10" rx="5" fill={s} opacity={0.08 - i * 0.01}/>
          </g>
        ))}
      </>}
    </svg>
  )
}

// ── Project card (poster) ─────────────────────────────────────────────────────
function ProjectCard({ p, style }: { p: Project; style?: React.CSSProperties }) {
  return (
    <article className="pcard" style={{ background: p.bg, ...style }}>
      {/* Grain on card */}
      <div className="grain" style={{ opacity: 0.04 }}/>

      {/* Primary atmospheric orb */}
      <div aria-hidden style={{
        position: 'absolute',
        width: p.orb1.w, height: p.orb1.h,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${p.orb1.c} 0%, transparent 70%)`,
        filter: 'blur(52px)',
        top: p.orb1.top, right: p.orb1.right,
        pointerEvents: 'none',
      }}/>

      {/* Secondary orb */}
      <div aria-hidden style={{
        position: 'absolute',
        width: p.orb2.w, height: p.orb2.h,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${p.orb2.c} 0%, transparent 70%)`,
        filter: 'blur(38px)',
        bottom: p.orb2.bottom, left: p.orb2.left,
        right: p.orb2.right,
        pointerEvents: 'none',
      }}/>

      {/* Horizontal scan lines */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, ${p.lines} 0px, ${p.lines} 1px, transparent 1px, transparent 36px)`,
        opacity: 0.7,
        pointerEvents: 'none',
      }}/>

      {/* Abstract SVG decor */}
      <ProjectDecor p={p} />

      {/* Number label — top-left */}
      <div style={{
        position: 'absolute', top: 22, left: 24,
        fontSize: 11, fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: p.inkMid,
        zIndex: 2,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {p.num}
      </div>

      {/* Year — top-right */}
      <div style={{
        position: 'absolute', top: 22, right: 24,
        fontSize: 11, fontWeight: 400,
        letterSpacing: '0.1em',
        color: p.inkMid,
        zIndex: 2,
      }}>
        {p.year}
      </div>

      {/* Bottom fade + text */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '60px 24px 24px',
        background: `linear-gradient(to top, ${p.light ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.42)'} 0%, transparent 100%)`,
        zIndex: 2,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: p.inkMid,
          marginBottom: 6,
        }}>
          {p.company}
        </div>

        <h3 className="pcard-title" style={{
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: p.ink,
          marginBottom: 8,
        }}>
          {p.title}
        </h3>

        <p style={{
          fontSize: 13,
          fontWeight: 400,
          lineHeight: 1.55,
          color: p.inkMid,
          marginBottom: 16,
          maxWidth: 300,
        }}>
          {p.short}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: p.inkMid,
          }}>
            View case study
          </span>
          <div className="pcard-arrow" style={{
            background: p.light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
            border: `1px solid ${p.light ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)'}`,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={p.ink} strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </div>
          {/* Category pill */}
          <span style={{
            marginLeft: 'auto',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: 20,
            background: p.light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.08)',
            color: p.inkMid,
          }}>
            {p.category}
          </span>
        </div>
      </div>
    </article>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const BehanceIcon = () => (
  <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '-0.5px' }}>Bē</span>
)
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <circle cx="4" cy="4" r="2"/>
    <rect x="2" y="9" width="4" height="12"/>
  </svg>
)
const MailIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLink: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.02em',
    color: 'rgba(242,242,244,0.55)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }

  return (
    <div style={{ background: '#0b0b0d', minHeight: '100vh' }}>
      {/* Accent top line */}
      <div className="topline"/>

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 2, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px',
        height: 56,
        background: scrolled ? 'rgba(11,11,13,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', gap: 28 }}>
          <a href="#work" style={navLink}
            onMouseEnter={e => (e.currentTarget.style.color = '#f2f2f4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,242,244,0.55)')}>
            Work
          </a>
          <a href="#contact" style={navLink}
            onMouseEnter={e => (e.currentTarget.style.color = '#f2f2f4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,242,244,0.55)')}>
            Contact
          </a>
        </div>

        {/* Center identity */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <a href="#" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', color: '#f2f2f4' }}>
              Vane.
            </span>
          </a>
        </div>

        {/* Right — socials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="https://behance.net" target="_blank" rel="noreferrer"
            style={{ ...navLink, display: 'flex', alignItems: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f2f2f4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,242,244,0.55)')}>
            <BehanceIcon/>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"
            style={{ ...navLink, display: 'flex', alignItems: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f2f2f4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,242,244,0.55)')}>
            <LinkedInIcon/>
          </a>
          <a href="mailto:vane@email.com"
            style={{ ...navLink, display: 'flex', alignItems: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f2f2f4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,242,244,0.55)')}>
            <MailIcon/>
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '88vh',
        textAlign: 'center',
        overflow: 'hidden',
        paddingTop: 80,
      }}>
        {/* Dot grid */}
        <div className="dot-grid"/>

        {/* Grain */}
        <div className="grain"/>

        {/* Atmospheric orbs */}
        {/* Violet – top-left */}
        <div aria-hidden style={{
          position: 'absolute',
          width: '52%', height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(105,50,210,0.38) 0%, transparent 70%)',
          filter: 'blur(72px)',
          top: '-20%', left: '-12%',
          pointerEvents: 'none',
        }}/>

        {/* Blue – top-right */}
        <div aria-hidden style={{
          position: 'absolute',
          width: '45%', height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(35,90,210,0.3) 0%, transparent 70%)',
          filter: 'blur(64px)',
          top: '-15%', right: '-8%',
          pointerEvents: 'none',
        }}/>

        {/* Pink – center-right */}
        <div aria-hidden style={{
          position: 'absolute',
          width: '35%', height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(195,65,155,0.22) 0%, transparent 70%)',
          filter: 'blur(56px)',
          top: '25%', right: '5%',
          pointerEvents: 'none',
        }}/>

        {/* Faint center glow */}
        <div aria-hidden style={{
          position: 'absolute',
          width: '30%', height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(80,60,180,0.14) 0%, transparent 70%)',
          filter: 'blur(48px)',
          top: '35%', left: '35%',
          pointerEvents: 'none',
        }}/>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, padding: '0 24px' }}>
          {/* Role label */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 28,
          }}>
            <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.25)' }}/>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(242,242,244,0.38)',
            }}>
              Product Designer
            </span>
            <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.25)' }}/>
          </div>

          {/* Main headline */}
          <h1 style={{ lineHeight: 1, marginBottom: 20 }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(30px, 5vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.015em',
              color: 'rgba(242,242,244,0.65)',
              marginBottom: 2,
            }}>
              Hello, I'm
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(72px, 13vw, 148px)',
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 0.88,
              background: 'linear-gradient(135deg, #f0eeff 0%, #c8d8ff 40%, #e8c8f8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Vane!
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(242,242,244,0.35)',
            marginBottom: 36,
          }}>
            +6 years of experience
          </p>

          {/* Social row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {[
              { href: 'https://behance.net', label: 'Behance', icon: <BehanceIcon/> },
              { href: 'https://linkedin.com', label: 'LinkedIn', icon: <LinkedInIcon/> },
              { href: 'mailto:vane@email.com', label: 'Email', icon: <MailIcon size={15}/> },
            ].map(s => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel={s.href.startsWith('mailto') ? undefined : 'noreferrer'}
                aria-label={s.label}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 42, height: 42,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(242,242,244,0.6)',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = '#f2f2f4'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'rgba(242,242,244,0.6)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: 0.22, zIndex: 2,
        }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="white" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7"/>
            <circle cx="8" cy="7" r="2" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────── */}
      <section id="work" style={{ padding: '0 20px 80px', maxWidth: 1480, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 20,
          padding: '0 4px',
        }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(242,242,244,0.22)',
            whiteSpace: 'nowrap',
          }}>
            Selected Work
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }}/>
          <span style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: 'rgba(242,242,244,0.18)',
            whiteSpace: 'nowrap',
          }}>
            06 projects · 2024–2025
          </span>
        </div>

        {/* ── Gallery ── */}
        <div className="gallery-rows">

          {/* Row 1 — 58 / 42 */}
          <div className="prow prow-1">
            <ProjectCard p={projects[0]} style={{ height: 520 }}/>
            <ProjectCard p={projects[1]} style={{ height: 520 }}/>
          </div>

          {/* Row 2 — 38 / 62, second starts 52px lower */}
          <div className="prow prow-2">
            <ProjectCard p={projects[2]} style={{ height: 430 }}/>
            <div className="prow-offset" style={{ marginTop: 52 }}>
              <ProjectCard p={projects[3]} style={{ height: 430 }}/>
            </div>
          </div>

          {/* Row 3 — 55 / 45, first starts 36px lower */}
          <div className="prow prow-3">
            <div className="prow-offset" style={{ marginTop: 36 }}>
              <ProjectCard p={projects[4]} style={{ height: 480 }}/>
            </div>
            <ProjectCard p={projects[5]} style={{ height: 460 }}/>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" style={{ padding: '0 20px 100px', maxWidth: 1480, margin: '0 auto' }}>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: 72,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'end',
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
            }}>
              <div style={{ width: 14, height: 1, background: 'rgba(255,255,255,0.2)' }}/>
              <span style={{
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(242,242,244,0.3)',
              }}>
                Get in touch
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(42px, 6vw, 80px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#f2f2f4',
              marginBottom: 24,
            }}>
              Let's work<br/>
              <span style={{
                background: 'linear-gradient(135deg, #a07cf0 0%, #5a9ef5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                together.
              </span>
            </h2>

            <p style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.65,
              color: 'rgba(242,242,244,0.4)',
              maxWidth: 380,
            }}>
              Open to new opportunities, collaborations, and interesting projects.
              If you have a project in mind — let's talk.
            </p>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            <a href="mailto:vane@email.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 'clamp(16px, 2.2vw, 24px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#f2f2f4',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: 100,
              background: 'linear-gradient(135deg, rgba(120,80,240,0.2) 0%, rgba(60,110,240,0.2) 100%)',
              border: '1px solid rgba(160,120,255,0.2)',
              transition: 'background 0.25s, border-color 0.25s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(120,80,240,0.32) 0%, rgba(60,110,240,0.32) 100%)'
                e.currentTarget.style.borderColor = 'rgba(160,120,255,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(120,80,240,0.2) 0%, rgba(60,110,240,0.2) 100%)'
                e.currentTarget.style.borderColor = 'rgba(160,120,255,0.2)'
              }}
            >
              <MailIcon size={18}/>
              vane@email.com
            </a>

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {[
                { href: 'https://behance.net', label: 'Behance', icon: <BehanceIcon/> },
                { href: 'https://linkedin.com', label: 'LinkedIn', icon: <LinkedInIcon/> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
                    color: 'rgba(242,242,244,0.5)',
                    textDecoration: 'none',
                    padding: '10px 18px',
                    borderRadius: 100,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.04)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#f2f2f4'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(242,242,244,0.5)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1480,
        margin: '0 auto',
      }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(242,242,244,0.22)' }}>
          © 2025 Vane
        </span>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,244,0.15)' }}>
          Product Designer
        </span>
      </footer>

      {/* ── SCROLL TO TOP ─────────────────────────────────── */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          style={{
            position: 'fixed', bottom: 28, right: 28,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
            zIndex: 50,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
    </div>
  )
}
