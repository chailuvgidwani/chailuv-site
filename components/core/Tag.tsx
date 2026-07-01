import React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** @default "outline" */
  variant?: "outline" | "solid" | "soft" | "ghost";
  /** @default "neutral" */
  tone?: "neutral" | "blue" | "gold";
  /** @default "md" */
  size?: "sm" | "md";
  /** Leading status dot. @default false */
  dot?: boolean;
  style?: React.CSSProperties;
}

/**
 * Tag — a small mono label/pill. The "detail voice" made into a chip:
 * uppercase IBM Plex Mono, wide tracking. Used for categories, statuses,
 * filters, and metadata keys.
 */
export function Tag({
  children,
  variant = "outline",
  tone = "neutral",
  size = "md",
  dot = false,
  style = {},
  ...props
}: TagProps) {
  const tones = {
    neutral: { fg: "var(--text-secondary)", line: "var(--rule-strong)", solidBg: "var(--ink-900)", solidFg: "var(--egg-50)", soft: "var(--neutral-100)" },
    blue: { fg: "var(--accent)", line: "var(--blue-200)", solidBg: "var(--accent)", solidFg: "var(--text-on-blue)", soft: "var(--accent-soft)" },
    gold: { fg: "var(--gold-700)", line: "var(--gold-400)", solidBg: "var(--gold-500)", solidFg: "var(--ink-900)", soft: "var(--gold-100)" },
  } as const;
  const t = tones[tone] || tones.neutral;
  const sz =
    size === "sm"
      ? { fontSize: 10.5, padding: "3px 7px", gap: 6 }
      : { fontSize: 11.5, padding: "5px 10px", gap: 7 };

  const looks: Record<string, React.CSSProperties> = {
    outline: { background: "transparent", color: t.fg, border: `1px solid ${t.line}` },
    solid: { background: t.solidBg, color: t.solidFg, border: "1px solid transparent" },
    soft: { background: t.soft, color: t.fg, border: "1px solid transparent" },
    ghost: { background: "transparent", color: t.fg, border: "1px solid transparent", padding: 0 },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: sz.gap,
        fontFamily: "var(--font-mono)",
        fontSize: sz.fontSize,
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        lineHeight: 1,
        padding: (looks[variant].padding as string | number) ?? sz.padding,
        borderRadius: "var(--radius-1)",
        whiteSpace: "nowrap",
        ...looks[variant],
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", flex: "none" }} />
      )}
      {children}
    </span>
  );
}
