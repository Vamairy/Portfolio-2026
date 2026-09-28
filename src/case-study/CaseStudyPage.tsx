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
  /** Full hero background, when a project's hero isn't the default vertical fade */
  heroBackground?: string
  /** One gradient direction for all accent text (overrides per-layer angles), in degrees */
  accentAngle?: number
  /** Accent gradient color-stop positions, e.g. ['17.9%', '76.9%'] */
  accentStops?: [string, string]
  /** Outline color for cards and "Before" panels */
  border?: string
  /** Direction (degrees) and first stop of the "After" panel tint */
  tintAngle?: number
  tintStart?: string
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
    '--cs-hero-bg': theme.heroBackground,
    '--cs-accent-angle': theme.accentAngle !== undefined ? `${theme.accentAngle}deg` : undefined,
    '--cs-accent-start': theme.accentStops?.[0],
    '--cs-accent-end': theme.accentStops?.[1],
    '--cs-border': theme.border,
    '--cs-tint-angle': theme.tintAngle !== undefined ? `${theme.tintAngle}deg` : undefined,
    '--cs-tint-start': theme.tintStart,
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
      <footer className="cs-footer"><p className="footer-signature">Designed by me with Figma, Claude & questionable sleeping hours. © 2026</p></footer>
      <FloatingBackToWork />
      <BackToTop />
    </div>
  )
}
