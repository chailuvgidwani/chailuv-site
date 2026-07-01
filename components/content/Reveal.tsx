"use client";

import React from "react";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: any;
  /** Stagger delay in ms. @default 0 */
  delay?: number;
  /** Lift distance in px. @default 14 */
  travel?: number;
  /** Reveal once, or re-hide when out of view. @default true */
  once?: boolean;
  style?: React.CSSProperties;
}

/**
 * Reveal — wraps content and fades + lifts it ~14px into place as it
 * scrolls into view. The system's signature ambient motion.
 *
 * Robustness contract: VISIBLE is the guaranteed default. At mount we do a
 * SYNCHRONOUS in-view check — anything already on screen is left exactly at
 * the visible base state and NEVER touches a CSS transition, so it can't be
 * stranded if paint/rAF is frozen (print/PDF, suspended tabs, capture envs).
 * Only content confirmed OFF-screen at mount is hidden and then animated in
 * when scrolled into view. Honours prefers-reduced-motion.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  travel = 14,
  once = true,
  style = {},
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  const useIsoEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
  useIsoEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // stays at the visible base style

    const scroller: HTMLElement | Window = document.getElementById("kit-scroll") || window;
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };

    // Already on screen at mount: leave it visible, untouched. No transition
    // is ever applied, so a frozen-paint environment cannot strand it.
    if (inView()) return;

    const hiddenTransform = `translateY(${travel}px)`;
    const transition = `opacity var(--dur-reveal) var(--ease-out) ${delay}ms, transform var(--dur-reveal) var(--ease-out) ${delay}ms`;

    // Off-screen at mount: hide (no hide animation), then animate in later.
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = hiddenTransform;
    el.style.willChange = "opacity, transform";
    void el.offsetHeight; // commit hidden state
    el.style.transition = transition;

    const reveal = () => {
      el.style.transition = transition;
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    const revealNow = () => {
      // no-transition reveal, for print
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    // Robustness for client-side route changes: the element may be measured as
    // off-screen at mount (the window can still be at the previous route's
    // scroll position for a frame) and then be scrolled to the top. Re-check on
    // the next frame so above-the-fold content reveals immediately instead of
    // waiting for a scroll event that may never come.
    const raf = requestAnimationFrame(() => {
      if (inView()) reveal();
    });

    let io: IntersectionObserver | null = null;
    let onScroll: (() => void) | null = null;
    const teardown = () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      if (onScroll) scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeprint", revealNow);
    };

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            reveal();
            if (once) teardown();
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
    }
    // Manual scroll fallback — always on, so a dead IO can't strand content.
    onScroll = () => {
      if (inView()) {
        reveal();
        if (once && !io) teardown();
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    // Print hardening: make sure hidden content prints.
    window.addEventListener("beforeprint", revealNow);

    return teardown;
  }, [once, delay, travel]);

  const Tag = as;
  return (
    <Tag ref={ref} style={{ opacity: 1, transform: "none", ...style }} {...props}>
      {children}
    </Tag>
  );
}
