import React from 'react'
import { useNavigate } from 'react-router-dom'

const A = '/assets'

const imgHeroBg = `${A}/56783.png`
const imgIPhoneHand = `${A}/679dd.png`
const imgIPhone1 = `${A}/05217.png`
const imgIPhone2 = `${A}/0eec3.png`
const imgIPhone3 = `${A}/46d3c.png`
const imgIPhone4 = `${A}/37af4.png`
const imgMacBook = `${A}/e1657.png`
const imgBefore = `${A}/dd632.png`
const imgBanner1 = `${A}/9b852.png`
const imgBanner2 = `${A}/24bde.png`

const imgVector4030 = `${A}/e38a0.svg`
const imgGroup9431293 = `${A}/068a4.svg`
const imgGroup9431294 = `${A}/cb558.svg`
const imgGroup9431295 = `${A}/96337.svg`
const imgVector4027 = `${A}/d6074.svg`
const imgMaskSVG = `${A}/ca3f0.svg`
const imgVector4026 = `${A}/e0b87.svg`
const imgWifiIcon = `${A}/aae1e.svg`
const imgTvIcon = `${A}/60a73.svg`
const imgDivider = `${A}/f47a9.svg`
const imgPlaceholderIcon = `${A}/13004.svg`
const imgArrowIcon = `${A}/56690.svg`
const imgTipoDeProducto = `${A}/d0bd0.svg`
const imgModoDeAislamiento1 = `${A}/4b6af.svg`
const imgVector6 = `${A}/96ed2.svg`
const imgGroup1 = `${A}/bcb75.svg`
const imgMaxLogo = `${A}/ea8f0.svg`
const imgLaligaLogo = `${A}/cbbf3.svg`
const imgIconDarkUp = `${A}/9a4ef.svg`
const imgGroup2 = `${A}/95770.svg`
const imgLinkedIn = `${A}/66af4.svg`
const imgBehance = `${A}/434ac.svg`
const imgEmail = `${A}/4864e.svg`
const imgArrow = `${A}/8177a.svg`

const gradPink = 'linear-gradient(147.96deg, rgb(210,23,114) 5.17%, rgb(235,104,56) 94.83%)'
const gradPinkBg = { backgroundImage: gradPink, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as React.CSSProperties

const Divider = () => (
  <div style={{ background: 'rgba(0,0,0,0.1)', height: '1px', width: '100%' }} />
)

function PricingCardMockup() {
  return (
    <div style={{
      border: '0.595px solid #f4f4f4',
      boxShadow: '0 2.38px 2.38px rgba(87,119,156,0.1)',
      borderRadius: '14.719px',
      overflow: 'hidden',
      width: '178px',
      flexShrink: 0,
    }}>
      <div style={{ background: '#fff', padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          <img src={imgTipoDeProducto} alt="" style={{ width: '19px', height: '18px', flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: 'Poppins', fontSize: '7.74px', color: '#575a5f', lineHeight: 1.7, margin: 0 }}>de 80 a</p>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
              <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#2b2b28', lineHeight: '24px', margin: 0 }}>120</p>
              <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11.9px', color: '#2b2b28', lineHeight: 1.7, margin: 0 }}>megas</p>
            </div>
            <p style={{ fontFamily: 'Poppins', fontSize: '7.74px', color: '#575a5f', lineHeight: 1.7, margin: 0 }}>durante 6 meses</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          <div style={{ width: '19px', display: 'flex', justifyContent: 'center' }}>
            <img src={imgModoDeAislamiento1} alt="" style={{ width: '9.5px', height: '17.9px' }} />
          </div>
          <div>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'baseline' }}>
              <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#2b2b28', lineHeight: '24px', margin: 0 }}>5</p>
              <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13.7px', color: '#2b2b28', margin: 0 }}>GB</p>
            </div>
            <p style={{ fontFamily: 'Poppins', fontSize: '7.74px', color: '#575a5f', lineHeight: 1.7, margin: 0 }}>izzi móvil</p>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'Poppins', fontSize: '11.9px', color: '#a7a7a7', textDecoration: 'line-through', lineHeight: 1.7, margin: 0 }}>$810</p>
          <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '29.76px', color: '#2b2b28', lineHeight: 1.3, margin: 0 }}>$760</p>
        </div>
        <p style={{ fontFamily: 'Poppins', fontSize: '7.74px', color: '#2b2b28', lineHeight: 1.7, margin: 0 }}>
          Incluye <strong>$50 mxn</strong> de descuento por domiciliar.
        </p>
        <button style={{
          background: '#36424b', border: '0.6px solid #2b2b28', borderRadius: '4px',
          padding: '7px 14px', color: '#fff', fontFamily: 'Poppins', fontWeight: 500,
          fontSize: '8.93px', cursor: 'pointer', width: '100%',
        }}>contratar</button>
        <img src={imgVector6} alt="" style={{ width: '100%', height: '1px' }} />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '19px', height: '12.5px', overflow: 'hidden' }}>
            <img src={imgGroup2} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '60%' }} />
            <img src={imgGroup1} alt="" style={{ position: 'absolute', bottom: 0, left: '7%', right: '1%', height: '28%' }} />
          </div>
          <img src={imgMaxLogo} alt="" style={{ height: '6px' }} />
          <img src={imgLaligaLogo} alt="" style={{ height: '7.4px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '7.74px', color: '#2b2b28', lineHeight: 1.7, margin: 0 }}>más detalles</p>
          <div style={{ transform: 'scaleY(-1)' }}>
            <img src={imgIconDarkUp} alt="" style={{ width: '9.5px', height: '9.5px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ImgPlaceholder({ label = 'Image placeholder', height = 280 }: { label?: string; height?: number }) {
  return (
    <div style={{
      height, borderRadius: '16px',
      border: '1px dashed rgba(157,116,232,0.25)',
      background: 'linear-gradient(148deg, rgba(157,116,232,0.07) 0%, rgba(212,120,176,0.05) 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
    }}>
      <img src={imgPlaceholderIcon} alt="" style={{ width: '28px', height: '28px' }} />
      <p style={{
        fontFamily: "'Plus Jakarta Sans'", fontWeight: 500, fontSize: '12px',
        color: 'rgba(157,116,232,0.5)', textTransform: 'uppercase', letterSpacing: '0.72px',
      }}>{label}</p>
    </div>
  )
}

export default function IzziCase() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#fff' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '16px 40px', display: 'flex', alignItems: 'center', gap: '12px',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <button onClick={() => navigate('/')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '14px', fontWeight: 500, color: '#0b0b0d',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <img src={imgArrow} alt="" style={{ width: '16px', transform: 'rotate(180deg)', filter: 'brightness(0)' }} />
          Back to work
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #ffe5fa 4.33%, #fbfbfb 71.15%, #fff 99.04%)',
        paddingTop: '140px', paddingBottom: '80px',
        paddingLeft: 'clamp(24px, 8vw, 160px)', paddingRight: 'clamp(24px, 8vw, 160px)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto 24px', height: '380px' }}>
          {/* Main shape bg */}
          <div style={{ position: 'absolute', top: 0, left: '93px', width: '420px', height: '480px', transform: 'rotate(0.39deg)' }}>
            <img src={imgVector4030} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          {/* Masked hero image */}
          <div style={{
            position: 'absolute', left: '-81px', top: '-12px', width: '586px', height: '319px',
            WebkitMaskImage: `url("${imgMaskSVG}")`, maskImage: `url("${imgMaskSVG}")`,
            WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
            WebkitMaskPosition: '89px 15px', maskPosition: '89px 15px',
            WebkitMaskSize: '434px 256px', maskSize: '434px 256px',
          }}>
            <img src={imgHeroBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Curves */}
          <div style={{ position: 'absolute', left: '1px', top: '114px', width: '446px', height: '256px', transform: 'scaleY(-1) rotate(180deg)' }}>
            <img src={imgVector4027} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'absolute', left: '171px', top: 0, width: '277px', height: '166px', transform: 'scaleY(-1) rotate(180deg)' }}>
            <img src={imgVector4026} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          {/* Floating card – wifi */}
          <div style={{
            position: 'absolute', left: 0, top: '78px',
            background: '#fff', borderRadius: '24px', border: '0.75px solid #d2d8e1',
            boxShadow: '0 6px 6px rgba(79,79,79,0.15)', padding: '24px', width: '123px',
          }}>
            <div style={{ width: '75px', height: '75px', position: 'relative' }}>
              <img src={imgWifiIcon} alt="" style={{ position: 'absolute', top: '8%', left: '8%', width: '84%', height: '84%' }} />
            </div>
          </div>
          {/* Floating card – tv */}
          <div style={{
            position: 'absolute', right: 0, top: '237px',
            background: '#fff', borderRadius: '24px', border: '0.75px solid #d2d8e1',
            boxShadow: '0 6px 6px rgba(79,79,79,0.15)', padding: '24px', width: '123px',
          }}>
            <div style={{ width: '75px', height: '75px', position: 'relative' }}>
              <img src={imgTvIcon} alt="" style={{ position: 'absolute', top: '18%', left: '6%', width: '88%', height: '64%' }} />
            </div>
          </div>
          {/* Dot groups */}
          <div style={{ position: 'absolute', left: '277px', top: '238px', width: '123px', height: '140px' }}>
            <img src={imgGroup9431293} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'absolute', left: '55px', top: '305px', width: '49px', height: '56px' }}>
            <img src={imgGroup9431294} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'absolute', left: '149px', top: '53px', width: '49px', height: '56px' }}>
            <img src={imgGroup9431295} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '24px', fontWeight: 400, color: '#0b0b0d', marginBottom: '8px' }}>izzi CMS</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-0.32px', lineHeight: '55.2px' }}>
              Giving marketing
            </span>
            <span style={{
              fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.32px', lineHeight: '55.2px',
              backgroundImage: 'linear-gradient(124.85deg, rgb(210,23,114) 5.17%, rgb(235,104,56) 94.83%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>
              control at scale.
            </span>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        padding: 'clamp(48px,8vw,100px) clamp(24px,8vw,160px)',
        display: 'flex', flexDirection: 'column', gap: '80px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '40px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            <p style={{ fontSize: '40px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px', lineHeight: '48px' }}>Overview</p>
            <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px', marginBottom: '0' }}>
              {"izzi's marketing site, the main channel for offers, leads, and self-service, was outdated, hard to update, and confusing on mobile."}
            </p>
            <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>
              {"What began as a visual refresh grew into a bigger mission: give marketing a CMS, remove their dependency on development, and clarify the user's path through the site."}
            </p>
          </div>
          <div style={{
            height: '280px', borderRadius: '32px', position: 'relative', overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, rgba(241,215,239,1) 0%, rgba(251,250,250,1) 100%)',
          }}>
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '318px', height: '312px' }}>
              <img src={imgIPhoneHand} alt="iPhone hand mockup" style={{
                position: 'absolute', top: 0, left: '-23%', width: '123%', height: '117%', objectFit: 'cover',
              }} />
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div style={{ display: 'flex', gap: '0', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {[
            { label: 'My role', value: 'Lead UX/UI Designer' },
            { label: 'Type of Project', value: 'End-to-end redesign' },
            { label: 'Client', value: 'izzi telecom' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && (
                <div style={{ display: 'flex', alignItems: 'stretch', width: '1px', position: 'relative' }}>
                  <img src={imgDivider} alt="" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '1px', height: '100%' }} />
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px 24px 16px', flex: '1 0 0', minWidth: '120px' }}>
                <p style={{ fontSize: '14px', color: '#6c6c6c', lineHeight: '22.4px' }}>{item.label}</p>
                <p style={{ fontSize: '20px', color: '#0b0b0d' }}>{item.value}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────── */}
      <section style={{
        background: '#f8f8f8',
        padding: 'clamp(48px,8vw,100px) clamp(24px,8vw,160px)',
        display: 'flex', flexDirection: 'column', gap: '40px',
      }}>
        <p style={{ fontSize: '40px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px', lineHeight: '48px' }}>The Problem</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          {[
            { title: 'Users', body: "Fewer than 5% completed a flow. The site felt overwhelming and pricing was inconsistent across pages." },
            { title: 'Marketing Team', body: "Every plan combo was designed in Figma, then hand-coded by devs, causing mismatched prices, missing legal text, and broken layouts. Launching an offer took 2–3 weeks." },
            { title: 'Development Team', body: "40%+ of dev time went to repetitive content updates instead of product work." },
          ].map(c => (
            <div key={c.title} style={{ background: '#f3f3f3', borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '17px', fontWeight: 700, color: '#0b0b0d', lineHeight: '25.5px' }}>{c.title}</p>
              <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE REDESIGN AT A GLANCE ─────────────────────────────────── */}
      <section style={{
        padding: 'clamp(48px,8vw,100px) clamp(24px,8vw,160px)',
        display: 'flex', flexDirection: 'column', gap: '40px',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1260 734' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(22.93 36.7 -126 26.715 630.01 367)'><stop stop-color='rgba(241,215,239,1)' offset='0'/><stop stop-color='rgba(251,250,250,1)' offset='1'/></radialGradient></defs></svg>\")",
      }}>
        <p style={{ fontSize: '40px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px', lineHeight: '48px' }}>The redesign at a glance</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
          {[imgIPhone1, imgIPhone2, imgIPhone3, imgIPhone4].map((src, i) => (
            <div key={i} style={{ flex: '1 1 160px', maxWidth: '240px', aspectRatio: '220/446', position: 'relative' }}>
              <img src={src} alt={`iPhone mockup ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── RESEARCH ─────────────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        padding: 'clamp(48px,8vw,100px) clamp(24px,8vw,160px)',
        display: 'flex', flexDirection: 'column', gap: '80px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '40px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '40px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px', lineHeight: '48px' }}>Research</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>
                  Analytics review, UX audit, and stakeholder interviews, not just on the interface, but on how offers actually got published.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Analytics review: high drop-off points', 'UX audit: visual hierarchy & CTA clarity', 'Stakeholder interviews: content publishing workflow'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', background: '#0b0b0d', borderRadius: '3px', flexShrink: 0 }} />
                    <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <ImgPlaceholder label="Research artifacts" height={280} />
          </div>
          {/* MacBook full-width */}
          <div style={{ borderRadius: '32px', overflow: 'hidden', position: 'relative', aspectRatio: '854/370', width: '100%' }}>
            <img src={imgMacBook} alt="MacBook mockup" style={{
              position: 'absolute', top: '-23.64%', left: '-10.64%', width: '120.78%', height: '185.85%', objectFit: 'cover',
            }} />
          </div>
        </div>

        <Divider />

        {/* Content model */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            padding: '40px', borderRadius: '32px',
            background: 'linear-gradient(163.64deg, rgba(157,116,232,0.08) 0%, rgba(212,120,176,0.05) 100%)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '40px', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '40px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px', lineHeight: '48px' }}>
                From design file to a content model
              </p>
              <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '28px' }}>
                Worked with developers on a Contentful setup aligned to the design system, defining content models and naming conventions.
              </p>
            </div>
            <div style={{ background: '#fff', borderRadius: '14px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{
                fontSize: '40px', fontWeight: 700, letterSpacing: '-0.6px',
                backgroundImage: 'linear-gradient(99.55deg, rgb(210,23,114) 5.17%, rgb(235,104,56) 94.83%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>40+</p>
              <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '28px' }}>
                Reusable components powering the site, each editable through structured fields with zero code.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '28px' }}>I defined four objectives to guide the redesign:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
            {[
              { n: '01', title: 'Enable autonomy through a CMS', body: 'No-code content updates for marketing' },
              { n: '02', title: 'Design through a modular system', body: 'Reusable, CMS-ready components' },
              { n: '03', title: 'Improve clarity and task completion', body: 'Restructure IA around plans and offers' },
              { n: '04', title: 'Optimize for mobile-first', body: 'Redesign with mobile as the priority platform.' },
            ].map(obj => (
              <div key={obj.n} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontSize: '20px', fontWeight: 400, ...gradPinkBg }}>{obj.n}</p>
                <p style={{ fontSize: '17px', fontWeight: 700, color: '#0b0b0d', lineHeight: '25.5px' }}>{obj.title}</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '28px' }}>{obj.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE → AFTER ───────────────────────────────────────────── */}
      <section style={{
        background: '#f8f8f8',
        padding: 'clamp(48px,8vw,100px) clamp(24px,8vw,160px)',
        display: 'flex', flexDirection: 'column', gap: '80px',
      }}>
        <p style={{ fontSize: '40px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px', lineHeight: '48px' }}>Before → After</p>

        {/* Pricing cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '32px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px' }}>Pricing cards</p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px', border: '1px solid #e5e5e5', borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
              <div style={{ height: '340px', width: '164px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <img src={imgBefore} alt="Before" style={{ position: 'absolute', height: '708.98%', width: '396.55%', top: '-291.12%', left: '-118.67%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <p style={{ fontSize: '20px', color: '#0b0b0d' }}>Before</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>
                  Fewer than 5% completed a flow. The site felt overwhelming and pricing was inconsistent across pages.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 4px' }}>
              <img src={imgArrowIcon} alt="→" style={{ width: '26px', height: '26px' }} />
            </div>
            <div style={{ flex: '1 1 280px', borderRadius: '32px', padding: '40px', background: 'linear-gradient(127.14deg, rgba(157,116,232,0.08) 0%, rgba(212,120,176,0.05) 100%)', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
              <PricingCardMockup />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <p style={{ fontSize: '20px', fontWeight: 400, backgroundImage: 'linear-gradient(146.55deg, rgb(210,23,114) 5.17%, rgb(235,104,56) 94.83%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>After</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>
                  {'Every plan combo was designed in Figma, then hand-coded by devs, causing mismatched prices, missing legal text, and broken layouts. Launching an offer took '}
                  <strong>2–3 weeks.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Promotional banners */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '32px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px' }}>Promotional banners</p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px', border: '1px solid #e5e5e5', borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
              <div style={{ width: '100%', aspectRatio: '2440/1272', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={imgBanner1} alt="Before banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <p style={{ fontSize: '20px', color: '#0b0b0d' }}>Before</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>From inconsistent, manually-built layouts</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 4px' }}>
              <img src={imgArrowIcon} alt="→" style={{ width: '26px', height: '26px' }} />
            </div>
            <div style={{ flex: '1 1 280px', borderRadius: '32px', padding: '40px', background: 'linear-gradient(140.81deg, rgba(157,116,232,0.08) 0%, rgba(212,120,176,0.05) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '32px', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
                <img src={imgBanner2} alt="After banner" style={{ width: '100%', maxWidth: '360px', borderRadius: '8px', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <p style={{ fontSize: '20px', fontWeight: 400, backgroundImage: 'linear-gradient(146.55deg, rgb(210,23,114) 5.17%, rgb(235,104,56) 94.83%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>After</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>To modular CMS-ready blocks.</p>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Navigation and task flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '32px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px' }}>Navigation and task flow</p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px', border: '1px solid #e5e5e5', borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '32px', alignItems: 'center' }}>
              <div style={{ height: '340px', width: '164px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <img src={imgBefore} alt="Before navigation" style={{ position: 'absolute', height: '708.98%', width: '396.55%', top: '-291.12%', left: '-118.67%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <p style={{ fontSize: '20px', color: '#0b0b0d' }}>Before</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>From vague categories with no pricing context</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 4px' }}>
              <img src={imgArrowIcon} alt="→" style={{ width: '26px', height: '26px' }} />
            </div>
            <div style={{ flex: '1 1 280px', borderRadius: '32px', padding: '40px', background: 'linear-gradient(129.02deg, rgba(157,116,232,0.08) 0%, rgba(212,120,176,0.05) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '32px', alignItems: 'center' }}>
              <PricingCardMockup />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <p style={{ fontSize: '20px', fontWeight: 400, backgroundImage: 'linear-gradient(146.55deg, rgb(210,23,114) 5.17%, rgb(235,104,56) 94.83%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>After</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '24px' }}>
                  A wizard flow with progressive disclosure. Scroll depth cut by over 50%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT ───────────────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        padding: 'clamp(48px,8vw,100px) clamp(24px,8vw,160px)',
        display: 'flex', flexDirection: 'column', gap: '40px',
      }}>
        <p style={{ fontSize: '40px', fontWeight: 400, color: '#0b0b0d', letterSpacing: '-1px', lineHeight: '48px' }}>Impact</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
          {[
            { n: '01', title: 'Enable autonomy through a CMS', body: 'No-code content updates for marketing' },
            { n: '02', title: 'Design through a modular system', body: 'Reusable, CMS-ready components' },
            { n: '03', title: 'Improve clarity and task completion', body: 'Restructure IA around plans and offers' },
            { n: '04', title: 'Optimize for mobile-first', body: 'Redesign with mobile as the priority platform.' },
          ].map(obj => (
            <div key={obj.n} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '20px', fontWeight: 400, ...gradPinkBg }}>{obj.n}</p>
              <p style={{ fontSize: '17px', fontWeight: 700, color: '#0b0b0d', lineHeight: '25.5px' }}>{obj.title}</p>
              <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '28px' }}>{obj.body}</p>
            </div>
          ))}
        </div>

        {/* Takeaway */}
        <div style={{ background: '#0b0b0d', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', overflow: 'hidden' }}>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#c4c4c4', textTransform: 'uppercase', letterSpacing: '2.08px', textAlign: 'center' }}>Takeaway</p>
          <div style={{ maxWidth: '720px' }}>
            <p style={{ fontSize: '32px', fontWeight: 400, color: '#fff', lineHeight: '48px', letterSpacing: '-1px' }}>
              The CMS removed a structural bottleneck between design, content, and engineering,
            </p>
            <p style={{
              fontSize: '30px', fontWeight: 700, lineHeight: '42px', letterSpacing: '-0.6px',
              backgroundImage: 'linear-gradient(132.02deg, rgb(210,23,114) 5.17%, rgb(235,104,56) 94.83%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>
              freeing developers for higher-impact product work.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section style={{
        background: '#0b0b0d',
        padding: 'clamp(48px,8vw,100px) clamp(24px,8vw,151px)',
        display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center',
      }}>
        <p style={{ fontSize: '16px', fontWeight: 500, color: '#c4c4c4', textTransform: 'uppercase', letterSpacing: '2.08px', textAlign: 'center' }}>contact</p>
        <p style={{ fontSize: 'clamp(28px,4vw,40px)', textAlign: 'center', letterSpacing: '-1px', lineHeight: '48px' }}>
          <span style={{ color: '#f8f8f8', fontWeight: 400 }}>{"Let's "}</span>
          <span style={{
            fontWeight: 700,
            backgroundImage: 'linear-gradient(143.72deg, rgb(157,116,232) 8.97%, rgb(212,120,176) 91.04%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          }}>create</span>
          <span style={{ color: '#f8f8f8', fontWeight: 400 }}>{" together"}</span>
        </p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'LinkedIn', icon: imgLinkedIn, href: 'https://www.linkedin.com/in/vaneleiry-cruz/' },
            { label: 'Behance', icon: imgBehance, href: 'https://www.behance.net/vane' },
            { label: 'Email', icon: imgEmail, href: 'mailto:vane@example.com' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '8px', height: '40px', padding: '0 16px',
              border: '0.556px solid rgba(255,255,255,0.3)', borderRadius: '100px',
              textDecoration: 'none', color: '#f2f2f4', fontSize: '14px', fontWeight: 500,
              transition: 'background 0.2s, color 0.2s',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#f2f2f4'; el.style.color = '#0b0b0d'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = '#f2f2f4'; }}
            >
              <img src={link.icon} alt="" style={{ width: '18px', height: '18px' }} />
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{
        background: '#0b0b0d', borderTop: '0.556px solid #6c6c6c',
        padding: '24px 40px 48px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 500, color: '#e2e2e2', lineHeight: '18px' }}>© 2026. Vaneleiry Cruz</p>
      </footer>
    </div>
  )
}
