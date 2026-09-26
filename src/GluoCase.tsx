import React, { useRef } from 'react'
import { Inspectable } from './case-study/lightbox'
import { Reveal, useReveal } from './case-study/motion'
import CaseStudyPage, { type CaseStudySection, type CaseStudyTheme } from './case-study/CaseStudyPage'
import {
  BeforeAfter,
  BleedShowcase,
  CaseHero,
  Divider,
  GradientText,
  InsightCard,
  InterludeBand,
  MediaFrame,
  MetaBar,
  MetricCard,
  Section,
  SplitContent,
  TextBlock,
} from './case-study/components'
import './GluoCase.css'

// gluo website case study — source of truth: Figma "Portfolio" › case-gluo-ready (91:29111)

const A = '/assets/work/gluo'

// Brand lime at 60% over white, fading to white (Figma: Header, Overview card, Glance)
const limeFade = 'linear-gradient(180deg, rgba(237, 255, 146, 0.6) 10%, rgba(255, 255, 255, 0.6) 100%), #fff'

const theme: CaseStudyTheme = {
  accentFrom: '#55b32f',
  accentTo: '#13c3a0',
  accentAngle: 90,
  accentStops: ['17.872%', '76.862%'],
  tintFrom: 'rgb(249, 255, 223)',
  tintTo: '#fff',
  tintAngle: 135,
  tintStart: '50%',
  border: '#e5e5e5',
  heroBackground: limeFade,
}

// Side navigation — ids must match the anchors below
const sections: CaseStudySection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'result', label: 'Result' },
  { id: 'research', label: 'Research' },
  { id: 'before-after', label: 'Before → After' },
  { id: 'impact', label: 'Impact' },
]

/** Hero artwork: laptop with the new homepage on screen, plus the waving character (Figma 71:33874) */
function HeroArtwork() {
  return (
    <div className="gl-hero-art" role="img" aria-label="The redesigned gluo homepage on a laptop, next to a gluo character illustration">
      <div className="gl-hero-screen">
        <img src={`${A}/hero-screen.png`} alt="" style={{ left: '-50.34%', top: '-52.63%', width: '200.55%', height: '215.39%' }} />
      </div>
      <img className="gl-hero-laptop" src={`${A}/hero-laptop.png`} alt="" />
      <span className="gl-hero-led" />
      <div className="gl-hero-character">
        <img src={`${A}/hero-character.png`} alt="" style={{ left: '-22.68%', top: 0, width: '138.49%', height: '100%' }} />
      </div>
    </div>
  )
}

// ── Card sorting ──────────────────────────────────────────────────────────────

type Cursor = { name: string; x: string; y: string; reflowY?: string; bg: string; border: string; shadow: string; flip?: boolean; order: number }
type SortCard = { label: React.ReactNode; cursor?: Cursor; loose?: boolean }

// Cursor positions are relative to the card they hover (Figma 71:34015); `reflowY` keeps a tag clear of the label on narrower layouts
const services: SortCard[] = [
  { label: 'User Experience', cursor: { name: 'Jake Miles', x: '80.8%', y: '5.6%', bg: '#0482de', border: '#1570ef', shadow: 'rgba(46, 144, 250, 0.16)', order: 0 } },
  { label: 'eCommerce' },
  { label: 'Content and campaigns' },
  { label: 'UX Research', cursor: { name: 'Andrew Pepper', x: '63.6%', y: '83.3%', bg: '#ac47eb', border: '#963cce', shadow: 'rgba(204, 129, 250, 0.2)', flip: true, order: 2 } },
]
const ourWork: SortCard[] = [
  { label: 'Industries' },
  { label: <><s>Partnerships</s> Alliances</> },
  { label: 'Success stories' },
  { label: 'Team', cursor: { name: 'Amy Cruz', x: '94.2%', y: '33.3%', reflowY: '64%', bg: '#ee46bc', border: '#dd2590', shadow: 'rgba(238, 70, 188, 0.16)', flip: true, order: 1 } },
  { label: 'Certifications', loose: true },
]

function SortGroup({ title, cards, className }: { title: string; cards: SortCard[]; className: string }) {
  return (
    <div className={`gl-sort-group ${className}`}>
      <GradientText as="h4" className="gl-sort-label">{title}</GradientText>
      <ul className="gl-sort-cards" aria-label={`${title} group`}>
        {cards.map((card, i) => (
          <li key={i} className={card.loose ? 'gl-sort-card gl-sort-card-loose' : 'gl-sort-card'}>
            <div className="gl-sort-box"><span>{card.label}</span></div>
            {card.cursor && (
              <span
                className="gl-cursor"
                data-flip={card.cursor.flip ? '' : undefined}
                aria-hidden
                style={{
                  '--x': card.cursor.x,
                  '--y': card.cursor.y,
                  '--y-reflow': card.cursor.reflowY,
                  '--tag-bg': card.cursor.bg,
                  '--tag-border': card.cursor.border,
                  '--tag-shadow': card.cursor.shadow,
                  '--c': card.cursor.order,
                } as React.CSSProperties}
              >
                <img src={`${A}/cursor.svg`} alt="" width={23.3} height={24.26} />
                <span className="gl-cursor-tag">{card.cursor.name}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Card-sorting board: cards settle in, then collaborators' cursors appear */
function CardSorting() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { selector: '.gl-sort-label, .gl-sort-box', stagger: 50 })
  return (
    <div ref={ref} className="gl-sort">
      <SortGroup title="Services" cards={services} className="gl-sort-services" />
      <SortGroup title="Our work" cards={ourWork} className="gl-sort-work" />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GluoCase() {
  return (
    <CaseStudyPage theme={theme} sections={sections}>
      <CaseHero
        media={<HeroArtwork />}
        gap={50}
        eyebrow="gluo’s website"
        lead="Rebuilding a digital agency's site around a"
        highlight="clearer brand identity."
      />

      {/* ── Overview ── */}
      <Section id="overview" background="#fff" gap={80} style={{ paddingTop: 80 }}>
        <SplitContent>
          <div className="cs-stack" style={{ justifyContent: 'center' }}>
            <TextBlock title="Overview">
              <p>Gluo is a digital product design and development agency in Mexico working with major brands in Telecom, Retail, Travel and Hospitality, and Entertainment.</p>
              <p>After relaunching gluo.mx in 2022 around a heavy black background, the site wasn't converting the visits or leads expected. Gluo asked for a full redesign.</p>
            </TextBlock>
          </div>
          <div className="gl-overview-media" style={{ background: limeFade }}>
            <MediaFrame
              src={`${A}/overview-phone-hand.png`}
              alt="Hand holding a phone showing the redesigned gluo services page"
              className="gl-overview-hand"
              width={334}
              height={284}
              crop={{ left: '-17.07%', top: '-0.07%', width: '117.07%', height: '142.05%' }}
            />
          </div>
        </SplitContent>
        <MetaBar items={[
          { label: 'My role', value: 'UX/UI Designer' },
          { label: 'Type of Project', value: 'End-to-end redesign' },
          { label: 'Client', value: 'gluo agency' },
        ]} />
      </Section>

      {/* ── Context ── */}
      <Section id="context" background="#f3f3f3" style={{ paddingTop: 80 }}>
        <SplitContent align="center">
          <TextBlock title="Context">
            <p>Founded 2003. Works across four core industries: Media and Telecom, Retail, Travel and Hospitality, and Entertainment.</p>
            <p>The 2022 "dark site" leaned entirely on black backgrounds and grayscale, with minimal imagery.</p>
          </TextBlock>
          <Inspectable block src={`${A}/old-site-full-page.png`} alt="The previous dark gluo.mx site, full page" width={783} style={{ borderRadius: 8 }}>
            {/* Crop of the full-page capture (Figma 71:33859) */}
            <div className="cs-media gl-old-site">
              <img src={`${A}/old-site-full-page.png`} alt="The previous gluo.mx “Soluciones a la medida” section on a black background" loading="lazy" />
            </div>
          </Inspectable>
        </SplitContent>
      </Section>

      {/* ── Problem ── */}
      <Section id="problem" title="Problem" background="#fbfafa">
        <div className="cs-grid-3">
          <InsightCard title="Navigation" body="Content was scattered between gluo.mx and external links, confusing visitors trying to follow the full story." />
          <InsightCard title="Brand" body="Gluo's visual identity wasn't being used to its potential; the black background left little room for personality or contrast." />
          <InsightCard title="Engagement" body="Visitors weren't spending much time on the site. Nothing invited them to explore further." />
        </div>
      </Section>

      {/* ── The redesign at a glance ── */}
      <Section id="result" title="The redesign at a glance" titleAlign="center" background={limeFade}>
        <BleedShowcase
          detailWidth={1200}
          center={{ src: `${A}/glance-laptop.png`, alt: 'Redesigned gluo “How we work” section on a laptop', width: 600, height: 365.68 }}
          sides={[
            { src: `${A}/glance-left.png`, alt: 'Redesigned gluo services section with illustrated icons', width: 490, height: 307 },
            { src: `${A}/glance-right.png`, alt: 'Redesigned gluo news carousel', width: 491, height: 305 },
          ]}
        />
      </Section>

      {/* ── Research: card sorting → sitemap → moodboard ── */}
      <Section id="research" background="#fff" gap={80}>
        <div className="gl-research-intro">
          <TextBlock title="Research">
            To understand how three key audiences (prospects, candidates and partners) actually used the website, we conducted a benchmark and card sorting with users to reorganize content.
          </TextBlock>
        </div>

        <div id="card-sorting" className="cs-stack" style={{ gap: 16 }}>
          <h3 className="cs-subtitle">Card sorting</h3>
          <CardSorting />
        </div>

        <Divider />

        <div id="sitemap" className="cs-stack" style={{ gap: 16 }}>
          <h3 className="cs-subtitle">Sitemap</h3>
          <Reveal>
            <Inspectable block src={`${A}/sitemap.png`} alt="New gluo sitemap: Services, Our work, About us, Blog and Contact, with their subpages" width={1400}>
              <img className="gl-full-img" src={`${A}/sitemap.png`} alt="New gluo sitemap: Services, Our work, About us, Blog and Contact, with their subpages" width={941} height={513.5} loading="lazy" />
            </Inspectable>
          </Reveal>
        </div>

        <Divider />

        <div id="moodboard" className="cs-stack" style={{ gap: 16 }}>
          <h3 className="cs-subtitle">Moodboard</h3>
          <Reveal>
            <Inspectable block src={`${A}/moodboard.png`} alt="Moodboard: white and brightly colored backgrounds, sans-serif and monospaced typography, friendly illustrations with black strokes and solid fills" width={1400}>
              <img className="gl-full-img" src={`${A}/moodboard.png`} alt="Moodboard: white and brightly colored backgrounds, sans-serif and monospaced typography, friendly illustrations with black strokes and solid fills" width={940} height={482} loading="lazy" />
            </Inspectable>
          </Reveal>
        </div>
      </Section>

      {/* ── Iterations interlude (not a navigation section) ── */}
      <InterludeBand
        background="rgb(237, 255, 146)"
        ink="rgba(19, 19, 19, 0.5)"
        image={{ src: `${A}/iterations-phones.png`, alt: 'Final gluo mobile screens: the homepage and the “How we work” section', width: 470, height: 554 }}
      >
        Some iterations<br />were made<br />until reaching<br />the final result
      </InterludeBand>

      {/* ── Before → After ── */}
      <Section id="before-after" title="Before → After" background="#f8f8f8">
        <BeforeAfter
          title="General style"
          arrow={`${A}/arrow-before-after.svg`}
          before={{
            media: (
              <Inspectable className="gl-ba-inspect" src={`${A}/old-site-full-page.png`} alt="Previous gluo.mx site, full page" width={783} style={{ borderRadius: 9.6 }}>
                <img className="gl-ba-img" src={`${A}/style-before.png`} alt="Previous gluo.mx hero on a solid black background" width={360} height={240} style={{ borderRadius: 9.6 }} loading="lazy" />
              </Inspectable>
            ),
            text: 'Solid black background, minimal imagery, and low contrast text.',
          }}
          after={{
            media: (
              <Inspectable className="gl-ba-inspect" src={`${A}/style-after-full.png`} alt="Redesigned gluo homepage hero" width={1200} style={{ borderRadius: 8 }}>
                <img className="gl-ba-img" src={`${A}/style-after.png`} alt="Redesigned gluo homepage hero on a white background" width={360} height={230.48} style={{ borderRadius: 8 }} loading="lazy" />
              </Inspectable>
            ),
            text: 'White background, brand colors, and illustration-led hero sections.',
          }}
        />
        <BeforeAfter
          title="Content clarity"
          arrow={`${A}/arrow-before-after.svg`}
          before={{
            media: (
              <Inspectable className="gl-ba-inspect" src={`${A}/clarity-before-full-page.png`} alt="Previous gluo.mx history page, full page" width={878} style={{ borderRadius: 9.6 }}>
                <img className="gl-ba-img" src={`${A}/clarity-before.png`} alt="Previous gluo.mx history timeline in dense text on black" width={360} height={240} style={{ borderRadius: 9.6 }} loading="lazy" />
              </Inspectable>
            ),
            text: 'Dense text blocks with low contrast and minimal hierarchy.',
          }}
          after={{
            media: (
              <Inspectable className="gl-ba-inspect" src={`${A}/clarity-after-full.png`} alt="Redesigned gluo history timeline" width={1298} style={{ borderRadius: 8 }}>
                <img className="gl-ba-img" src={`${A}/clarity-after.png`} alt="Redesigned gluo history timeline on pink with an illustration" width={360} height={230.48} style={{ borderRadius: 8 }} loading="lazy" />
              </Inspectable>
            ),
            text: 'Content broken into clear sections guided by color and illustration.',
          }}
        />
      </Section>

      {/* ── Impact ── */}
      <Section id="impact" title="Impact" background="#fff">
        <Reveal className="cs-grid-3" selector=".cs-card" stagger={80}>
          <MetricCard value="+100%" label="Website traffic vs. the previous site" />
          <MetricCard value="92%" label="Organic traffic" />
          <MetricCard value="29 countries" label="Reach expanded through the website" />
        </Reveal>
      </Section>
    </CaseStudyPage>
  )
}
