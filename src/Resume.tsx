// ── Data ──────────────────────────────────────────────────────────────────────
const experiences = [
  {
    date: '2025 — Present',
    role: 'Lead UX/UI Designer',
    company: 'Rotoplas',
    current: true,
    description:
      'Leading end-to-end UX across mobile and web products, managing 3 UX designers and translating research, data and complex requirements into product decisions.',
    metrics: [
      { value: '5 min → 2 min', label: 'IoT setup' },
      { value: '9 min → 3 min', label: 'Sensor sync' },
    ],
  },
  {
    date: '2025',
    role: 'Senior UX/UI Designer',
    company: 'NEXU',
    current: false,
    description:
      'First product designer on the team, establishing UX guidelines, optimizing customer and agent workflows, and introducing AI-assisted design processes.',
    metrics: [{ value: '10 min → <4 min', label: 'Risk video-verification call' }],
  },
  {
    date: '2021 — 2025',
    role: 'Senior UX/UI Designer / UX/UI Designer',
    company: 'Orium',
    current: false,
    description:
      'Led and designed B2B and B2C experiences across telecom, subscriptions, service management and e-commerce, collaborating with cross-functional teams and contributing to scalable design systems.',
    metrics: [
      { value: '2 wks → <1h', label: 'izzi CMS publishing time · 2.7M monthly visits' },
      { value: '48% → 76%', label: 'izzi Sellers app adoption' },
      { value: '+25%', label: 'sales growth alongside adoption improvement' },
      { value: '2.6×', label: 'Bebbia subscription conversion' },
      { value: '20% → 8%', label: 'Bebbia churn rate' },
    ],
  },
  {
    date: '2020 — 2021',
    role: 'UX/UI Designer',
    company: 'Mobbiefects',
    current: false,
    description:
      'Designed digital products, websites, landing pages, animations and campaign experiences for 20+ startups.',
    metrics: [{ value: '+60%', label: 'iVentas CRM engagement' }],
  },
]

const capabilities = [
  {
    group: 'Design',
    items: [
      'Interaction Design',
      'User Flows & Customer Journeys',
      'Information Architecture',
      'Wireframing & High-Fidelity Design',
      'Prototyping',
      'Cross-Platform Design',
    ],
  },
  {
    group: 'Research & Strategy',
    items: ['User Research', 'Usability Testing', 'Data-Informed Design', 'Design Systems'],
  },
  {
    group: 'Tech & AI',
    items: [
      'AI-Assisted Design Workflows',
      'Code-Based Prototyping',
      'HTML / CSS',
      'Figma · ProtoPie',
      'Google Analytics · Hotjar',
    ],
  },
]

const education = [
  {
    title: 'B.A. in Design & Visual Communication',
    sub: 'Universidad Nacional Autónoma de México (UNAM)',
    year: '2019',
  },
  { title: 'Brand Management', sub: 'Florence, Italy', year: '2024' },
  { title: 'Scrum Master & Agile Methodologies', year: '2023' },
  { title: 'Diploma in Design & Web Development', year: '2022' },
  { title: 'Full Stack Web Development', year: '2021' },
]

const languages = [
  { name: 'Spanish', level: 'Native' },
  { name: 'English', level: 'B2+' },
  { name: 'Italian', level: 'B2' },
]

const SKILLS = ['Product Design', 'UX Strategy', 'Design Systems', 'Research', 'AI-assisted workflows']
const NAV_LINKS = ['Work', 'About', 'Resume', 'Contact']

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <>
      <div className="topline" />
      <nav
        style={{
          position: 'fixed', top: 2, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', height: 54,
          background: 'rgba(10,10,13,0.5)',
          backdropFilter: 'blur(28px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.04em', color: '#f2f2f4', textTransform: 'uppercase' }}>
            Vane Cruz
          </span>
        </a>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 32 }}>
          {NAV_LINKS.map(link => {
            const isActive = link === 'Resume'
            const href =
              link === 'Work' ? '/#work' :
              link === 'Contact' ? '/#contact' :
              link === 'Resume' ? '/resume' : '/'
            return (
              <a
                key={link}
                href={href}
                style={{
                  textDecoration: 'none', position: 'relative',
                  fontSize: 13, fontWeight: 500,
                  color: isActive ? '#f2f2f4' : 'rgba(242,242,244,0.45)',
                  transition: 'color 0.2s', paddingBottom: 4,
                }}
              >
                {link}
                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: '50%', background: '#f2f2f4',
                  }} />
                )}
              </a>
            )
          })}
        </div>

        <a
          href="mailto:vane@email.com"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 700, color: '#f2f2f4',
            textDecoration: 'none', padding: '7px 14px', borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.2)', transition: 'border-color 0.2s',
          }}
        >
          Let's talk
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </nav>
    </>
  )
}

// ── Resume page ───────────────────────────────────────────────────────────────
export default function Resume() {
  return (
    <div style={{ background: '#0c0c0f', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <Nav />

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '46vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          overflow: 'hidden',
          paddingTop: 100, paddingBottom: 64,
        }}
      >
        {/* Orbs */}
        <div aria-hidden style={{
          position: 'absolute', width: '48%', height: '200%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(88,38,185,0.16) 0%, transparent 70%)',
          filter: 'blur(90px)', top: '-60%', left: '-14%', pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', width: '42%', height: '200%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(28,72,185,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)', top: '-50%', right: '-10%', pointerEvents: 'none',
        }} />
        <div className="grain" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto', padding: '0 28px' }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(242,242,244,0.28)', marginBottom: 20,
          }}>
            Resume / Experience
          </p>

          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 54px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.08,
            color: '#f2f2f4', marginBottom: 18,
          }}>
            6+ years designing digital<br />
            products that drive{' '}
            <span className="text-gradient-violet">impact.</span>
          </h1>

          <p style={{
            fontSize: 14, fontWeight: 400, lineHeight: 1.72,
            color: 'rgba(242,242,244,0.42)', maxWidth: 580, marginBottom: 28,
          }}>
            Product Designer working across complex B2C and B2B products, combining
            research, data, systems thinking and design to turn complex problems
            into meaningful digital experiences.
          </p>

          {/* Skill pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 30 }}>
            {SKILLS.map(skill => (
              <span
                key={skill}
                style={{
                  padding: '7px 14px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.048)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.01em',
                  color: 'rgba(242,242,244,0.48)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Download CTA */}
          <a
            href="#"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 12, fontWeight: 700, color: 'rgba(242,242,244,0.65)',
              textDecoration: 'none', padding: '8px 16px', borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.16)', transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f2f2f4'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,242,244,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
          >
            Download résumé
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 28px 96px' }}>
          <h2 style={{
            fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1, color: '#f2f2f4', marginBottom: 64,
          }}>
            Experience
          </h2>

          {experiences.map((exp, idx) => (
            <div
              key={exp.company + exp.date}
              className="resume-exp-row"
              style={{
                paddingTop: idx === 0 ? 0 : 56,
                paddingBottom: 56,
                borderBottom: idx < experiences.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Date */}
              <div style={{ paddingTop: 3 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1.6,
                  color: exp.current ? 'rgba(157,116,232,0.85)' : 'rgba(242,242,244,0.3)',
                  display: 'block', whiteSpace: 'nowrap',
                }}>
                  {exp.date}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 style={{
                  fontSize: exp.current ? 'clamp(18px, 2.2vw, 26px)' : 'clamp(15px, 1.8vw, 22px)',
                  fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2,
                  color: '#f2f2f4', marginBottom: 5,
                }}>
                  {exp.role}
                </h3>
                <p style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'rgba(242,242,244,0.35)',
                  marginBottom: 14,
                }}>
                  {exp.company}
                </p>
                <p style={{
                  fontSize: 13, fontWeight: 400, lineHeight: 1.72,
                  color: 'rgba(242,242,244,0.45)',
                  maxWidth: 560, marginBottom: exp.metrics.length > 0 ? 28 : 0,
                }}>
                  {exp.description}
                </p>

                {/* Metrics */}
                {exp.metrics.length > 0 && (
                  <div>
                    <p style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: 'rgba(242,242,244,0.2)',
                      marginBottom: 14,
                    }}>
                      Selected impact
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 36px' }}>
                      {exp.metrics.map(m => (
                        <div key={m.label}>
                          <div style={{
                            fontSize: exp.current ? 'clamp(16px, 1.8vw, 22px)' : 'clamp(14px, 1.6vw, 18px)',
                            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15,
                            marginBottom: 4,
                          }}>
                            {exp.current
                              ? <span className="text-gradient-violet">{m.value}</span>
                              : <span style={{ color: 'rgba(242,242,244,0.82)' }}>{m.value}</span>
                            }
                          </div>
                          <div style={{
                            fontSize: 10, fontWeight: 500, lineHeight: 1.45,
                            color: 'rgba(242,242,244,0.3)', maxWidth: 180,
                          }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPABILITIES ────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 28px 96px' }}>
          <h2 style={{
            fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1, color: '#f2f2f4', marginBottom: 64,
          }}>
            Capabilities
          </h2>

          <div className="resume-caps-grid">
            {capabilities.map(cap => (
              <div key={cap.group}>
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'rgba(242,242,244,0.28)',
                  marginBottom: 22,
                }}>
                  {cap.group}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cap.items.map((item, i) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 14, fontWeight: 500, lineHeight: 1.5,
                        color: 'rgba(242,242,244,0.7)',
                        paddingBottom: 11, marginBottom: 11,
                        borderBottom: i < cap.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION + LANGUAGES ───────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 28px 96px' }}>
          <div className="resume-edu-grid">
            {/* Education */}
            <div>
              <p style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(242,242,244,0.28)',
                marginBottom: 28,
              }}>
                Education
              </p>
              {education.map((edu, idx) => (
                <div
                  key={edu.title}
                  style={{
                    paddingBottom: 20, marginBottom: 20,
                    borderBottom: idx < education.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                    <p style={{
                      fontSize: 14, fontWeight: 600, color: '#f2f2f4',
                      lineHeight: 1.3, letterSpacing: '-0.01em',
                    }}>
                      {edu.title}
                    </p>
                    <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(242,242,244,0.3)', flexShrink: 0 }}>
                      {edu.year}
                    </span>
                  </div>
                  {edu.sub && (
                    <p style={{ fontSize: 11, color: 'rgba(242,242,244,0.32)', marginTop: 3 }}>
                      {edu.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <p style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(242,242,244,0.28)',
                marginBottom: 28,
              }}>
                Languages
              </p>
              {languages.map((lang, idx) => (
                <div
                  key={lang.name}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    paddingBottom: 20, marginBottom: 20,
                    borderBottom: idx < languages.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#f2f2f4', letterSpacing: '-0.01em' }}>
                    {lang.name}
                  </p>
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(242,242,244,0.3)' }}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: '56px 28px 72px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          maxWidth: 1480, margin: '0 auto',
          flexWrap: 'wrap', gap: 24,
        }}
      >
        <div>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(242,242,244,0.22)', marginBottom: 12,
          }}>
            Let's Connect
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 3.4vw, 46px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1, color: '#f2f2f4', marginBottom: 12,
          }}>
            Let's connect.
          </h2>
          <p style={{ fontSize: 13, fontWeight: 400, color: 'rgba(242,242,244,0.38)', letterSpacing: '0.01em' }}>
            Open to new opportunities and collaborations.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 4 }}>
          {[
            { label: 'Email', href: 'mailto:vane@email.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
            { label: 'Behance', href: 'https://behance.net' },
          ].map((link, i, arr) => (
            <span key={link.label} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
                style={{ fontSize: 13, fontWeight: 600, color: 'rgba(242,242,244,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f2f2f4')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,242,244,0.5)')}
              >
                {link.label}
              </a>
              {i < arr.length - 1 && <div style={{ width: 1, height: 13, background: 'rgba(255,255,255,0.1)' }} />}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
