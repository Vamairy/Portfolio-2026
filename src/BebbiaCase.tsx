import React, { useRef } from 'react'
import { Inspectable } from './case-study/lightbox'
import { Reveal, useReveal } from './case-study/motion'
import CaseStudyPage, { type CaseStudySection, type CaseStudyTheme } from './case-study/CaseStudyPage'
import {
  BeforeAfter,
  CaseHero,
  DeviceShowcase,
  Divider,
  GradientText,
  InsightCard,
  MediaFrame,
  MetaBar,
  MetricCard,
  NumberedCard,
  QuoteCard,
  Section,
  SplitContent,
  TakeawayCard,
  TextBlock,
} from './case-study/components'
import './BebbiaCase.css'

// Bebbia subscription funnel case study. Story and copy: the approved case narrative;
// product screens and artifacts: Figma "Portfolio" › old Bebbia case (108:36347).

const A = '/assets/work/bebbia'

// Bebbia's brand blue (primary button) into the cyan of its water palette (600)
const theme: CaseStudyTheme = {
  accentFrom: '#1b5eea',
  accentTo: '#14b9ff',
  accentAngle: 100,
  tintFrom: 'rgba(20, 185, 255, 0.1)',
  tintTo: 'rgba(27, 94, 234, 0.03)',
  tintAngle: 135,
  border: '#d8e1ec',
  heroBackground: 'radial-gradient(80% 60% at 50% 0%, #d4f2ff 0%, rgba(212, 242, 255, 0) 70%), linear-gradient(180deg, #eefaff 0%, #fafdff 62%, #fff 100%)',
}

const glanceGlow = 'radial-gradient(60% 55% at 50% 50%, rgba(173, 231, 255, 0.55) 0%, rgba(240, 251, 255, 0) 100%), #fafdff'

// Side navigation — ids must match the anchors below
const sections: CaseStudySection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'result', label: 'Result' },
  { id: 'research', label: 'Research' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'funnel-flow', label: 'Funnel flow' },
  { id: 'before-after', label: 'Before → After' },
  { id: 'impact', label: 'Impact' },
]

// Redesigned funnel screens (Figma 108:36870, 108:36871, 108:36782)
const screens = {
  search: { src: `${A}/screen-address-search.png`, alt: 'Redesigned Bebbia address step: “Where will we install your bebbia?” with address autocomplete suggestions' },
  map: { src: `${A}/screen-address-map.png`, alt: 'Redesigned Bebbia address step: the chosen address confirmed with a pin on a map' },
  payment: { src: `${A}/screen-payment.png`, alt: 'Redesigned Bebbia payment step: card details, coupon options and the order summary on one screen' },
}

// ── Hero ──────────────────────────────────────────────────────────────────────

/** Three steps of the redesigned funnel, the middle one raised (low → high → low) */
function HeroArtwork() {
  const steps = [screens.search, screens.map, screens.payment]
  return (
    <div className="bb-hero-art" role="img" aria-label="Three steps of the redesigned Bebbia funnel on mobile: address search, map confirmation and payment">
      <div className="bb-hero-screens">
        {steps.map((s, i) => (
          <div key={s.src} className="bb-hero-screen" style={{ '--n': i } as React.CSSProperties}>
            <img src={s.src} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Context ───────────────────────────────────────────────────────────────────

const Person = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />
  </svg>
)

// ── Research ──────────────────────────────────────────────────────────────────

type Marker = { n: number; x: string; y: string }

function EvaluatedScreen({ src, alt, markers }: { src: string; alt: string; markers: Marker[] }) {
  return (
    <div className="bb-eval-screen">
      <Inspectable block src={src} alt={alt} width={420} style={{ borderRadius: 32 }}>
        <img src={src} alt={alt} width={722} height={1400} loading="lazy" />
      </Inspectable>
      {markers.map(m => (
        <span key={m.n} className="bb-marker" style={{ left: m.x, top: m.y }} aria-hidden>{m.n}</span>
      ))}
    </div>
  )
}

/** The two evaluated screens with the four heuristic findings called out around them */
function HeuristicBoard() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { selector: '.bb-eval-screen, .bb-note', stagger: 90 })
  return (
    <div ref={ref} className="bb-heuristic">
      <ol className="bb-notes bb-notes-start">
        <li className="bb-note"><span className="bb-marker" aria-hidden>1</span><span>Too many steps</span></li>
        <li className="bb-note"><span className="bb-marker" aria-hidden>2</span><span>Unclear actions</span></li>
      </ol>
      <div className="bb-eval-screens">
        <EvaluatedScreen
          src={`${A}/research-scheduling.png`}
          alt="Original Bebbia scheduling step, “Paso 6 de 6”, with date cards and time options"
          markers={[{ n: 1, x: '44%', y: '17%' }, { n: 2, x: '76%', y: '66%' }]}
        />
        <EvaluatedScreen
          src={`${A}/research-welcome.png`}
          alt="Original Bebbia welcome screen with installation details, customer portal and installation requirements"
          markers={[{ n: 3, x: '80%', y: '34%' }, { n: 4, x: '84%', y: '69%' }]}
        />
      </div>
      <ol className="bb-notes bb-notes-end" start={3}>
        <li className="bb-note"><span className="bb-marker" aria-hidden>3</span><span>Overwhelming screens</span></li>
        <li className="bb-note"><span className="bb-marker" aria-hidden>4</span><span>Visual inconsistencies</span></li>
      </ol>
    </div>
  )
}

// ── Funnel flow ───────────────────────────────────────────────────────────────

// Step lists from the Figma flow artifact (108:36679): 12 steps before, 7 after
const beforeSteps = [
  'Select subscription',
  'Zip code verification',
  'Subscription setup',
  'Details of your subscription',
  'Account creation',
  'Personal data',
  'Address installation form',
  'Order summary',
  'Payment method',
  'Installation data',
  'Verification',
  'Confirmation',
]

const afterSteps: { label: string; tag?: 'Merged' | 'Optional' }[] = [
  { label: 'Select subscription' },
  { label: 'Installation with geolocation tool', tag: 'Merged' },
  { label: 'Account or personal data' },
  { label: 'Order summary and payment method', tag: 'Merged' },
  { label: 'Installation data' },
  { label: 'Verification', tag: 'Optional' },
  { label: 'Confirmation' },
]

/** 12 → 7 at a glance, with both step lists underneath for a closer read */
function FunnelFlow() {
  const ref = useRef<HTMLDivElement>(null)
  // Counts first, then the transition, then each list settles in
  useReveal(ref, { selector: '.bb-flow-count, .bb-flow-arrow, .bb-flow-steps li', stagger: 35 })
  return (
    <div className="bb-flow-wrap">
    {/* Side by side on larger screens; a contained swipe between two cards on mobile */}
    <div ref={ref} className="bb-flow" role="region" aria-label="Funnel steps before and after" tabIndex={0}>
      <div className="bb-flow-col">
        <p className="bb-flow-label">Before</p>
        <p className="bb-flow-count"><span className="bb-flow-num">12</span> steps</p>
        <ol className="bb-flow-steps" aria-label="Before: 12 steps">
          {beforeSteps.map(step => <li key={step}><span>{step}</span></li>)}
        </ol>
      </div>

      <div className="bb-flow-arrow" aria-hidden>
        <svg viewBox="0 0 120 24" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bb-flow-grad" x1="0" x2="120" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1b5eea" stopOpacity="0.25" />
              <stop offset="1" stopColor="#14b9ff" />
            </linearGradient>
          </defs>
          <path d="M2 12H112M104 4l8 8-8 8" fill="none" stroke="url(#bb-flow-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="bb-flow-col bb-flow-col-after">
        <GradientText as="p" className="bb-flow-label">After</GradientText>
        <p className="bb-flow-count"><GradientText className="bb-flow-num">7</GradientText> steps</p>
        <ol className="bb-flow-steps" aria-label="After: 7 steps">
          {afterSteps.map(step => (
            <li key={step.label}>
              <span>
                {step.label}
                {step.tag && <> <span className="bb-tag">{step.tag}</span></>}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
    </div>
  )
}

// ── Before → After ────────────────────────────────────────────────────────────

/** One or more full-length phone screens, cropped to their first view; each opens in the lightbox */
function Screens({ items }: { items: { src: string; alt: string }[] }) {
  return (
    <div className="bb-ba-screens">
      {items.map(s => (
        <Inspectable key={s.src} src={s.src} alt={s.alt} width={420} className="bb-ba-screen-btn">
          <div className="bb-ba-screen"><img src={s.src} alt={s.alt} loading="lazy" /></div>
        </Inspectable>
      ))}
    </div>
  )
}

// Bebbia blue scale from the design system (Figma 108:36934)
const palette = [
  ['100', '#F0FBFF'], ['200', '#E0F6FF'], ['300', '#ADE7FF'], ['400', '#7AD8FF'], ['500', '#47C8FF'],
  ['600', '#14B9FF'], ['700', '#009CDE'], ['800', '#007AAD'], ['900', '#1D6685'],
]

function DesignSystem() {
  return (
    <div className="bb-ds">
      <Inspectable block src={`${A}/new-login.jpg`} alt="Redesigned Bebbia desktop sign-in built with the new design system" width={1200} style={{ borderRadius: 12 }}>
        <div className="bb-ba-desktop"><img src={`${A}/new-login.jpg`} alt="Redesigned Bebbia desktop sign-in" loading="lazy" /></div>
      </Inspectable>
      <ul className="bb-palette" aria-label="Bebbia blue color scale">
        {palette.map(([step, hex]) => (
          <li key={step} title={hex}>
            <span className="bb-swatch" style={{ background: hex }} />
            <span className="bb-swatch-step">{step}</span>
            <span className="sr-only">{hex}</span>
          </li>
        ))}
      </ul>
      <img className="bb-ds-row" src={`${A}/ds-buttons.png`} alt="Primary and secondary button components in three states" width={468} height={101} loading="lazy" />
      <img className="bb-ds-row" src={`${A}/ds-controls.png`} alt="Segmented control and input field components in their states" width={524} height={55} loading="lazy" />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BebbiaCase() {
  return (
    <CaseStudyPage theme={theme} sections={sections}>
      <CaseHero
        media={<HeroArtwork />}
        gap={56}
        eyebrow="Subscription Funnel"
        lead="Simplifying Bebbia's path"
        highlight="end to end."
      />

      {/* ── Overview ── */}
      <Section id="overview" background="#fff" gap={80} style={{ paddingTop: 80 }}>
        <SplitContent align="center">
          <TextBlock title="Overview">
            <p>Bebbia is Rotoplas' water purification subscription service, offering installation and maintenance so families get clean water at home without buying bottles or managing filters.</p>
            <p>Rotoplas asked for a full redesign of the subscription funnel to fix conversion and the overall experience.</p>
          </TextBlock>
          <MediaFrame
            src={`${A}/overview-photo.jpg`}
            alt="A woman drinking a glass of water in her kitchen, with the Bebbia purifier installed under the sink"
            aspectRatio="1400 / 1040"
            radius={32}
          />
        </SplitContent>
        <MetaBar items={[
          { label: 'My role', value: 'Lead UX/UI Designer' },
          { label: 'Type of Project', value: 'End to end redesign' },
          { label: 'Client', value: 'Rotoplas' },
        ]} />
      </Section>

      {/* ── Context ── */}
      <Section id="context" background="#f3f3f3" className="bb-context" style={{ paddingTop: 80 }}>
        <div className="bb-context-grid">
          <TextBlock title="Context">
            Conversion rate was just 2.6%, and 3 out of 4 users abandoned the funnel before checkout.
          </TextBlock>
          <Reveal className="bb-context-stats" selector=".bb-context-stat" stagger={140}>
            <div className="bb-context-stat">
              <GradientText as="p" className="bb-context-value">2.6%</GradientText>
              <p className="bb-context-label">conversion</p>
            </div>
            <div className="bb-context-stat">
              <GradientText as="p" className="bb-context-value">3 of 4</GradientText>
              <div className="bb-leak" aria-hidden>
                <span className="bb-leak-stay"><Person /></span>
                <span className="bb-leak-drop" style={{ '--n': 0 } as React.CSSProperties}><Person /></span>
                <span className="bb-leak-drop" style={{ '--n': 1 } as React.CSSProperties}><Person /></span>
                <span className="bb-leak-drop" style={{ '--n': 2 } as React.CSSProperties}><Person /></span>
              </div>
              <p className="bb-context-label">users abandoned before checkout</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Problem ── */}
      <Section id="problem" title="Problem" background="#fbfafa">
        <Reveal className="cs-grid-3" selector=".cs-card" stagger={80}>
          <InsightCard title="Users gave up before finishing" body="The process was long and tiring, with screens overloaded with text and forms, especially on mobile." />
          <InsightCard title="The funnel wasn't profitable" body="Conversion was just 2.6%, iteration was slow, and the experience no longer matched Bebbia's updated brand." />
          <InsightCard title="Installers paid the price" body="45% of support tickets were tied to installation issues, and missed appointments increased cost per install." />
        </Reveal>
      </Section>

      {/* ── The redesign at a glance ── */}
      <Section id="result" title="The redesign at a glance" titleAlign="center" background={glanceGlow} className="bb-glance">
        <DeviceShowcase
          width={220}
          height={446}
          detailWidth={420}
          devices={[
            { ...screens.search, caption: 'Address with autocomplete' },
            { ...screens.map, caption: 'Pin confirmed on the map' },
            { ...screens.payment, caption: 'Summary and payment together' },
          ]}
        />
      </Section>

      {/* ── Research ── */}
      <Section id="research" background="#fff" gap={80}>
        <div className="cs-stack" style={{ gap: 48 }}>
          <div className="bb-research-intro">
            <TextBlock title="Research">
              Analytics, a heuristic evaluation, support ticket analysis, and moderated testing pointed to the same root cause.
            </TextBlock>
          </div>
          <div className="cs-stack" style={{ gap: 24 }}>
            <h3 className="cs-subtitle">Heuristic evaluation</h3>
            <HeuristicBoard />
          </div>
        </div>

        <Divider />

        <div className="cs-stack" style={{ gap: 24 }}>
          <h3 className="cs-subtitle">Findings</h3>
          <Reveal className="cs-grid-3" selector=".cs-card" stagger={100}>
            <QuoteCard quote={'I didn\'t know how many steps were left, so I just gave up."'} />
            <QuoteCard quote={'I wasn\'t sure if my address was actually saved correctly."'} />
            <QuoteCard quote={'The payment screen felt like a different app."'} />
          </Reveal>
        </div>
      </Section>

      {/* ── Strategy ── */}
      <Section id="strategy" title="Strategy" background="#fbfafa">
        <Reveal className="bb-grid-4" selector=".cs-card" stagger={80}>
          <NumberedCard number="01" title="Simplify the funnel" link={{ href: '#funnel-flow', label: 'See the flow' }} />
          <NumberedCard number="02" title="Improve clarity and guidance" link={{ href: '#ba-payment', label: 'See payment' }} />
          <NumberedCard number="03" title="Solve address input issues" link={{ href: '#ba-address', label: 'See address input' }} />
          <NumberedCard number="04" title="Build a scalable design system" link={{ href: '#ba-visual-system', label: 'See the system' }} />
        </Reveal>
      </Section>

      {/* ── Funnel flow: 12 → 7 ── */}
      <Section id="funnel-flow" background="#fff" gap={56}>
        <div className="bb-flow-intro">
          <TextBlock title="Funnel flow">
            The original funnel had 12 sequential steps. I grouped related actions into fewer screens and made optional steps skippable.
          </TextBlock>
        </div>
        <FunnelFlow />
      </Section>

      {/* ── Before → After ── */}
      <Section id="before-after" title="Before → After" background="#f8f8f8" gap={80}>
        <div id="ba-address">
          <BeforeAfter
            title="Address input"
            arrow={`${A}/arrow-before-after.svg`}
            before={{
              media: <Screens items={[
                { src: `${A}/old-address-form.png`, alt: 'Original Bebbia address step: state, city and municipality fields, a neighborhood dropdown and a free-text street field' },
                { src: `${A}/old-address-colonia.png`, alt: 'Original Bebbia address confirmation with an error banner and a neighborhood dropdown' },
              ]} />,
              text: 'Free text entry, a leading cause of missed installations.',
            }}
            after={{
              media: <Screens items={[screens.search, screens.map]} />,
              text: 'A map tool to drop a pin, paired with autocomplete and inline helper text.',
            }}
          />
        </div>

        <Divider />

        <div id="ba-payment">
          <BeforeAfter
            title="Payment and summary"
            arrow={`${A}/arrow-before-after.svg`}
            before={{
              media: <Screens items={[
                { src: `${A}/old-summary.png`, alt: 'Original Bebbia order summary step with installation, subscription and billing fields' },
                { src: `${A}/old-payment.png`, alt: 'Original Bebbia payment method step on a separate screen' },
              ]} />,
              text: 'Fragmented into separate screens with inconsistent hierarchy.',
            }}
            after={{
              media: <Screens items={[screens.payment]} />,
              text: 'A single screen combining order summary and payment method.',
            }}
          />
        </div>

        <Divider />

        <div id="ba-visual-system">
          <BeforeAfter
            title="Visual system"
            arrow={`${A}/arrow-before-after.svg`}
            before={{
              media: (
                <Inspectable block src={`${A}/old-login.jpg`} alt="Original Bebbia desktop sign-in" width={1200} style={{ borderRadius: 12 }}>
                  <div className="bb-ba-desktop"><img src={`${A}/old-login.jpg`} alt="Original Bebbia desktop sign-in" loading="lazy" /></div>
                </Inspectable>
              ),
              text: 'No consistent component library, slowing every iteration.',
            }}
            after={{
              media: <DesignSystem />,
              text: "A full design system aligned to Bebbia's brand, reused across every screen.",
            }}
          />
        </div>
      </Section>

      {/* ── Impact (Takeaway belongs here) — same composition as izzi CMS ── */}
      <Section id="impact" title="Impact" background="#fff">
        {/* Metrics reveal top to bottom, then the Takeaway */}
        <Reveal selector=".cs-card, .cs-takeaway" stagger={80}>
        <SplitContent>
          <div className="cs-stack" style={{ gap: 16 }}>
            <MetricCard value="2.6% → 29%" label="Conversion rate" />
            <MetricCard value="−62%" label="Time to complete" detail="8 min → 3 min" />
            <MetricCard value="−60%" label="Address related support tickets" />
            <MetricCard value="−52%" label="Missed installations" />
          </div>
          <TakeawayCard
            className="bb-takeaway"
            label="Takeaway"
            image={{ src: `${A}/takeaway-phones.png`, alt: 'Redesigned Bebbia installation appointment and address screens on two phones' }}
          >
            This wasn't just a visual refresh. It turned a leaking funnel into <strong style={{ fontWeight: 700 }}>bebbia's most reliable acquisition channel</strong>, helping convert more visitors into subscribers and driving sales at a critical moment for the business.
          </TakeawayCard>
        </SplitContent>
        </Reveal>
      </Section>
    </CaseStudyPage>
  )
}
