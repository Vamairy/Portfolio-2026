import React, { useRef } from 'react'
import { Inspectable } from './case-study/lightbox'
import { Reveal, useReveal } from './case-study/motion'
import CaseStudyPage, { type CaseStudySection, type CaseStudyTheme } from './case-study/CaseStudyPage'
import {
  AnnotatedScreen,
  ApproachMoment,
  ApproachSection,
  BeforeAfter,
  CaseHero,
  Divider,
  GradientText,
  InsightCard,
  Marker,
  MediaFrame,
  MetaBar,
  MetricCard,
  QuoteCard,
  Section,
  SplitContent,
  TakeawayCard,
  TextBlock,
} from './case-study/components'
import './IVentasCase.css'

// iVentas CRM case study. Story and copy: the approved case narrative; product screens:
// Figma "Portfolio" › old iVentas case (115:38706). Stage 01 = MVP, Stage 02 = restructured.

const A = '/assets/work/iventas'
// Shared Before → After arrow (same Figma export as izzi CMS)
const ARROW = '/assets/work/izzi/arrow-before-after.svg'

// Product action azure (buttons, active nav) into the mint of its chat and illustrations
const theme: CaseStudyTheme = {
  accentFrom: '#0a8ff0',
  accentTo: '#1dbf8a',
  accentAngle: 100,
  tintFrom: 'rgba(90, 228, 167, 0.13)',
  tintTo: 'rgba(0, 153, 255, 0.05)',
  tintAngle: 135,
  border: '#d8e3ec',
  // Hero artwork sits on the product's own #e5f4ff canvas: solid down to the artwork's bottom
  // edge (--iv-hero-solid, IVentasCase.css) so the export never shows a seam, then white
  heroBackground: 'linear-gradient(180deg, #e5f4ff 0, #e5f4ff var(--iv-hero-solid, 60%), #fff 100%)',
}

// Design Approach accent panels: one light progression in the product's azure, from near-white
// to its #e5f4ff canvas (the hero color)
const approachAccents = {
  communication: 'rgba(0, 153, 255, 0.05)',
  workspace: 'linear-gradient(90deg, rgba(0, 153, 255, 0.04) 0%, rgba(0, 153, 255, 0.09) 100%)',
  content: '#e5f4ff',
}

// Side navigation — ids must match the anchors below
const sections: CaseStudySection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Design Approach' },
  { id: 'research', label: 'Research' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'testing', label: 'Testing' },
  { id: 'before-after', label: 'Before → After' },
  { id: 'impact', label: 'Impact' },
]

// Restructured product screens (Figma 115:40423, 115:40425, 115:40443, 115:40445, 115:40463).
// Exports carry the screen's own rounded frame and a 10px shadow margin (740 × 508 at 1×).
const screens = {
  messages: { src: `${A}/screen-message-panel.png`, alt: 'iVentas message panel: conversation list with lead tags, a WhatsApp conversation with a shared image and document, and the contact panel with tags, assigned agent and a Reassign action' },
  contacts: { src: `${A}/screen-contacts.png`, alt: 'iVentas contacts: a filterable table of customers with status, phone and tags' },
  multimedia: { src: `${A}/screen-multimedia.png`, alt: 'iVentas multimedia: Vinte property albums organized by state, plus documentation and promotional albums' },
  quickResponses: { src: `${A}/screen-quick-responses.png`, alt: 'iVentas quick responses: a form to create a saved answer with a shortcut and attached file, next to a live chat preview of the reply' },
  team: { src: `${A}/screen-team.png`, alt: 'iVentas team: members with their role, phone, tags and closed sales per month' },
}

// ── Hero ──────────────────────────────────────────────────────────────────────

/** Contacts view with an incoming lead card (Figma 115:38717), exported as composed */
function HeroArtwork() {
  return (
    <div className="iv-hero-art">
      <img
        src={`${A}/hero-contacts.png`}
        alt="iVentas contacts view with a new incoming lead notification: Luis González, tagged Nuevo, “Me interesa la información”"
        width={1123}
        height={638}
      />
    </div>
  )
}

// ── Design Approach ───────────────────────────────────────────────────────────

// One stroke family for the three moments (24px grid, 1.5px stroke, round caps)
const iconProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const IconConversations = () => (
  <svg {...iconProps}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5v6a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 3v-3H5.5A1.5 1.5 0 0 1 4 11.5z" />
    <path d="M19 9h.5A1.5 1.5 0 0 1 21 10.5v6a1.5 1.5 0 0 1-1.5 1.5h-.5v3l-3.5-3H11a1.5 1.5 0 0 1-1.5-1.5V16" />
  </svg>
)
const IconWorkspace = () => (
  <svg {...iconProps}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
    <circle cx="17" cy="9" r="2.25" />
    <path d="M16 13.6c.33-.07.66-.1 1-.1 2.5 0 4 2 4 4.5" />
  </svg>
)
const IconContent = () => (
  <svg {...iconProps}>
    <path d="M3.5 7A1.5 1.5 0 0 1 5 5.5h4l2 2h8A1.5 1.5 0 0 1 20.5 9v9a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z" />
    <circle cx="9.5" cy="12" r="1.25" />
    <path d="m6.5 17.5 3.5-3 2.5 2 2-1.5 3 2.5" />
  </svg>
)

type ApproachScreen = { src: string; alt: string }

/** A screen, opening in the lightbox (exports carry their own frame and shadow) */
function ApproachScreenImage({ src, alt, className }: ApproachScreen & { className?: string }) {
  return (
    <Inspectable src={src} alt={alt} width={1110} block className={className} style={{ borderRadius: 14 }}>
      <img src={src} alt={alt} width={740} height={508} loading="lazy" />
    </Inspectable>
  )
}

/** One product screen as the moment's visual (Figma 147:41954, 147:42789, 147:43797) */
function ApproachVisual(screen: ApproachScreen) {
  return <div className="iv-approach-single"><ApproachScreenImage {...screen} /></div>
}

// ── Overview ──────────────────────────────────────────────────────────────────

/** The same chat, as the MVP shipped it (Stage 01) and after the restructuring (Stage 02) */
function ProductEvolution() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { selector: '.iv-evo-item', stagger: 160 })
  return (
    <div ref={ref} className="iv-evo" role="group" aria-label="The iVentas chat before and after the interface restructuring">
      <figure className="iv-evo-item iv-evo-mvp">
        <Inspectable src={`${A}/mvp-chat.png`} alt="iVentas MVP chat (Stage 01)" width={1200} block style={{ borderRadius: 10 }}>
          <img src={`${A}/mvp-chat.png`} alt="iVentas MVP chat (Stage 01): conversation list, open chat and contact details" width={803} height={572} loading="lazy" />
        </Inspectable>
        <figcaption className="iv-chip">Stage 01 · MVP</figcaption>
      </figure>
      <figure className="iv-evo-item iv-evo-new">
        <Inspectable src={screens.messages.src} alt="Restructured iVentas message panel (Stage 02)" width={1110} block style={{ borderRadius: 14 }}>
          <img src={screens.messages.src} alt="Restructured iVentas message panel (Stage 02)" width={740} height={508} loading="lazy" />
        </Inspectable>
        <figcaption className="iv-chip iv-chip-accent">Stage 02 · Restructured</figcaption>
      </figure>
    </div>
  )
}

// ── Context ───────────────────────────────────────────────────────────────────

// Role avatars from the Figma "Main target users" artifact (115:38932, 115:38957, 115:38978)
const roles = [
  { avatar: `${A}/role-sales.svg`, role: 'Sales representatives', focus: 'Managing leads' },
  { avatar: `${A}/role-service.svg`, role: 'Customer service representatives', focus: 'Resolving tickets' },
  { avatar: `${A}/role-supervisor.svg`, role: 'Team supervisors', focus: 'Monitoring performance across both' },
]

// ── Strategy ──────────────────────────────────────────────────────────────────

// Capability map (Figma 115:40375): the sub-features listed under each group
const capabilities = [
  { n: '01', title: 'Message panel', body: 'Centralizing every channel in one view.', parts: ['Chat list', 'Conversation history', 'Contact data'] },
  { n: '02', title: 'Contacts', body: 'Fast and organized customer management.', parts: ['Contact list', 'Query contact data', 'Add contact', 'Edit contact information', 'Import contact file'] },
  { n: '03', title: 'Multimedia', body: 'Reusable files instead of repeated uploads.', parts: ['Create albums', 'Incorporate media into an album', 'Manage media'] },
  { n: '04', title: 'Quick responses', body: 'Eliminating repetitive typing.', parts: ['List of automatic responses', 'Creation of responses', 'Manage responses'] },
  { n: '05', title: 'Team', body: 'Roles and collaboration in one place.', parts: ['Team list', 'Member information', 'Add new member'] },
  { n: '06', title: 'Account', body: 'Billing and company settings centralized.', parts: ['Data', 'Payment information'] },
]

/** Six capability columns — also the six items of the restructured product's navigation */
function CapabilityMap() {
  const ref = useRef<HTMLOListElement>(null)
  useReveal(ref, { selector: '.iv-cap', stagger: 70 })
  return (
    <div className="iv-caps-wrap">
      <ol ref={ref} className="iv-caps" aria-label="Six core capabilities">
        {capabilities.map(c => (
          <li key={c.n} className="iv-cap">
            <GradientText as="p" className="iv-cap-n">{c.n}</GradientText>
            <h3 className="iv-cap-title">{c.title}</h3>
            <p className="iv-cap-body">{c.body}</p>
            <ul className="iv-cap-parts">
              {c.parts.map(p => <li key={p}>{p}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ── Before → After ────────────────────────────────────────────────────────────

// Before states (Figma 122:45727, 122:46045, 122:46167): the Stage 01 screens, exported at 2×
const before = {
  conversations: { src: `${A}/before-conversations.png`, alt: 'iVentas MVP chat: conversation list with channel badges, an open conversation and the contact panel', width: 602, height: 429 },
  repetitive: { src: `${A}/before-repetitive.png`, alt: 'iVentas MVP “Inteligencia Artificial” section: setting up a chatbot welcome message next to a chat preview', width: 602, height: 429 },
  team: { src: `${A}/before-team.png`, alt: 'iVentas MVP team list: names, emails, roles and categories', width: 597, height: 430 },
}

function BeforeScreen({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <Inspectable src={src} alt={alt} width={width * 2} block style={{ borderRadius: 10 }}>
      <img className="iv-before-screen" src={src} alt={alt} width={width} height={height} loading="lazy" />
    </Inspectable>
  )
}

function AfterScreen({ src, alt }: { src: string; alt: string }) {
  return (
    <Inspectable src={src} alt={alt} width={1110} block style={{ borderRadius: 14 }}>
      <img className="iv-after-screen" src={src} alt={alt} width={740} height={508} loading="lazy" />
    </Inspectable>
  )
}

/** Team view, with the chat's "Assigned agent · Reassign" panel where ownership is handled */
function TeamAfter() {
  return (
    <div className="iv-team-after">
      <AfterScreen src={screens.team.src} alt={screens.team.alt} />
      <figure className="iv-team-inset">
        <Inspectable src={screens.messages.src} alt={screens.messages.alt} width={1110} block style={{ borderRadius: 12 }}>
          {/* Crop of the message panel's contact column (Figma 115:40423) */}
          <MediaFrame
            src={screens.messages.src}
            alt="Contact panel in the chat: assigned agent Fernando Espinoza with a Reassign action"
            aspectRatio="437 / 186"
            radius={12}
            background="#fff"
            crop={{ left: '-400.9%', top: '-338.7%', width: '508%', height: '820.4%' }}
          />
        </Inspectable>
      </figure>
    </div>
  )
}

// ── Testing ───────────────────────────────────────────────────────────────────

function Notes({ items }: { items: { n: number; tone: 'accent' | 'neutral'; text: string }[] }) {
  return (
    <ol className="iv-notes">
      {items.map(i => (
        <li key={i.n} className="iv-note"><Marker n={i.n} tone={i.tone} /><span>{i.text}</span></li>
      ))}
    </ol>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IVentasCase() {
  return (
    <CaseStudyPage theme={theme} sections={sections}>
      <CaseHero
        media={<HeroArtwork />}
        gap={56}
        eyebrow="iVentas CRM"
        lead="A CRM built to keep sales teams from"
        highlight="losing prospects in the noise."
      />

      {/* ── Overview ── */}
      <Section id="overview" background="#fff" gap={80} style={{ paddingTop: 80 }}>
        <SplitContent align="center">
          <TextBlock title="Overview">
            <p>iVentas helps businesses manage sales opportunities through direct channels like WhatsApp and Messenger.</p>
            <p>Once the MVP had validated the business model, I joined as UX/UI Designer for the interface restructuring stage, turning research and usability findings into a clearer, more organized product.</p>
          </TextBlock>
          <ProductEvolution />
        </SplitContent>
        <MetaBar items={[
          { label: 'My role', value: 'UX/UI Designer' },
          { label: 'Type of Project', value: 'Redesign' },
          { label: 'Client', value: 'iVentas' },
        ]} />
      </Section>

      {/* ── Context ── */}
      <Section id="context" background="#f3f3f3" style={{ paddingTop: 80 }}>
        <SplitContent align="center">
          <TextBlock title="Context">
            Used daily by three roles: sales representatives managing leads, customer service representatives resolving tickets, and team supervisors monitoring performance across both.
          </TextBlock>
          <Reveal as="ul" className="iv-roles" stagger={110} style={{ listStyle: 'none' }}>
            {roles.map(r => (
              <li key={r.role} className="iv-role">
                <img src={r.avatar} alt="" width={56} height={60} />
                <div>
                  <p className="iv-role-name">{r.role}</p>
                  <p className="cs-body-muted">{r.focus}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </SplitContent>
      </Section>

      {/* ── Problem ── */}
      <Section id="problem" title="Problem" background="#fbfafa">
        <Reveal className="cs-grid-3" selector=".cs-card" stagger={80}>
          <InsightCard title="Conversations lived everywhere" body="Prospects reached out through different channels, and reps had no single place to track them." />
          <InsightCard title="Follow ups fell through the cracks" body="Without a shared system, leads got missed or contacted twice." />
          <InsightCard title="Repetitive tasks slowed everyone down" body="Reps retyped the same answers and searched for the same info across tools." />
        </Reveal>
      </Section>

      {/* ── Design Approach: what the restructured product does (content: Figma 143:39218) ── */}
      <ApproachSection
        intro="Bringing conversations, contacts and shared sales content into one clear workspace."
        background="#fff"
        className="iv-approach"
      >
        <ApproachMoment
          icon={<IconConversations />}
          title="Centralize communication"
          body="Conversations from different channels come together in one message panel, with prospect information available alongside the conversation."
          accent={approachAccents.communication}
          visual={<ApproachVisual {...screens.messages} />}
        />
        <ApproachMoment
          side="start"
          icon={<IconWorkspace />}
          title="Organize the sales workspace"
          body="Contacts can be viewed, filtered and organized in one place, keeping prospect information accessible in the same workspace."
          accent={approachAccents.workspace}
          visual={<ApproachVisual {...screens.contacts} />}
        />
        <ApproachMoment
          icon={<IconContent />}
          title="Keep sales content within reach"
          body="Shared images and documents stay organized in one place, ready to use when communicating with prospects."
          accent={approachAccents.content}
          visual={<ApproachVisual {...screens.multimedia} />}
        />
      </ApproachSection>

      {/* ── Research ── */}
      <Section id="research" background="#fff" gap={48}>
        <div className="iv-intro">
          <TextBlock title="Research">
            12 in-depth interviews across industries surfaced the same needs, despite different contexts.
          </TextBlock>
        </div>
        <div className="cs-stack" style={{ gap: 24 }}>
          <h3 className="cs-subtitle">Findings</h3>
          <Reveal className="cs-grid-3" selector=".cs-card" stagger={100}>
            <QuoteCard variant="finding" title="Unclear conversation ownership" quote="Reps needed to know whether a teammate had already responded to a lead." />
            <QuoteCard variant="finding" title="Repetitive communication" quote="Reps typed the same responses throughout the day." />
            <QuoteCard variant="finding" title="Fragmented customer context" quote="Reps needed one place to understand a client's history." />
          </Reveal>
        </div>
      </Section>

      {/* ── Strategy: from recurring needs to a product structure ── */}
      <Section id="strategy" background="#fbfafa" gap={48}>
        <div className="cs-stack iv-intro" style={{ gap: 16 }}>
          <h2 className="cs-title">Strategy</h2>
          <h3 className="cs-subtitle">From recurring needs to a product structure</h3>
          <p className="cs-body">
            Research pointed to one underlying need: reps needed fewer places to look, fewer repetitive actions, and clearer ownership of every conversation. Those needs shaped six core capabilities:
          </p>
        </div>
        <CapabilityMap />
      </Section>

      {/* ── Testing (on the Stage 01 MVP) ── */}
      <Section id="testing" background="#fff" gap={48}>
        <div className="iv-intro">
          <TextBlock title="Testing">
            <p>We ran 6 usability tests. They confirmed the chat interface felt familiar, since it matched patterns from WhatsApp and Messenger. Reassigning conversations between agents also improved workflow distribution.</p>
            <p>On the other side, action buttons in team management were too small, and tags could only be deleted and rebuilt, not edited.</p>
          </TextBlock>
        </div>

        <Reveal className="iv-test iv-test-worked" selector=".iv-test-media, .iv-test-notes" stagger={140}>
          <div className="iv-test-media">
            <AnnotatedScreen
              src={`${A}/mvp-chat.png`}
              alt="iVentas MVP chat tested with users: conversation list with the assigned agent on each lead, and a Reassign action in the contact panel"
              width={803}
              height={572}
              detailWidth={1200}
              radius={10}
              markers={[
                { n: 1, x: '36.5%', y: '33%' },
                { n: 2, x: '97.6%', y: '19.3%' },
              ]}
            />
            <p className="iv-screen-label">MVP · Chat</p>
          </div>
          <div className="iv-test-notes">
            <h3 className="cs-subtitle">What worked</h3>
            <Notes items={[
              { n: 1, tone: 'accent', text: 'Familiar chat patterns, matching WhatsApp and Messenger' },
              { n: 2, tone: 'accent', text: 'Reassigning conversations between agents' },
            ]} />
          </div>
        </Reveal>

        <Reveal className="iv-test iv-test-iterate" selector=".iv-test-media, .iv-test-notes" stagger={140}>
          <div className="iv-test-notes">
            <h3 className="cs-subtitle">What needed iteration</h3>
            <Notes items={[
              { n: 3, tone: 'neutral', text: 'Action buttons in team management were too small' },
              { n: 4, tone: 'neutral', text: 'Tags could only be deleted and rebuilt, not edited' },
            ]} />
          </div>
          <div className="iv-test-media iv-test-pair">
            <div>
              <AnnotatedScreen
                src={`${A}/mvp-team.png`}
                alt="iVentas MVP team management: a small add button above the member table"
                width={597}
                height={430}
                detailWidth={1100}
                radius={10}
                markers={[{ n: 3, x: '23.5%', y: '12.5%', tone: 'neutral' }]}
              />
              <p className="iv-screen-label">MVP · Team</p>
            </div>
            <div>
              <AnnotatedScreen
                src={`${A}/mvp-tags.png`}
                alt="iVentas MVP tags list with names and creation dates, and no edit action"
                width={602}
                height={429}
                detailWidth={1100}
                radius={10}
                markers={[{ n: 4, x: '28%', y: '34.4%', tone: 'neutral' }]}
              />
              <p className="iv-screen-label">MVP · Tags</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Before → After: Stage 01 screens → restructured product ── */}
      <Section id="before-after" title="Before → After" background="#f8f8f8" gap={80}>
        <BeforeAfter
          title="Conversations"
          arrow={ARROW}
          before={{
            media: <BeforeScreen {...before.conversations} />,
            text: 'Scattered across separate apps, with no shared visibility between reps.',
          }}
          after={{
            media: <AfterScreen {...screens.messages} />,
            text: 'One message panel, with conversations reassignable between agents.',
          }}
        />

        <Divider />

        <BeforeAfter
          title="Repetitive tasks"
          arrow={ARROW}
          before={{
            media: <BeforeScreen {...before.repetitive} />,
            text: 'Reps retyped common answers throughout the day.',
          }}
          after={{
            media: <AfterScreen {...screens.quickResponses} />,
            text: 'Saved quick responses, reused with one click.',
          }}
        />

        <Divider />

        <BeforeAfter
          title="Team visibility"
          arrow={ARROW}
          before={{
            media: <BeforeScreen {...before.team} />,
            text: 'No way to see who was handling which client.',
          }}
          after={{
            media: <TeamAfter />,
            text: 'A team view showing roles and activity, with conversation ownership and reassignment handled directly from the chat.',
          }}
        />
      </Section>

      {/* ── Impact: beyond the MVP → real business use (Vinte) → +60% engagement ── */}
      <Section id="impact" title="Impact" background="#fff" className="iv-impact" gap={40}>
        <p className="cs-body iv-intro">
          Beyond the MVP, iVentas was used in real business contexts. Vinte, a real estate company operating across six states, adopted the CRM to centralize a large, constantly changing customer base, prioritize high-value clients, and give agents a clear structure for their day.
        </p>
        <Reveal selector=".cs-card, .iv-support, .cs-takeaway" stagger={90}>
          <SplitContent>
            <div className="iv-impact-col">
              <MetricCard value="+60%" label="CRM engagement" />
              <div className="iv-support">
                <p className="iv-support-title">Adopted by Vinte</p>
                <p className="cs-body-muted">A real estate company operating across six states.</p>
              </div>
              <div className="iv-support">
                <p className="iv-support-title">From MVP to a restructured product</p>
                <p className="cs-body-muted">The product evolved beyond its first version as the CRM matured.</p>
              </div>
            </div>
            <TakeawayCard className="iv-closing" image={{ src: `${A}/impact-ipad.png`, alt: 'iVentas Multimedia on an iPad held in one hand, showing Vinte property albums by state' }}>
              <strong style={{ fontWeight: 700 }}>The challenge wasn't adding more tools. It was reducing the friction around conversations.</strong> Centralizing channels and ownership made iVentas fit more naturally into sales teams' daily work.
            </TakeawayCard>
          </SplitContent>
        </Reveal>
      </Section>
    </CaseStudyPage>
  )
}
