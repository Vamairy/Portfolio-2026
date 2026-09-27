import React from 'react'
import { Inspectable } from './case-study/lightbox'
import { Reveal } from './case-study/motion'
import CaseStudyPage, { type CaseStudySection, type CaseStudyTheme } from './case-study/CaseStudyPage'
import {
  ApproachMoment,
  ApproachSection,
  BeforeAfter,
  CaseHero,
  Divider,
  GradientText,
  InsightCard,
  MetaBar,
  QuoteCard,
  Section,
  SplitContent,
  TakeawayCard,
  TextBlock,
} from './case-study/components'
import './MiFidelidadCase.css'

// Mi Fidelidad church donations app case study. Story and copy: the approved case narrative;
// product screens and research material: Figma "Portfolio" › old Mi Fidelidad case (123:40558).

const A = '/assets/work/mi-fidelidad'

// Deep aqua from the app's Aqua tokens (Secondary08 #316e7a → Primary03 #3e8391), used only
// for highlighted text. Warmth comes from the product's own butter → pale-aqua surface gradient.
const theme: CaseStudyTheme = {
  accentFrom: '#245f6b',
  accentTo: '#3e8391',
  accentAngle: 100,
  tintFrom: 'rgba(250, 234, 196, 0.55)',
  tintTo: 'rgba(214, 236, 241, 0.6)',
  tintAngle: 135,
  heroBackground: 'radial-gradient(60% 70% at 18% 0%, #fbeccb 0%, rgba(251, 236, 203, 0) 70%), radial-gradient(55% 65% at 88% 12%, #d5ecf1 0%, rgba(213, 236, 241, 0) 70%), linear-gradient(180deg, #fdfaf3 0%, #fbfcfc 62%, #fff 100%)',
}

// Design Approach accent panels: one continuous progression down the section, built from the
// two colors of the Figma accents (129:33272): aqua rgb(92, 205, 238) and butter rgb(255, 219, 153),
// at low opacity on white. Each panel ends on the exact tint the next one starts with:
// aqua → aqua · white · butter → butter.
const aqua = (a: number) => `rgba(92, 205, 238, ${a})`
const butter = (a: number) => `rgba(255, 219, 153, ${a})`
const approachAccents = {
  church: `linear-gradient(180deg, ${aqua(0.24)} 0%, ${aqua(0.14)} 100%), #fff`,
  tithe: `linear-gradient(180deg, ${aqua(0.14)} 0%, rgba(255, 255, 255, 0) 50%, ${butter(0.18)} 100%), #fff`,
  history: `linear-gradient(180deg, ${butter(0.18)} 0%, ${butter(0.3)} 100%), #fff`,
}

// Side navigation — ids must match the anchors below
const sections: CaseStudySection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Design Approach' },
  { id: 'research', label: 'Research' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'before-after', label: 'Before & After' },
  { id: 'impact', label: 'Impact' },
]

// Redesigned screens (Figma 123:41686, 123:41952, 123:41964, 123:41969, 123:41691)
const screens = {
  home: { src: `${A}/home-after.png`, alt: 'Redesigned Mi Fidelidad home: an illustrated welcome, the member’s church, a button to the virtual offering box and the latest donation' },
  church: { src: `${A}/church.png`, alt: 'Redesigned church selection: choose a union, search for a church and save the selection' },
  donation: { src: `${A}/donation-after.png`, alt: 'Redesigned donation form: amounts for tithe, offerings, special offering and maintenance, with the running total above the send button' },
  receipt: { src: `${A}/receipt.png`, alt: 'Redesigned donation receipt: a confirmation message, the total and an itemized breakdown by category' },
  menu: { src: `${A}/menu-after.png`, alt: 'Redesigned side menu with an icon beside every item' },
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroArtwork() {
  return (
    <div className="mf-hero-art" role="img" aria-label="Mi Fidelidad on several phones: the splash screen with the app logo, donation history and an empty history state">
      <img src={`${A}/hero-devices.jpg`} alt="" width={2400} height={1599} />
    </div>
  )
}

// ── Approach ──────────────────────────────────────────────────────────────────

// Line icons in the portfolio's inline-SVG language (24px grid, round caps), drawn at the
// weight of the Figma placeholder icon: church · giving · history
const IconChurch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5v4M10 4.5h4" />
    <path d="M5.5 21.5v-9L12 7l6.5 5.5v9" />
    <path d="M3 21.5h18" />
    <path d="M10 21.5v-3.5a2 2 0 0 1 4 0v3.5" />
  </svg>
)
const IconGiving = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14.5" cy="7" r="3.5" />
    <path d="M2.5 13.5h3v8h-3z" />
    <path d="M5.5 14.5h3.2l2.8 1.8h2.6a1.6 1.6 0 0 1 0 3.2H10" />
    <path d="M5.5 20.5h8.2l6-3.3a1.6 1.6 0 0 0-1.5-2.8l-3.4 1.6" />
  </svg>
)
const IconHistory = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5" />
    <path d="M3.5 3.5v5h5" />
    <path d="M12 7.5V12l3.5 2" />
  </svg>
)

type ApproachScreen = { src: string; alt: string; inspect?: boolean }

/**
 * Two framed screens as composed in Figma: 220px screens 56px apart, one raised 49px
 * above the other (`raised` picks which). Sizes are proportional to the visual column.
 */
function ApproachPair({ screens: pair, raised = 0 }: { screens: [ApproachScreen, ApproachScreen]; raised?: 0 | 1 }) {
  return (
    <div className="mf-approach-pair" data-raised={raised}>
      {pair.map(s => {
        const phone = <div className="mf-approach-phone"><img src={s.src} alt={s.alt} loading="lazy" /></div>
        return s.inspect === false
          ? <React.Fragment key={s.src}>{phone}</React.Fragment>
          : <Inspectable key={s.src} src={s.src} alt={s.alt} width={420} style={{ borderRadius: 17 }}>{phone}</Inspectable>
      })}
    </div>
  )
}

// ── Research → Strategy ───────────────────────────────────────────────────────

type Principle = {
  origin: 'Research finding' | 'Design evaluation'
  source: string
  title: string
  consequence: string
}

const principles: Principle[] = [
  {
    origin: 'Research finding',
    source: 'Smartphone as the main device',
    title: 'Mobile-first',
    consequence: 'Mobile layouts designed around the primary device.',
  },
  {
    origin: 'Research finding',
    source: 'Trust & fear of change',
    title: 'Familiar and recognizable',
    consequence: 'Friendly typography, recognizable icons and familiar interaction patterns.',
  },
  {
    origin: 'Research finding',
    source: 'Need for transparency around donations',
    title: 'Trust & transparency',
    consequence: 'Clear category amounts, a running total and an itemized receipt.',
  },
  {
    origin: 'Design evaluation',
    source: 'Visual clutter',
    title: 'Reduce noise',
    consequence: 'Simplified hierarchy and a clearer Home screen.',
  },
]

/** The principle → the finding behind it → what it visibly changed in the UI */
function PrincipleLedger() {
  return (
    <Reveal as="ol" className="mf-ledger" selector=".mf-ledger-row" stagger={90}>
      {principles.map(p => (
        // Each value carries its own label, in the same treatment as the My role metadata
        <li key={p.title} className="mf-ledger-row">
          <div className="mf-ledger-cell">
            <p className="cs-body-muted">Principle</p>
            <h3 className="cs-subtitle">{p.title}</h3>
          </div>
          <div className="mf-ledger-cell">
            <p className="cs-body-muted">{p.origin}</p>
            <p className="cs-body">{p.source}</p>
          </div>
          <div className="mf-ledger-cell">
            <p className="cs-body-muted">UI decision</p>
            <p className="cs-body">{p.consequence}</p>
          </div>
        </li>
      ))}
    </Reveal>
  )
}

// ── Before & After ────────────────────────────────────────────────────────────

type Screen = { src: string; alt: string; inspect?: boolean; className?: string }

/** Framed phone screens; each opens in the lightbox unless `inspect` is false */
function Phones({ items, className }: { items: Screen[]; className?: string }) {
  return (
    <div className={['mf-phones', className].filter(Boolean).join(' ')}>
      {items.map(s => {
        const frame = <div className={['mf-phone', s.className].filter(Boolean).join(' ')}><img src={s.src} alt={s.alt} loading="lazy" /></div>
        const phone = s.inspect === false
          ? frame
          : <Inspectable src={s.src} alt={s.alt} width={420} style={{ borderRadius: 24 }}>{frame}</Inspectable>
        return <React.Fragment key={s.src}>{phone}</React.Fragment>
      })}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MiFidelidadCase() {
  return (
    <CaseStudyPage theme={theme} sections={sections}>
      <CaseHero
        media={<HeroArtwork />}
        gap={56}
        eyebrow="Mi Fidelidad"
        lead="Giving churchgoers a"
        highlight="clearer, more trustworthy way to donate."
      />

      {/* ── Overview ── */}
      <Section id="overview" background="#fff" gap={80} style={{ paddingTop: 80 }}>
        <SplitContent align="start">
          <TextBlock title="Overview">
            <p>Mi Fidelidad is an app built to make it easier for churchgoers to donate. After the pandemic, fewer attendees carried cash, and the church wanted a way to support giving directly from a phone.</p>
            <p>I joined once core flows already existed, to elevate the visual design and refine key interactions. The research had already been conducted by the UX team; I reviewed and synthesized it to guide the redesign.</p>
          </TextBlock>
          {/* Project phases (Figma 123:40616): where my participation began */}
          <Reveal as="ol" className="mf-phases" selector=".mf-phase" stagger={120}>
            <li className="mf-phase">
              <p className="mf-phase-step">Stage 01</p>
              <p className="cs-subtitle">Preliminary design</p>
              <p className="cs-body-muted">Core flows designed and user research conducted by the UX team.</p>
            </li>
            <li className="mf-phase mf-phase-current">
              <GradientText as="p" className="mf-phase-step">Stage 02 · where I joined</GradientText>
              <p className="cs-subtitle">Optimization</p>
              <p className="cs-body-muted">Visual redesign and interaction refinements, grounded in the team's existing research.</p>
            </li>
          </Reveal>
        </SplitContent>
        <MetaBar items={[
          { label: 'My role', value: 'UX/UI Designer' },
          { label: 'Type of Project', value: 'Visual and interaction redesign' },
          { label: 'Client', value: 'Seventh-day Adventist Church' },
        ]} />
      </Section>

      {/* ── Context ── */}
      <Section id="context" background="#f3f3f3" style={{ paddingTop: 80 }}>
        <div className="mf-context">
          <TextBlock title="Context">
            The app serves the church's attendees. The community skews slightly female, and two age groups were the team's priority: 25 to 45, and 46 to 65.
          </TextBlock>
          {/* Attendee statistics (Figma 123:40880) */}
          {/* Outlined variant of the shared card (cs-card-outline): same tokens as the Problem cards, no fill */}
          <Reveal className="mf-context-stats" selector=".cs-card" stagger={140}>
            <div className="cs-card cs-card-outline mf-context-stat">
              <GradientText as="p" className="mf-context-value">56%</GradientText>
              <p className="mf-context-label">of attendees are women</p>
            </div>
            <div className="cs-card cs-card-outline mf-context-stat">
              <GradientText as="p" className="mf-context-value">58%</GradientText>
              <p className="mf-context-label">are aged 25 to 65, the two priority groups</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Problem: the shared filled card (as in izzi), title + description only ── */}
      <Section id="problem" title="Problem" background="#fbfafa">
        <Reveal className="cs-grid-3" selector=".cs-card" stagger={80}>
          <InsightCard title="Donations felt impersonal" body="The existing flows worked, but didn't reflect the church's brand or feel trustworthy." />
          <InsightCard title="Users didn't know where their money went" body="People wanted to confirm their donation reached the right place before confirming." />
          <InsightCard title="The visual language didn't match the audience" body="Inconsistent icon use made the app feel like any transactional form." />
        </Reveal>
      </Section>

      {/* ── Design Approach: what the redesigned experience does (Figma 129:33234) ── */}
      <ApproachSection
        title="Design Approach"
        intro="Making digital giving clearer, more transparent, and easier to trust."
        background="#fbfafa"
        className="mf-approach"
      >
        <ApproachMoment
          icon={<IconChurch />}
          title="Choose where to give"
          body="Find and select the church that will receive the donation."
          accent={approachAccents.church}
          visual={
            <ApproachPair screens={[
              { src: `${A}/approach-account.png`, alt: 'Mi Fidelidad account creation: personal details and account data under “Adora con tu generosidad”' },
              { src: `${A}/approach-church.png`, alt: 'Mi Fidelidad church selection: choose a union, search for a church and save the selection' },
            ]} />
          }
        />
        <ApproachMoment
          side="start"
          icon={<IconGiving />}
          title="Tithe with confidence"
          body="See exactly how each amount is allocated before confirming."
          accent={approachAccents.tithe}
          visual={
            <ApproachPair screens={[
              { src: `${A}/approach-donation.png`, alt: 'Mi Fidelidad donation form: amounts for tithe, offerings, special offering and maintenance, with the total above the send button' },
              // Presentation size only: the receipt's placeholder amounts aren't meant for close reading
              { src: `${A}/approach-receipt.png`, alt: 'Mi Fidelidad donation receipt: a confirmation message, the total and a breakdown by category', inspect: false },
            ]} />
          }
        />
        <ApproachMoment
          icon={<IconHistory />}
          title="Keep track of every donation"
          body="Review previous donations and keep a clear record of where your contributions went."
          accent={approachAccents.history}
          visual={
            <ApproachPair raised={1} screens={[
              { src: `${A}/approach-history.png`, alt: 'Mi Fidelidad donation history: donations grouped by month, each with its church, amount and categories' },
              { src: `${A}/approach-billing.png`, alt: 'Mi Fidelidad billing details screen, where invoice information is added' },
            ]} />
          }
        />
      </ApproachSection>

      {/* ── Research ── */}
      <Section id="research" background="#fff" gap={64}>
        <SplitContent align="center">
          <TextBlock title="Research">
            <p>I reviewed the UX team's interviews with the two main attendee groups and their journey map, then synthesized the findings that would shape the redesign.</p>
          </TextBlock>
          {/* The one verbatim interview quote (Figma 123:40955) */}
          <QuoteCard
            className="mf-pullquote"
            quote="Yes, through an app, it would be easier… although I'd feel insecure about the payments being processed correctly.”"
          />
        </SplitContent>

        <div className="cs-stack" style={{ gap: 24 }}>
          <h3 className="cs-subtitle">Key findings</h3>
          {/* Synthesized from the team's insights (123:41144), interview notes (123:40920, 123:40955) and journey map (123:40990) */}
          <Reveal className="cs-grid-2 mf-findings" selector=".cs-card" stagger={90}>
            <InsightCard
              title="Trust & fear of change"
              body="Attendees wanted giving to feel secure and familiar. New ways of paying raised distrust and a fear of change."
              note="From the team's insights and interviews"
            />
            <InsightCard
              title="Donation habits"
              body="Tithing is often a habit inherited from parents, and also an act of gratitude and a way to sustain the church."
              note="From interviews"
            />
            <InsightCard
              title="Transparency"
              body="Donors wanted to know their money reaches the right place, and how it is used."
              note="From the team's insights and journey map"
            />
            <InsightCard
              title="Smartphone usage"
              body="The phone is their main device for everything, and giving through an app would mean no longer carrying cash."
              note="From the team's insights and interviews"
            />
          </Reveal>
        </div>
      </Section>

      {/* ── Strategy: finding → principle → visible UI consequence ── */}
      <Section id="strategy" background="#fbfafa" gap={48}>
        <div className="mf-strategy-intro">
          <TextBlock title="Strategy">
            Research findings and design evaluation shaped four principles for the redesign.
          </TextBlock>
        </div>
        <PrincipleLedger />
      </Section>

      {/* ── Before & After ── */}
      <Section id="before-after" title="Before & After" background="#f8f8f8" gap={80}>
        <div id="ba-visual">
          <BeforeAfter
            title="Visual identity & product clarity"
            arrow={`${A}/arrow-before-after.svg`}
            before={{
              // Figma 123:41421, 123:41425 (initial design)
              media: <Phones items={[
                { src: `${A}/home-before.png`, alt: 'Original Mi Fidelidad home: a plain greeting, the assigned church and the latest donation' },
                { src: `${A}/menu-before.png`, alt: 'Original side menu with text-only items', className: 'mf-phone-secondary' },
              ]} />,
              text: 'Plain screens with a flat hierarchy and a text-only menu.',
            }}
            after={{
              media: <Phones items={[screens.home, { ...screens.menu, className: 'mf-phone-secondary' }]} />,
              text: "Stronger hierarchy, recognizable icons, added illustration and the product's own visual language.",
            }}
          />
        </div>

        <Divider />

        <div id="ba-donation">
          <BeforeAfter
            title="Donation experience"
            arrow={`${A}/arrow-before-after.svg`}
            before={{
              // Figma 123:41278 (initial design)
              media: <Phones items={[
                { src: `${A}/donation-before.png`, alt: 'Original donation form: amount fields for tithe and offerings, extra concept and project selectors, and an invoice checkbox', className: 'mf-phone-complete' },
              ]} />,
              text: 'The original donation form: amount fields with no running total.',
            }}
            after={{
              media: <Phones className="mf-phones-flow" items={[
                screens.donation,
                screens.receipt,
              ]} />,
              text: 'Clearer category amounts, a running total before sending and an itemized receipt after.',
            }}
          />
        </div>
      </Section>

      {/* ── Impact: design outcomes, closing on the redesigned Home ── */}
      <Section id="impact" title="Impact" background="#fff">
        <Reveal selector=".cs-takeaway" stagger={0}>
          <TakeawayCard
            layout="wide"
            className="mf-impact"
            items={[
              { title: 'Research into direction', body: 'Synthesized existing research into actionable design principles.' },
              { title: 'A cohesive visual system', body: 'Created a more consistent mobile experience with clearer hierarchy and recognizable interaction patterns.' },
              { title: 'Transparency by design', body: 'Made donation information clearer through category amounts, totals and itemized receipts.' },
            ]}
            media={
              <div className="mf-impact-phones">
                <div className="mf-phone mf-impact-back"><img src={screens.church.src} alt="" loading="lazy" /></div>
                <div className="mf-phone mf-impact-front"><img src={screens.home.src} alt="The redesigned Mi Fidelidad home screen" loading="lazy" /></div>
              </div>
            }
          >
            Joining mid-flight, the highest-leverage work was translating research the team already had into a visual language donors could trust.
          </TakeawayCard>
        </Reveal>
      </Section>
    </CaseStudyPage>
  )
}
