import React, { useEffect, useRef } from 'react'
import { useReveal } from './motion'
import { Inspectable } from './lightbox'

// Building blocks for case-study pages. Visual values come from the Figma
// case-study frames; styling lives in case-study.css.

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

// ── Text ──────────────────────────────────────────────────────────────────────

/** Accent-gradient text. `angle` matches the per-layer gradient angle in Figma. */
export function GradientText({ as: Tag = 'span', angle, className, style, children }: {
  as?: React.ElementType
  angle?: number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <Tag className={cx('cs-gradient-text', className)} style={{ ...(angle ? { '--cs-angle': `${angle}deg` } : null), ...style } as React.CSSProperties}>
      {children}
    </Tag>
  )
}

export function Divider() {
  return <div className="cs-divider" role="presentation" />
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="cs-bullets">
      {items.map((item, i) => <li key={i} className="cs-body">{item}</li>)}
    </ul>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────────

/**
 * Hero: artwork, project name and a headline with an accent-gradient phrase.
 * Pass `artwork` for a single image, or `media` for a composed artwork (layered HTML).
 */
export function CaseHero({ artwork, media, gap, eyebrow, lead, highlight, highlightAngle }: {
  artwork?: { src: string; width: number; height: number; alt?: string }
  media?: React.ReactNode
  /** Space between the artwork and the project name */
  gap?: number
  eyebrow: string
  lead: string
  highlight: string
  highlightAngle?: number
}) {
  // Entrance: artwork, then project name, then headline
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { selector: '.cs-hero-art, .cs-hero-eyebrow, .cs-hero-title', stagger: 130 })
  return (
    <header className="cs-hero">
      <div ref={ref} className="cs-hero-inner">
        {media
          ? <div className="cs-hero-art" style={{ width: '100%', marginBottom: gap }}>{media}</div>
          : artwork && (
            <img
              className="cs-hero-art"
              src={artwork.src}
              alt={artwork.alt ?? ''}
              width={artwork.width}
              height={artwork.height}
              style={{ width: `min(${artwork.width}px, 100%)`, marginBottom: gap }}
            />
          )}
        <p className="cs-hero-eyebrow">{eyebrow}</p>
        <h1 className="cs-hero-title">
          <span>{lead}</span>{' '}
          <GradientText angle={highlightAngle} style={{ fontWeight: 600 }}>{highlight}</GradientText>
        </h1>
      </div>
    </header>
  )
}

/** Full-bleed section with a 940px content column and optional section title. */
export function Section({ id, title, titleAlign, background, gap = 40, className, style, children }: {
  /** Anchor for the side navigation */
  id?: string
  title?: React.ReactNode
  titleAlign?: 'left' | 'center'
  background?: string
  /** Vertical gap between the title and each direct child block */
  gap?: number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cx('cs-section', className)} style={{ background, ...style }}>
      <div className="cs-container" style={{ '--cs-gap': `${gap}px` } as React.CSSProperties}>
        {title && <h2 className="cs-title" style={titleAlign ? { textAlign: titleAlign } : undefined}>{title}</h2>}
        {children}
      </div>
    </section>
  )
}

/** Two equal columns (text + media) that stack on mobile. */
export function SplitContent({ align = 'stretch', gap, children, style }: {
  align?: React.CSSProperties['alignItems']
  gap?: number
  children: [React.ReactNode, React.ReactNode]
  style?: React.CSSProperties
}) {
  return (
    <div className="cs-split" style={{ alignItems: align, columnGap: gap, ...style }}>
      {children}
    </div>
  )
}

/** Title + paragraphs block used at the start of most sections. */
export function TextBlock({ title, children, gap = 16 }: { title: React.ReactNode; children: React.ReactNode; gap?: number }) {
  return (
    <div className="cs-stack" style={{ gap }}>
      <h2 className="cs-title">{title}</h2>
      <div className="cs-body">{children}</div>
    </div>
  )
}

/** Role / project type / client row with vertical rules. */
export function MetaBar({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="cs-meta">
      {items.map(item => (
        <div key={item.label} className="cs-meta-item">
          <dt className="cs-body-muted">{item.label}</dt>
          <dd className="cs-subtitle">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// ── Cards & metrics ───────────────────────────────────────────────────────────

/** Gradient value with a muted label underneath. */
export function Stat({ value, label, angle = 126 }: { value: React.ReactNode; label: React.ReactNode; angle?: number }) {
  return (
    <div className="cs-stat">
      <GradientText as="p" angle={angle} className="cs-stat-value">{value}</GradientText>
      <p className="cs-body-muted">{label}</p>
    </div>
  )
}

/** Outlined card with a centered heading and free-form metric content. */
export function StatCard({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="cs-card-outline" style={{ borderRadius: 32, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <p className="cs-subtitle" style={{ textAlign: 'center' }}>{label}</p>
        {children}
      </div>
    </div>
  )
}

/** Audience / pain-point card: title, description and (optionally) a rule + supporting stat. */
export function InsightCard({ title, body, stat }: { title: string; body: React.ReactNode; stat?: { value: string; label: string } }) {
  return (
    <div className={cx('cs-card cs-insight', !stat && 'cs-insight-compact')}>
      <h3 className="cs-subtitle">{title}</h3>
      <p className="cs-body cs-insight-body">{body}</p>
      {stat && <>
        <div className="cs-insight-rule" role="presentation" />
        <Stat value={stat.value} label={stat.label} />
      </>}
    </div>
  )
}

/** Numbered objective / principle card, optionally pointing to where it is shown on the page. */
export function NumberedCard({ number, title, body, link }: {
  number: string
  title: string
  body?: string
  /** Quiet in-page link to the section that shows this item */
  link?: { href: string; label: string }
}) {
  return (
    <div className="cs-card cs-card-outline cs-stack" style={{ gap: 4 }}>
      <GradientText as="p" angle={143} className="cs-number">{number}</GradientText>
      <h3 className="cs-subtitle">{title}</h3>
      {body && <p className="cs-body">{body}</p>}
      {link && (
        <a
          className="cs-card-link"
          href={link.href}
          onClick={e => {
            // Same in-page scroll as the side navigation (no hash in the URL)
            const el = document.getElementById(link.href.slice(1))
            if (!el) return
            e.preventDefault()
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          {link.label}<span aria-hidden> ↓</span>
        </a>
      )}
    </div>
  )
}

/** Outlined outcome card: gradient metric + description (and an optional from → to detail). */
export function MetricCard({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return (
    <div className="cs-card cs-card-outline">
      <div className="cs-stat">
        <GradientText as="p" angle={140} className="cs-stat-value">{value}</GradientText>
        <p className="cs-body">{label}</p>
        {detail && <p className="cs-body-muted">{detail}</p>}
      </div>
    </div>
  )
}

/** Participant quote, optionally with a quiet attribution line. The mark opens the quote. */
export function QuoteCard({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <figure className="cs-card cs-card-outline cs-quote">
      <GradientText as="span" angle={140} className="cs-quote-mark">“</GradientText>
      <blockquote className="cs-quote-text">{quote}</blockquote>
      {attribution && <figcaption className="cs-body-muted">{attribution}</figcaption>}
    </figure>
  )
}

/** Tinted panel pairing a statement with a highlighted figure. */
export function HighlightPanel({ title, body, stat }: {
  title: string
  body: string
  stat: { value: string; body: string }
}) {
  return (
    <div className="cs-highlight">
      <TextBlock title={title}>{body}</TextBlock>
      <div className="cs-highlight-stat">
        <GradientText as="p" angle={100} className="cs-title">{stat.value}</GradientText>
        <p className="cs-body">{stat.body}</p>
      </div>
    </div>
  )
}

/** Dark closing card with a statement and a device image anchored below it. */
export function TakeawayCard({ label, children, image, className }: {
  label: string
  children: React.ReactNode
  image: { src: string; alt: string }
  className?: string
}) {
  return (
    <div className={cx('cs-takeaway', className)}>
      <p className="cs-takeaway-label">{label}</p>
      <p className="cs-takeaway-text">{children}</p>
      <div className="cs-takeaway-media">
        <img src={image.src} alt={image.alt} loading="lazy" />
      </div>
    </div>
  )
}

// ── Media ─────────────────────────────────────────────────────────────────────

/**
 * Image inside a clipping frame. `crop` reproduces Figma's image-fill crop:
 * the image's size and offset as percentages of the frame.
 */
export function MediaFrame({ src, alt, aspectRatio, width, height, radius = 0, background, crop, className, style }: {
  src: string
  alt: string
  aspectRatio?: string
  width?: number | string
  height?: number | string
  radius?: number
  background?: string
  crop?: { left: string; top: string; width: string; height: string }
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={cx('cs-media', className)} style={{ aspectRatio, width, height, borderRadius: radius, background, ...style }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={crop ?? { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

/**
 * Row of device mockups (any count, including one); becomes a swipeable strip on
 * narrower screens. Devices reveal with a light stagger as the row enters view,
 * and open in the lightbox when `detailWidth` is set.
 */
export function DeviceShowcase({ devices, width, height, detailWidth }: {
  /** `caption` adds a short line under the device */
  devices: { src: string; alt: string; caption?: React.ReactNode }[]
  width: number
  height: number
  /** When set, each device opens in the lightbox at this width */
  detailWidth?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { selector: ':scope > *', stagger: 90 })
  return (
    <div ref={ref} className="cs-devices" role="list">
      {devices.map(d => {
        const img = <img src={d.src} alt={d.alt} loading="lazy" />
        const device = (
          <div className="cs-device" role={d.caption ? undefined : 'listitem'} style={{ width, height }}>
            {detailWidth
              ? <Inspectable src={d.src} alt={d.alt} width={detailWidth} block style={{ height: '100%', borderRadius: 32 }}>{img}</Inspectable>
              : img}
          </div>
        )
        return d.caption
          ? (
            <figure key={d.src} className="cs-device-figure" role="listitem" style={{ width }}>
              {device}
              <figcaption className="cs-device-caption">{d.caption}</figcaption>
            </figure>
          )
          : <React.Fragment key={d.src}>{device}</React.Fragment>
      })}
    </div>
  )
}

type BeforeAfterSide = { media: React.ReactNode; text: React.ReactNode }

/** Titled Before → After comparison. Stacks vertically on mobile. */
export function BeforeAfter({ title, before, after, arrow, textGap = 8 }: {
  title: string
  before: BeforeAfterSide
  after: BeforeAfterSide
  arrow: string
  textGap?: number
}) {
  // Before → arrow → After, revealed in reading order
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { stagger: 140 })
  return (
    <div className="cs-stack" style={{ gap: 16 }}>
      <h3 className="cs-subtitle">{title}</h3>
      <div ref={ref} className="cs-ba">
        <div className="cs-ba-card cs-ba-before">
          <div className="cs-ba-media">{before.media}</div>
          <div className="cs-ba-text" style={{ gap: textGap }}>
            <p className="cs-ba-label">Before</p>
            <p className="cs-body">{before.text}</p>
          </div>
        </div>
        <div className="cs-ba-arrow" aria-hidden>
          <img src={arrow} alt="" />
        </div>
        <div className="cs-ba-card cs-ba-after">
          <div className="cs-ba-media">{after.media}</div>
          <div className="cs-ba-text" style={{ gap: textGap }}>
            <GradientText as="p" angle={140} className="cs-subtitle">After</GradientText>
            <p className="cs-body">{after.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

type ShowcaseImage = { src: string; alt: string; width: number; height: number }

/**
 * A featured device flanked by two framed screenshots that run past the content
 * column to the viewport edges. Sizes are the design's px at `baseWidth` (the
 * content column) and scale with the column. The composition stays centered on
 * the content column; next to the desktop side nav its left edge fades out so it
 * never runs under the navigation. On mobile it becomes a swipeable strip.
 */
export function BleedShowcase({ center, sides, baseWidth = 940, radius = 24, detailWidth }: {
  center: ShowcaseImage
  sides: [ShowcaseImage, ShowcaseImage]
  baseWidth?: number
  /** Corner radius of the framed side screenshots */
  radius?: number
  /** When set, every image opens in the lightbox at up to this width */
  detailWidth?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Featured device first, then the flanking screenshots
  useReveal(ref, { selector: '.cs-bleed-item', stagger: 110 })

  // When the row scrolls (mobile strip), open it on the featured device
  useEffect(() => {
    const row = ref.current
    if (!row) return
    const centerOnFeatured = () => {
      const featured = row.querySelector<HTMLElement>('[data-slot="center"]')
      if (!featured || row.scrollWidth <= row.clientWidth) return
      const f = featured.getBoundingClientRect()
      const r = row.getBoundingClientRect()
      row.scrollLeft += f.left + f.width / 2 - (r.left + r.width / 2)
    }
    centerOnFeatured()
    const mq = window.matchMedia('(max-width: 720px)')
    mq.addEventListener('change', centerOnFeatured)
    return () => mq.removeEventListener('change', centerOnFeatured)
  }, [])

  const item = (img: ShowcaseImage, slot: 'center' | 'start' | 'end') => {
    const framed = slot !== 'center'
    const content = <img src={img.src} alt={img.alt} loading="lazy" style={framed ? { borderRadius: radius } : undefined} />
    return (
      <div
        key={slot}
        className={cx('cs-bleed-item', framed && 'cs-bleed-framed')}
        data-slot={slot}
        role="listitem"
        style={{ '--w': img.width, '--h': img.height, '--r': `${radius}px` } as React.CSSProperties}
      >
        {detailWidth
          ? <Inspectable src={img.src} alt={img.alt} width={detailWidth} block style={{ height: '100%', borderRadius: framed ? radius : 16 }}>{content}</Inspectable>
          : content}
      </div>
    )
  }

  return (
    <div ref={ref} className="cs-bleed" role="list" style={{ '--base': baseWidth } as React.CSSProperties}>
      {item(center, 'center')}
      {item(sides[0], 'start')}
      {item(sides[1], 'end')}
    </div>
  )
}

/**
 * Full-bleed colored band with a short statement beside an image that sits flush
 * on the band's bottom edge (e.g. a device crop). Colors come from props, so the
 * band carries no project styling of its own.
 */
export function InterludeBand({ background, ink, image, children }: {
  background: string
  /** Statement color; keep ≥3:1 against the background (large text) */
  ink?: string
  image: { src: string; alt: string; width: number; height: number }
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { selector: '.cs-interlude-text, .cs-interlude-media', stagger: 160 })
  return (
    <section className="cs-interlude" style={{ background, '--cs-interlude-ink': ink } as React.CSSProperties}>
      <div ref={ref} className="cs-container cs-interlude-inner">
        <p className="cs-interlude-text">{children}</p>
        <div className="cs-interlude-media">
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
        </div>
      </div>
    </section>
  )
}
