import { Inspectable } from './case-study/lightbox'
import { Reveal } from './case-study/motion'
import CaseStudyPage, { type CaseStudySection, type CaseStudyTheme } from './case-study/CaseStudyPage'
import {
  BeforeAfter,
  BulletList,
  CaseHero,
  DeviceShowcase,
  Divider,
  GradientText,
  HighlightPanel,
  InsightCard,
  MediaFrame,
  MetaBar,
  MetricCard,
  NumberedCard,
  Section,
  SplitContent,
  StatCard,
  TakeawayCard,
  TextBlock,
} from './case-study/components'

// izzi CMS case study — source of truth: Figma "Portfolio" › case-izzi-ready (71:30100)

const A = '/assets/work/izzi'

const theme: CaseStudyTheme = {
  accentFrom: 'rgb(210, 23, 114)',
  accentTo: 'rgb(235, 104, 56)',
  tintFrom: 'rgba(255, 86, 153, 0.08)',
  tintTo: 'rgba(212, 120, 176, 0.05)',
  heroTop: '#ffe5fa',
}

// Side navigation — ids must match the anchors below
const sections: CaseStudySection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'result', label: 'Result' },
  { id: 'research', label: 'Research' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'before-after', label: 'Before → After' },
  { id: 'impact', label: 'Impact' },
]

// Radial glows exported from Figma (Overview media card, Glance section)
const overviewGlow = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 450.01 280' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(8.1894 14 -45.001 10.191 225 140)'><stop stop-color='rgba(241,215,239,1)' offset='0'/><stop stop-color='rgba(251,250,250,1)' offset='1'/></radialGradient></defs></svg>")`
const glanceGlow = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1260 734' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(22.93 36.7 -126 26.715 630.01 367)'><stop stop-color='rgba(241,215,239,1)' offset='0'/><stop stop-color='rgba(251,250,250,1)' offset='1'/></radialGradient></defs></svg>")`

export default function IzziCase() {
  return (
    <CaseStudyPage theme={theme} sections={sections}>
      <CaseHero
        artwork={{ src: `${A}/hero-illustration.svg`, width: 679, height: 483, alt: 'Exploded izzi pricing card with internet and TV icons' }}
        eyebrow="izzi CMS"
        lead="Giving marketing"
        highlight="control at scale."
        highlightAngle={124.5}
      />

      {/* ── Overview ── */}
      <Section id="overview" background="#fff" gap={80} style={{ paddingTop: 80 }}>
        <SplitContent>
          <div className="cs-stack" style={{ justifyContent: 'center' }}>
            <TextBlock title="Overview">
              <p>izzi's marketing site, the main channel for offers, leads, and self-service, was outdated, hard to update, and confusing on mobile.</p>
              <p>What began as a visual refresh grew into a bigger mission: give marketing a CMS, remove their dependency on development, and clarify the user's path through the site.</p>
            </TextBlock>
          </div>
          <div className="izzi-overview-media" style={{ backgroundImage: overviewGlow }}>
            <MediaFrame
              src={`${A}/overview-iphone-hand.png`}
              alt="Hand holding an iPhone showing the redesigned izzi site"
              className="izzi-overview-hand"
              width={318}
              height={312}
              crop={{ left: '-23.05%', top: '0', width: '123.15%', height: '116.67%' }}
            />
          </div>
        </SplitContent>
        <MetaBar items={[
          { label: 'My role', value: 'Lead UX/UI Designer' },
          { label: 'Type of Project', value: 'End-to-end redesign' },
          { label: 'Client', value: 'izzi telecom' },
        ]} />
      </Section>

      {/* ── Context ── */}
      <Section id="context" background="#f3f3f3" style={{ paddingTop: 80 }}>
        <SplitContent align="center">
          <TextBlock title="Context">
            <p>izzi is one of the largest telecom providers in Mexico, known for offering Internet, TV, and phone services.</p>
            <p>Its site, izzi.mx, is a key channel to present offers, capture leads, and support self-service.</p>
            <p>However, the existing site was outdated, hard to update, and confusing, especially on mobile, even if their mobile traffic was significantly higher.</p>
          </TextBlock>
          <div className="cs-stack" style={{ gap: 16 }}>
            <StatCard label="Monthly traffic" style={{ minHeight: 150 }}>
              <GradientText as="p" angle={101} className="cs-stat-value">2.5M</GradientText>
            </StatCard>
            <StatCard label="Traffic by device">
              <div className="izzi-device-split">
                <div>
                  <GradientText as="p" angle={105} className="cs-stat-value">80.5%</GradientText>
                  <p className="cs-body-muted">Mobile</p>
                </div>
                <span className="izzi-device-rule" aria-hidden>
                  <img src={`${A}/device-split-divider.svg`} alt="" width={18.049} height={41.615} />
                </span>
                <div>
                  <GradientText as="p" angle={103} className="cs-stat-value">19.5%</GradientText>
                  <p className="cs-body-muted">Desktop</p>
                </div>
              </div>
            </StatCard>
          </div>
        </SplitContent>
      </Section>

      {/* ── The Problem ── */}
      <Section id="problem" title="Problem" background="#fbfafa">
        <div className="cs-grid-3">
          <InsightCard
            title="Users"
            body="Fewer than 5% completed a flow. The site felt overwhelming and pricing was inconsistent across pages."
            stat={{ value: '70%', label: 'Bounce rate' }}
          />
          <InsightCard
            title="Marketing Team"
            body="Every plan combo was designed in Figma, then hand-coded by devs, causing mismatched prices, missing legal text, and broken layouts. Launching an offer took 2–3 weeks."
            stat={{ value: '2–3 weeks', label: 'Time to publish content' }}
          />
          <InsightCard
            title="DEV Team"
            body="40%+ of dev time went to repetitive content updates instead of product work."
            stat={{ value: '40%', label: 'DEV time invested' }}
          />
        </div>
      </Section>

      {/* ── The redesign at a glance ── */}
      <Section id="result" title="The redesign at a glance" background={glanceGlow}>
        <DeviceShowcase
          width={220}
          height={446}
          detailWidth={420}
          devices={[
            { src: `${A}/glance-phone-home.png`, alt: 'Redesigned izzi home on mobile' },
            { src: `${A}/glance-phone-mobile-plans.png`, alt: 'izzi móvil plan selection on mobile' },
            { src: `${A}/glance-phone-on-demand.png`, alt: 'izzi tv on demand page on mobile' },
            { src: `${A}/glance-phone-dogtv.png`, alt: 'DogTV streaming add-on page on mobile' },
          ]}
        />
      </Section>

      {/* ── Research → content model → objectives ── */}
      <Section id="research" background="#fff" gap={80}>
        <SplitContent>
          <div className="cs-stack" style={{ justifyContent: 'center', gap: 24 }}>
            <TextBlock title="Research">
              Analytics review, UX audit, and stakeholder interviews, not just on the interface, but on how offers actually got published.
            </TextBlock>
            <BulletList items={[
              'Analytics review: high drop-off points',
              'UX audit: visual hierarchy & CTA clarity',
              'Stakeholder interviews: content publishing workflow',
            ]} />
          </div>
          <Inspectable
            block
            src={`${A}/research-feedback-notes@2x.png`}
            alt="Research notes: service categories don't explain what they include, campaigns look different each time, excessive scrolling on mobile, and help buttons go unnoticed"
            width={901}
            radius="7.1% / 9.1%" /* the export's own 32px card corners (64px at 2×) */
            style={{ borderRadius: 32 }}
          >
            <MediaFrame
              src={`${A}/research-feedback-notes@2x.png`}
              alt="Research notes: service categories don't explain what they include, campaigns look different each time, excessive scrolling on mobile, and help buttons go unnoticed"
              aspectRatio="450 / 352"
              radius={32}
            />
          </Inspectable>
        </SplitContent>

        <Divider />

        <div id="objectives" className="cs-stack" style={{ gap: 24 }}>
          <HighlightPanel
            title="From design file to a content model"
            body="Worked with developers on a Contentful setup aligned to the design system, defining content models and naming conventions."
            stat={{ value: '40+', body: 'Reusable components powering the site, each editable through structured fields with zero code.' }}
          />
          <div className="cs-grid-2">
            <NumberedCard number="01" title="Autonomy through a CMS" body="Enable no-code content updates for marketing" />
            <NumberedCard number="02" title="Create a modular system" body="Reusable, CMS-ready components" />
            <NumberedCard number="03" title="Improve task completion" body="Restructure IA around plans and offers" />
            <NumberedCard number="04" title="Optimize for mobile-first" body="Redesign with mobile as the priority platform." />
          </div>
        </div>

        <Divider />

        <Inspectable block src={`${A}/research-macbook.png`} alt="Redesigned izzi homepage on a MacBook Air" style={{ borderRadius: 32 }}>
          <MediaFrame
            src={`${A}/research-macbook.png`}
            alt="Redesigned izzi homepage on a MacBook Air"
            aspectRatio="854 / 370"
            radius={32}
            background="rgba(11, 11, 13, 0.05)"
            crop={{ left: '-10.64%', top: '-23.64%', width: '120.78%', height: '185.85%' }}
          />
        </Inspectable>
      </Section>

      {/* ── Before → After ── */}
      <Section id="before-after" background="#f8f8f8" gap={80}>
        <div className="cs-stack" style={{ gap: 40 }}>
          <h2 className="cs-title">Before → After</h2>
          <BeforeAfter
            title="Pricing cards"
            arrow={`${A}/arrow-before-after.svg`}
            before={{
              media: (
                <Inspectable src={`${A}/pricing-before-full-page.png`} alt="Previous izzi plans page with the original pricing cards" width={1108} style={{ borderRadius: 4 }}>
                  <img src={`${A}/pricing-card-before.png`} alt="Previous izzi pricing card" width={163.593} height={340} loading="lazy" />
                </Inspectable>
              ),
              text: 'Fewer than 5% completed a flow. The site felt overwhelming and pricing was inconsistent across pages.',
            }}
            after={{
              media: (
                <Inspectable src={`${A}/pricing-card-after.svg`} alt="Redesigned modular izzi pricing card" width={386}>
                  <img className="izzi-pricing-after" src={`${A}/pricing-card-after.svg`} alt="Redesigned modular izzi pricing card" width={193} height={355} loading="lazy" />
                </Inspectable>
              ),
              text: 'Every plan combo was designed in Figma, then hand-coded by devs, causing mismatched prices, missing legal text, and broken layouts.',
            }}
          />
        </div>

        <Divider />

        <BeforeAfter
          title="Promotional banners"
          arrow={`${A}/arrow-before-after.svg`}
          before={{
            media: (
              <Inspectable block src={`${A}/banners-before.png`} alt="Previous promotional banners with inconsistent layouts" style={{ borderRadius: 4 }}>
                <img src={`${A}/banners-before.png`} alt="Previous promotional banners with inconsistent layouts" style={{ width: '100%', height: 'auto' }} width={2440} height={1272} loading="lazy" />
              </Inspectable>
            ),
            text: 'From inconsistent, manually-built layouts',
          }}
          after={{
            media: (
              <Inspectable block src={`${A}/banners-after.png`} alt="Redesigned promotional banners built from modular blocks" style={{ borderRadius: 4 }}>
                <img src={`${A}/banners-after.png`} alt="Redesigned promotional banners built from modular blocks" style={{ width: '100%', height: 'auto' }} width={2678} height={1124} loading="lazy" />
              </Inspectable>
            ),
            text: 'To modular CMS-ready blocks.',
          }}
        />

        <Divider />

        <BeforeAfter
          title="Navigation and task flow"
          arrow={`${A}/arrow-before-after-light.svg`}
          textGap={16}
          before={{
            media: (
              <Inspectable src={`${A}/navigation-before-full-page.png`} alt="Previous mobile package selection page, grouped by vague categories" width={360}>
                <MediaFrame
                  src={`${A}/navigation-before.png`}
                  alt="Previous package selection flow grouped by vague categories"
                  width={159}
                  height={412}
                  radius={16}
                  style={{ border: '1px solid #e5e5e5' }}
                />
              </Inspectable>
            ),
            text: 'From vague categories with no pricing context',
          }}
          after={{
            media: (
              <Inspectable src={`${A}/navigation-wizard-after.svg`} alt="Redesigned wizard: choose services, then compare priced packages" width={542} className="izzi-wizard-trigger">
                <img className="izzi-wizard-after" src={`${A}/navigation-wizard-after.svg`} alt="Redesigned wizard: choose services, then compare priced packages" width={271} height={427} loading="lazy" />
              </Inspectable>
            ),
            text: 'A wizard flow with progressive disclosure. Scroll depth cut by over 50%.',
          }}
        />
      </Section>

      {/* ── Impact ── */}
      <Section id="impact" title="Impact" background="#fff">
        {/* Metrics reveal top to bottom, then the Takeaway */}
        <Reveal selector=".cs-card, .cs-takeaway" stagger={80}>
        <SplitContent>
          <div className="cs-stack" style={{ gap: 16 }}>
            <MetricCard value="70% → 50%" label="Bounce rate" />
            <MetricCard value="2–3 weeks → <1 hour" label="Time to publish content" />
            <MetricCard value="0% → 100%" label="Pages editable without dev support" />
            <MetricCard value="0% (saved effort)" label="Dev involvement in ongoing content updates" />
          </div>
          <TakeawayCard label="Takeaway" image={{ src: `${A}/impact-ipad-podium.jpg`, alt: 'izzi Sky Sports landing page on an iPad' }}>
            The CMS removed a structural bottleneck between design, content, and engineering, <strong style={{ fontWeight: 700 }}>freeing developers for higher-impact product work.</strong>
          </TakeawayCard>
        </SplitContent>
        </Reveal>
      </Section>

      <style>{`
        .izzi-overview-media { position: relative; height: 280px; border-radius: 32px; align-self: start; }
        .izzi-overview-hand { position: absolute !important; bottom: 0.41px; left: 50%; transform: translateX(-50%); }
        .izzi-device-split { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; }
        .izzi-device-split > div { flex: 1 1 0; display: flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; }
        .izzi-device-rule { width: 16px; height: 41px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .izzi-pricing-after { margin: -4.76px -7.33px -9.67px -7.14px; }
        .izzi-wizard-after { margin: -3.7px -96.91px -11.71px -7.41px; }
        @media (max-width: 720px) {
          .izzi-device-split > div { flex-direction: column; gap: 0; }
          .izzi-wizard-after { margin: -3.7px 0 -11.71px; max-width: 100%; height: auto; }
        }
      `}</style>
    </CaseStudyPage>
  )
}
