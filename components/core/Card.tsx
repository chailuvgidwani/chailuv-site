"use client";

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** @default "outline" */
  variant?: "outline" | "raised" | "ink" | "accent";
  /** Adds a lift on hover. @default false */
  interactive?: boolean;
  /** 2px blue top edge. @default false */
  topAccent?: boolean;
  /** @default "lg" */
  padding?: "none" | "sm" | "md" | "lg";
  as?: any;
  style?: React.CSSProperties;
}

/**
 * Card — a surface bounded by a hairline rule, not a shadow. Optional
 * blue top-edge accent, optional hover lift. The default container for
 * work entries, notes, and grouped content.
 */
export function Card({
  children,
  variant = "outline",
  interactive = false,
  topAccent = false,
  padding = "lg",
  as = "div",
  style = {},
  ...props
}: CardProps) {
  const pads: Record<string, number | string> = {
    none: 0,
    sm: "var(--space-4)",
    md: "var(--space-5)",
    lg: "var(--space-6)",
  };

  const variants: Record<string, React.CSSProperties> = {
    outline: { background: "var(--color-surface)", color: "var(--text-primary)", boxShadow: "var(--shadow-flat)" },
    raised: { background: "var(--color-surface)", color: "var(--text-primary)", boxShadow: "var(--shadow-md)" },
    ink: { background: "var(--color-surface-ink)", color: "var(--text-on-dark)", boxShadow: "none" },
    accent: { background: "var(--accent)", color: "var(--text-on-blue)", boxShadow: "none" },
  };

  const Tag = as;
  const v = variants[variant] || variants.outline;

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = (v.boxShadow as string) ?? "none";
  };

  return (
    <Tag
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        borderRadius: "var(--radius-3)",
        padding: pads[padding],
        ...v,
        borderTop: topAccent ? "2px solid var(--accent)" : undefined,
        cursor: interactive ? "pointer" : undefined,
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
