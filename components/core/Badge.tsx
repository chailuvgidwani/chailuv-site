import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** @default "blue" */
  tone?: "blue" | "gold" | "neutral" | "green";
  style?: React.CSSProperties;
}

/**
 * Badge — a small count or status marker. Distinct from Tag (which is a
 * mono label): Badge is compact, often numeric, and can sit on a corner.
 */
export function Badge({ children, tone = "blue", style = {}, ...props }: BadgeProps) {
  const tones = {
    blue: { bg: "var(--accent)", fg: "var(--text-on-blue)" },
    gold: { bg: "var(--gold-500)", fg: "var(--ink-900)" },
    neutral: { bg: "var(--ink-900)", fg: "var(--egg-50)" },
    green: { bg: "var(--green-600)", fg: "var(--egg-50)" },
  } as const;
  const t = tones[tone] || tones.blue;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
        height: 20,
        padding: "0 6px",
        borderRadius: "var(--radius-pill)",
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.02em",
        lineHeight: 1,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
