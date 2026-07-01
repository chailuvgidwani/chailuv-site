"use client";

import React from "react";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  children?: React.ReactNode;
  /** Visual weight. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "quiet";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as another element/tag, e.g. "a". @default "button" */
  as?: any;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Stretch to container width. @default false */
  full?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Button — the primary action element.
 * Near-square, grotesk label, quiet motion. Gold accent appears
 * only on the optional "marker" underline of quiet buttons.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  iconLeft = null,
  iconRight = null,
  full = false,
  disabled = false,
  style = {},
  ...props
}: ButtonProps) {
  const sizes: Record<string, React.CSSProperties & { gap: number; height: number }> = {
    sm: { fontSize: 13, padding: "8px 14px", gap: 8, height: 34 },
    md: { fontSize: 15, padding: "11px 20px", gap: 9, height: 44 },
    lg: { fontSize: 16, padding: "15px 26px", gap: 10, height: 52 },
  };
  const s = sizes[size] || sizes.md;

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: s.fontSize,
    letterSpacing: "-0.005em",
    lineHeight: 1,
    height: s.height,
    padding: s.padding,
    width: full ? "100%" : "auto",
    borderRadius: "var(--radius-2)",
    border: "1.5px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition:
      "background var(--dur-fast) var(--ease-precise), color var(--dur-fast) var(--ease-precise), border-color var(--dur-fast) var(--ease-precise), transform var(--dur-fast) var(--ease-precise)",
    WebkitTapHighlightColor: "transparent",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--accent)",
      color: "var(--text-on-blue)",
      borderColor: "var(--accent)",
    },
    secondary: {
      background: "transparent",
      color: "var(--text-primary)",
      borderColor: "var(--rule-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "transparent",
    },
    quiet: {
      background: "transparent",
      color: "var(--text-primary)",
      borderColor: "transparent",
      padding: 0,
      height: "auto",
      borderRadius: 0,
    },
  };

  const isQuiet = variant === "quiet";
  const merged = { ...base, ...(variants[variant] || variants.primary), ...style };

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    if (variant === "primary") e.currentTarget.style.background = "var(--accent-hover)";
    if (variant === "secondary") e.currentTarget.style.borderColor = "var(--ink-900)";
    if (variant === "ghost") e.currentTarget.style.background = "var(--accent-soft)";
    if (!isQuiet) e.currentTarget.style.transform = "translateY(-1px)";
    const u = e.currentTarget.querySelector<HTMLElement>("[data-quiet-underline]");
    if (u) u.style.transform = "scaleX(1)";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    e.currentTarget.style.background = (variants[variant].background as string) ?? "";
    e.currentTarget.style.borderColor = (variants[variant].borderColor as string) ?? "";
    e.currentTarget.style.transform = "none";
    const u = e.currentTarget.querySelector<HTMLElement>("[data-quiet-underline]");
    if (u) u.style.transform = "scaleX(0)";
  };
  const onDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled && !isQuiet) e.currentTarget.style.transform = "scale(var(--press-scale))";
  };
  const onUp = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled && !isQuiet) e.currentTarget.style.transform = "translateY(-1px)";
  };

  const Tag = as;
  return (
    <Tag
      style={merged}
      disabled={as === "button" ? disabled : undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...props}
    >
      {iconLeft}
      {isQuiet ? (
        <span style={{ position: "relative", paddingBottom: 4 }}>
          {children}
          <span
            data-quiet-underline
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              background: "var(--highlight)",
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform var(--dur-base) var(--ease-out)",
            }}
          />
        </span>
      ) : (
        <span>{children}</span>
      )}
      {iconRight}
    </Tag>
  );
}
