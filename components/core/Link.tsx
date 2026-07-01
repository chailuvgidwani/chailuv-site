"use client";

import React from "react";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  href?: string;
  /** @default "blue" */
  tone?: "blue" | "ink" | "onDark";
  /** Trailing arrow that nudges on hover. @default false */
  arrow?: boolean;
  style?: React.CSSProperties;
}

/**
 * Link — text link with a gold underline that wipes in from the left
 * on hover. Quiet by default; the motion is the affordance. Optional
 * trailing arrow for "more" links.
 */
export function Link({
  children,
  href = "#",
  tone = "blue",
  arrow = false,
  style = {},
  ...props
}: LinkProps) {
  const colors = {
    blue: { fg: "var(--text-link)", line: "var(--highlight)" },
    ink: { fg: "var(--text-primary)", line: "var(--highlight)" },
    onDark: { fg: "var(--egg-50)", line: "var(--blue-300)" },
  } as const;
  const c = colors[tone] || colors.blue;

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const u = e.currentTarget.querySelector<HTMLElement>("[data-u]");
    if (u) u.style.transform = "scaleX(1)";
    const a = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
    if (a) a.style.transform = "translateX(3px)";
  };
  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const u = e.currentTarget.querySelector<HTMLElement>("[data-u]");
    if (u) u.style.transform = "scaleX(0)";
    const a = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
    if (a) a.style.transform = "none";
  };

  return (
    <a
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        color: c.fg,
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        textDecoration: "none",
        paddingBottom: 2,
        ...style,
      }}
      {...props}
    >
      <span style={{ position: "relative" }}>
        {children}
        <span
          data-u
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -2,
            height: 1.5,
            background: c.line,
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform var(--dur-base) var(--ease-out)",
          }}
        />
      </span>
      {arrow && (
        <span
          data-arrow
          style={{
            display: "inline-block",
            transition: "transform var(--dur-base) var(--ease-out)",
            fontFamily: "var(--font-mono)",
          }}
        >
          →
        </span>
      )}
    </a>
  );
}
