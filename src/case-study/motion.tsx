import React, { useEffect, useRef, type RefObject } from 'react'

// Case-study motion system: staggered reveals driven by IntersectionObserver and CSS
// transitions (see "Motion" in case-study.css). Items fade in with a small upward
// offset when their container enters view, and quietly reset once it is well out of
// view, so they replay on return. `prefers-reduced-motion` shows everything immediately.

/**
 * Reveals the items inside `ref` when the container enters the viewport and resets them
 * after it has clearly left. Two observers give hysteresis, so content sitting near an
 * edge never flickers:
 *  - enter: ≥15% of the container is inside the viewport (minus a small bottom inset)
 *  - leave: the container is entirely outside the viewport extended by 25% on each side
 * Items are matched by `selector` (default: direct children) and staggered in DOM order,
 * so a single item simply reveals without a stagger.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, { selector = ':scope > *', stagger = 80 } = {}) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = [...root.querySelectorAll<HTMLElement>(selector)]
    items.forEach((el, i) => {
      el.classList.add('cs-reveal-item')
      el.style.setProperty('--i', String(i))
    })
    root.style.setProperty('--cs-stagger', `${stagger}ms`)

    if (!('IntersectionObserver' in window)) {
      root.setAttribute('data-revealed', '')
      return
    }

    // Very tall containers can never be 15% visible, so a quarter-screen of it also counts
    const enter = new IntersectionObserver(([e]) => {
      const rootH = e.rootBounds?.height ?? window.innerHeight
      if (e.isIntersecting && (e.intersectionRatio >= 0.15 || e.intersectionRect.height >= rootH * 0.25)) {
        root.setAttribute('data-revealed', '')
      }
    }, { threshold: [0, 0.02, 0.05, 0.1, 0.15], rootMargin: '0px 0px -8% 0px' })

    const leave = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) root.removeAttribute('data-revealed')
    }, { threshold: 0, rootMargin: '25% 0px 25% 0px' })

    enter.observe(root)
    leave.observe(root)
    return () => {
      enter.disconnect()
      leave.disconnect()
    }
  }, [ref, selector, stagger])
}

/** Wrapper form of `useReveal` for arbitrary content (one image, a grid of cards, …). */
export function Reveal({ as: Tag = 'div', selector, stagger, className, style, children }: {
  as?: React.ElementType
  selector?: string
  stagger?: number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, { selector, stagger })
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>
}
