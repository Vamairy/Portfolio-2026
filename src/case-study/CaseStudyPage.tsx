import React, { useEffect } from 'react'
import SiteNav from '../components/SiteNav'
import { BackToTop, CaseStudySideNav, FloatingBackToWork, type CaseStudySection } from './navigation'
import './case-study.css'

export { BackToWork, type CaseStudySection } from './navigation'

export type CaseStudyTheme = {
  /** Gradient used for highlighted words, metrics and numbers */
  accentFrom: string
  accentTo: string
  /** Soft tint behind highlight panels and "After" cards */
  tintFrom?: string
  tintTo?: string
  /** Radial glow used behind media cards and showcase sections */
  glow?: string
  glowBase?: string
  /** Top color of the hero's vertical gradient */
  heroTop?: string
}

function themeVars(theme?: CaseStudyTheme): React.CSSProperties | undefined {
  if (!theme) return undefined
  const vars: Record<string, string | undefined> = {
    '--cs-accent-from': theme.accentFrom,
    '--cs-accent-to': theme.accentTo,
    '--cs-tint-from': theme.tintFrom,
    '--cs-tint-to': theme.tintTo,
    '--cs-glow': theme.glow,
    '--cs-glow-base': theme.glowBase,
    '--cs-hero-top': theme.heroTop,
  }
  return Object.fromEntries(Object.entries(vars).filter(([, v]) => v)) as React.CSSProperties
}

/**
 * Page shell for every case study: global nav, side "Now viewing" navigation
 * (when `sections` is given), floating controls and footer.
 */
export default function CaseStudyPage({ theme, sections, children }: {
  theme?: CaseStudyTheme
  /** Major sections for the side navigation, in page order (ids must exist on the page) */
  sections?: CaseStudySection[]
  children: React.ReactNode
}) {
  // Light canvas + standard scrollbar while a case study is mounted (see .cs-root in case-study.css)
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('cs-root')
    return () => root.classList.remove('cs-root')
  }, [])

  return (
    <div className="cs-page" style={themeVars(theme)} data-sidenav={sections?.length ? '' : undefined}>
      <SiteNav active="work" adaptive />
      <main className="cs-main">
        {sections?.length ? <CaseStudySideNav sections={sections} /> : null}
        {children}
      </main>
      <footer className="cs-footer">© 2026. Vaneleiry Cruz</footer>
      <FloatingBackToWork />
      <BackToTop />
    </div>
  )
}
