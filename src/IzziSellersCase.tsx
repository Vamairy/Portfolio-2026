import React from 'react'
import { Inspectable } from './case-study/lightbox'
import { Reveal } from './case-study/motion'
import CaseStudyPage, { type CaseStudySection, type CaseStudyTheme } from './case-study/CaseStudyPage'
import {
  ApproachMoment,
  ApproachSection,
  BeforeAfter,
  BulletList,
  CaseHero,
  Divider,
  FeatureColumns,
  InsightCard,
  MetaBar,
  MetricCard,
  NumberedCard,
  RingStat,
  Section,
  SplitContent,
  TakeawayCard,
  TextBlock,
} from './case-study/components'
import './IzziSellersCase.css'

// izzi Sellers case study — source of truth: Figma "Portfolio" › case-sellers-ready (91:1562)

const A = '/assets/work/izzi-sellers'
// Same arrow as the izzi CMS case (identical Figma export)
const ARROW = '/assets/work/izzi/arrow-before-after.svg'

const theme: CaseStudyTheme = {
  accentFrom: 'rgb(210, 23, 114)',
  accentTo: 'rgb(235, 104, 56)',
  heroTop: '#fff3d9',
}

// Side navigation — ids must match the anchors below. "A gamified approach" and the
// closing showcase deliberately have no entry: Strategy / Impact stay active through them.
const sections: CaseStudySection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Design Approach' },
  { id: 'research', label: 'Research' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'before-after', label: 'Before → After' },
  { id: 'impact', label: 'Impact' },
]

// Peach radial glows exported from Figma (Overview media card, "After" cards)
const glow = (w: number, h: number, matrix: string) =>
  `url("data:image/svg+xml;utf8,<svg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(${matrix})'><stop stop-color='rgba(255,239,224,1)' offset='0'/><stop stop-color='rgba(255,255,255,1)' offset='1'/></radialGradient></defs></svg>")`
const overviewGlow = glow(450.01, 280, '8.1894 14 -45.001 10.191 225 140')
const afterGlow = glow(440.01, 584, '8.0074 29.2 -44.001 21.256 220 292')

/** Legacy screenshot, inspectable (Context + "Before" cards) */
function LegacyScreen({ src, alt, width, height, radius }: { src: string; alt: string; width: number; height: number; radius: number }) {
  return (
    <Inspectable src={src} alt={alt} width={width * 2} style={{ borderRadius: radius }}>
      <img className="sl-legacy" src={src} alt={alt} width={width} height={height} loading="lazy" />
    </Inspectable>
  )
}

/** Redesigned screen inside an "After" card */
function AfterScreen({ src, alt, width }: { src: string; alt: string; width: number }) {
  return (
    <Inspectable src={src} alt={alt} width={width * 2} style={{ borderRadius: 16 }}>
      <img className="sl-after-screen" src={src} alt={alt} width={width} height={380} loading="lazy" />
    </Inspectable>
  )
}

// ── Design Approach (Figma 129:29972) ─────────────────────────────────────────

// Accent panels exactly as in Figma (129:29977 · 129:30283 · 129:30488): a warm progression
// from the Sellers peach (the same rgb(255, 239, 224) as its glows) to pale pink and near-white.
const approachAccents = {
  progress: 'linear-gradient(198.46deg, rgb(255, 248, 242) 13.08%, rgb(255, 239, 225) 87.48%)',
  commissions: 'linear-gradient(178.32deg, rgb(255, 239, 224) 0%, rgb(254, 243, 255) 96.66%)',
  action: 'linear-gradient(124.04deg, rgb(254, 243, 255) 0%, rgb(255, 252, 255) 100%)',
}

// Line icons in the same inline-SVG language as the other Approach sections (24px grid,
// round caps, 1.15 stroke): sales progress · commission · document/action
const IconProgress = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 17a8.5 8.5 0 0 1 17 0" />
    <path d="M12 17l4.2-5.2" />
    <circle cx="12" cy="17" r="1.3" />
    <path d="M5.2 11.2l1.4 1M12 8.5v1.6M18.8 11.2l-1.4 1" />
  </svg>
)
const IconCommission = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9 15l6-6" />
    <circle cx="9.5" cy="9.5" r="1.2" />
    <circle cx="14.5" cy="14.5" r="1.2" />
  </svg>
)
const IconAction = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h5" />
    <path d="M13.5 3.5l5 5V12" />
    <path d="M13.5 3.5v5h5" />
    <path d="M8.5 12.5h5M8.5 15.5h3" />
    <path d="M15 18h5M18 15.5l2.5 2.5-2.5 2.5" />
  </svg>
)

type ApproachScreen = { src: string; alt: string; width: number }

/**
 * Two screens as composed in Figma: 56px apart, one raised 50px above the other
 * (`raised` picks which). Clean inner-screen exports; the white bezel, corners and
 * shadow are the device frame (CSS). Screen widths keep their Figma proportions.
 */
function ApproachPair({ screens: pair, raised = 0 }: { screens: [ApproachScreen, ApproachScreen]; raised?: 0 | 1 }) {
  // Figma pairs are 503.9px wide for 224px screens; narrower screens make a narrower pair
  const pairWidth = pair[0].width * 2 + 56
  return (
    <div className="sl-approach-pair" data-raised={raised} style={{ '--sl-pair-w': pairWidth / 503.9 } as React.CSSProperties}>
      {pair.map(s => (
        <Inspectable key={s.src} src={s.src} alt={s.alt} width={s.width * 2} style={{ borderRadius: 15 }}>
          <div className="sl-approach-phone" style={{ aspectRatio: `${s.width} / 480` }}>
            <img src={s.src} alt={s.alt} loading="lazy" />
          </div>
        </Inspectable>
      ))}
    </div>
  )
}

// Closing showcase (Figma 105:35647, 936.6 × 723.3): three columns of product cards at
// staggered heights. Exports carry a 38px shadow margin on every side.
const showcase = [
  { src: `${A}/showcase-left.png`, x: 0, y: 75.47, h: 572.39, alt: 'App rating card with emoji and star scale, and the home menu for sales, sellers and schedule' },
  { src: `${A}/showcase-center.png`, x: 318.71, y: 0, h: 723.33, alt: 'Monthly sales gauge, Cinta Rosa tier progress, and order details with a tracking button' },
  { src: `${A}/showcase-right.png`, x: 637.43, y: 70.37, h: 582.59, alt: 'October 2023 sales calendar and Cinta Naranja tier resources' },
]

export default function IzziSellersCase() {
  return (
    <CaseStudyPage theme={theme} sections={sections}>
      <CaseHero
        artwork={{ src: `${A}/hero-phones.png`, width: 523, height: 480, alt: 'Two phones with the redesigned izzi sellers app: the seller home menu and a tier-upgrade celebration for Cinta Naranja' }}
        eyebrow="izzi sellers app"
        highlight="Rebuilding trust"
        lead="in a sales team's daily tool"
        highlightFirst
        highlightAngle={124}
        highlightAccent={['rgb(255, 108, 7)', 'rgb(244, 126, 40)']}
      />

      {/* ── Overview ── */}
      <Section id="overview" background="#fff" gap={80} style={{ paddingTop: 80 }}>
        <SplitContent>
          <div className="cs-stack" style={{ justifyContent: 'center' }}>
            <TextBlock title="Overview">
              <p>izzi's sales team used a mobile app to check sales and commissions across kiosks and retail branches.</p>
              <p>Sales had been declining for months, and sellers didn't trust what the app showed them.</p>
            </TextBlock>
          </div>
          <div className="sl-overview-media" style={{ backgroundImage: overviewGlow }}>
            <img src={`${A}/overview-devices.png`} alt="Three phones with the redesigned sellers app: commissions, monthly sales and the seller menu" loading="lazy" />
          </div>
        </SplitContent>
        <MetaBar items={[
          { label: 'My role', value: 'UX/UI Designer' },
          { label: 'Type of Project', value: 'Mobile app redesign' },
          { label: 'Client', value: 'izzi telecom' },
        ]} />
      </Section>

      {/* ── Context ── */}
      <Section id="context" background="#f3f3f3" style={{ paddingTop: 80 }}>
        <SplitContent align="center">
          <TextBlock title="Context">
            <p>izzi's sales team relies on a mobile app to check sales and commissions across kiosks and retail branches in Mexico.</p>
            <p>Sales had been declining for months with no clear explanation, and the app meant to support sellers was becoming part of the problem.</p>
          </TextBlock>
          <Reveal className="sl-legacy-pair" stagger={120}>
            <figure>
              <LegacyScreen src={`${A}/context-sales-list-legacy.png`} alt="Legacy sales list: a dense table of order numbers, dates and cancellation statuses" width={200} height={398} radius={9} />
              <figcaption className="cs-body-muted">Sales list (Legacy)</figcaption>
            </figure>
            <figure>
              <LegacyScreen src={`${A}/context-sale-details-legacy.png`} alt="Legacy sale details: a long unstructured list of customer, package and order fields" width={200} height={398} radius={9} />
              <figcaption className="cs-body-muted">Sale details (Legacy)</figcaption>
            </figure>
          </Reveal>
        </SplitContent>
      </Section>

      {/* ── Problem ── */}
      <Section id="problem" title="Problem" background="#fbfafa">
        <div className="cs-grid-3">
          <InsightCard title="Sellers didn't trust their own numbers" body="The app showed sales and commissions, but sellers couldn't tell if the data was accurate or up to date." />
          <InsightCard title="Basic usability was broken" body="Inconsistent UI, visual clutter, and no way to recover from errors, made simple tasks harder." />
          <InsightCard title="Nothing motivated daily use" body="No recognition, no visible progress, no reason to open the app beyond checking a number." />
        </div>
      </Section>

      {/* ── Design Approach: what the redesigned app does (Figma 129:29972) ── */}
      <ApproachSection
        title="Design Approach"
        intro="Making progress visible, commissions clearer, and sales information easier to act on."
        background="#fbfafa"
        className="sl-approach"
      >
        <ApproachMoment
          icon={<IconProgress />}
          title="Turn sales progress into motivation"
          body="See monthly sales on a progress gauge, alongside the current commission tier and a monthly ranking of top sellers."
          accent={approachAccents.progress}
          visual={
            <ApproachPair screens={[
              { src: `${A}/approach-sales-progress.png`, width: 224, alt: 'Mis ventas: a monthly sales gauge at 14 sales with the Cinta amarilla tier, tabs for orders in progress, completed and cancelled, and the open sales list' },
              { src: `${A}/approach-leaderboard.png`, width: 224, alt: 'Monthly results: a first-place badge for Fernando González and a leaderboard of the month’s top sellers by sales' },
            ]} />
          }
        />
        <ApproachMoment
          side="start"
          icon={<IconCommission />}
          title="Make commissions easier to understand"
          body="See the commissions earned in a period, sale by sale, plus what each tier pays and how many sales it takes to reach it."
          accent={approachAccents.commissions}
          visual={
            <ApproachPair screens={[
              { src: `${A}/approach-commissions.png`, width: 224, alt: 'Mis comisiones: $550.00 in commissions for the period, the Cinta amarilla tier and a table of each sale’s points and commission' },
              { src: `${A}/approach-commission-tiers.png`, width: 224, alt: 'Commission tiers sheet: Cinta Amarilla up to +5% at 10 sales, Cinta Naranja up to +10% at 30, Cinta Rosa up to +20% at 60' },
            ]} />
          }
        />
        <ApproachMoment
          icon={<IconAction />}
          title="Use sales information to take action"
          body="Open a sale’s order, package and customer details, and create a business case for it with comments and supporting documents."
          accent={approachAccents.action}
          visual={
            <ApproachPair raised={1} screens={[
              { src: `${A}/approach-sale-details.png`, width: 218, alt: 'Detalle de venta: order data with account, order number, type and status, plus collapsible package and customer sections' },
              { src: `${A}/approach-business-case.png`, width: 218, alt: 'Caso de negocio: a required comment about the order, optional document uploads by photo or from the phone, and a Create business case button' },
            ]} />
          }
        />
      </ApproachSection>

      {/* ── Research → Strategy ── */}
      <Section id="research" background="#fff" gap={80}>
        <SplitContent>
          <div className="cs-stack" style={{ justifyContent: 'center', gap: 24 }}>
            <TextBlock title="Research">A survey plus a heuristic evaluation surfaced the real gaps:</TextBlock>
            <BulletList items={[
              '“I don\'t trust the commission numbers I see here”',
              '“I don\'t know how close I am to my next goal”',
              '“Nothing here makes me want to open the app”',
            ]} />
          </div>
          <div className="sl-rings">
            <RingStat value={48} label="Uses the app" />
            <RingStat value={30} label="Clarity" />
          </div>
        </SplitContent>

        <Divider />

        <div id="strategy" className="cs-stack" style={{ gap: 24 }}>
          <h2 className="cs-title">Strategy</h2>
          <Reveal className="cs-grid-2 sl-strategy" selector=".cs-card" stagger={80}>
            <NumberedCard number="01" title="Clarify sales, profits and commissions" />
            <NumberedCard number="02" title="Make selling more enjoyable" />
            <NumberedCard number="03" title="Explain the rewards program clearly" />
            <NumberedCard number="04" title="Keep the interface visually consistent" />
          </Reveal>
        </div>
      </Section>

      {/* ── A gamified approach (part of the Strategy story; no nav entry) ── */}
      <Section className="cs-section-dark sl-gamified" background="#0b0b0d" gap={24}>
        <div className="cs-stack" style={{ gap: 16 }}>
          <h2 className="cs-title">A gamified approach</h2>
          <p className="cs-body sl-on-dark">Gamification became the mechanism to hit those goals:</p>
        </div>
        <FeatureColumns
          imageWidth={203}
          imageHeight={416}
          detailWidth={406}
          items={[
            { number: '01', title: 'Feedback', body: 'Constant progress toward monthly goals', image: { src: `${A}/gamified-feedback.png`, alt: 'Monthly sales gauge showing progress toward the next goal' } },
            { number: '02', title: 'Tiers', body: 'clear commission levels with visible thresholds', image: { src: `${A}/gamified-tiers.png`, alt: 'Tier sheet: Cinta Amarilla, Naranja and Rosa with commission rates and the sales needed for each' } },
            { number: '03', title: 'Badges and leaderboards', body: 'Monthly recognition for top performers', image: { src: `${A}/gamified-leaderboard.png`, alt: 'First-place badge for the month and a leaderboard of top sellers' } },
          ]}
        />
      </Section>

      {/* ── Before → After ── */}
      <Section id="before-after" background="#f8f8f8" gap={80}>
        <div className="cs-stack sl-ba" style={{ gap: 40 }}>
          <h2 className="cs-title">Before → After</h2>
          <BeforeAfter
            title="Sales and commissions"
            arrow={ARROW}
            before={{
              media: <LegacyScreen src={`${A}/sales-before.png`} alt="Legacy sales list with cramped rows and unclear statuses" width={191} height={380} radius={8} />,
              text: 'Scattered data, unclear commission logic.',
            }}
            after={{
              media: <AfterScreen src={`${A}/sales-after.png`} alt="Redesigned sales screen with a monthly progress gauge, tier status and open sales" width={177} />,
              text: 'Clear progress ring, commission breakdown, tier status.',
            }}
          />
        </div>

        <Divider />

        <div className="sl-ba">
          <BeforeAfter
            title="Sale details"
            arrow={ARROW}
            before={{
              media: <LegacyScreen src={`${A}/details-before.png`} alt="Legacy sale details as one long list of fields" width={191} height={380} radius={8} />,
              text: 'Scattered information with no clear hierarchy.',
            }}
            after={{
              media: <AfterScreen src={`${A}/details-after.png`} alt="Redesigned sale details grouped into collapsible sections for order, package and customer" width={172} />,
              text: 'Key details organized into clear, scannable sections.',
            }}
          />
        </div>
      </Section>

      {/* ── Impact (+ Takeaway), closing with the product showcase ── */}
      <Section id="impact" title="Impact" background="#fff">
        <Reveal selector=".cs-card, .cs-takeaway" stagger={80}>
          <SplitContent>
            <div className="cs-stack" style={{ gap: 16 }}>
              <MetricCard value="+28%" label="App usage" />
              <MetricCard value="+20%" label="Clarity on commissions within first weeks" />
            </div>
            <TakeawayCard label="Takeaway">
              Sellers didn't need a fancier app. They needed to trust the numbers and feel recognized. Gamification worked because it was built on fixed usability, not instead of it.
            </TakeawayCard>
          </SplitContent>
        </Reveal>

        <div className="sl-showcase-scroll">
          <Reveal className="sl-showcase" selector=".sl-showcase-col" stagger={110}>
            {showcase.map(col => (
              <img
                key={col.src}
                className="sl-showcase-col"
                src={col.src}
                alt={col.alt}
                loading="lazy"
                style={{
                  left: `${((col.x - 38.15) / 936.63) * 100}%`,
                  top: `${((col.y - 38.15) / 723.33) * 100}%`,
                  width: `${(375.5 / 936.63) * 100}%`,
                  height: `${((col.h + 76.3) / 723.33) * 100}%`,
                }}
              />
            ))}
          </Reveal>
        </div>
      </Section>

      <style>{`.sl-ba .cs-ba-after { background-image: ${afterGlow}; background-size: 100% 100%; }`}</style>
    </CaseStudyPage>
  )
}
