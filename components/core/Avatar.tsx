import React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials when absent. */
  src?: string;
  /** Full name — used for initials and alt text. */
  name?: string;
  /** Pixel size. @default 48 */
  size?: number;
  /** Circular instead of square. @default false */
  round?: boolean;
  /** Initials field colour. @default "blue" */
  tone?: "blue" | "ink" | "neutral";
  style?: React.CSSProperties;
}

/**
 * Avatar — square-ish portrait with a hairline frame, or initials on a
 * blue field. Square corners by default (architectural); pass round.
 */
export function Avatar({
  src,
  name = "",
  size = 48,
  round = false,
  tone = "blue",
  style = {},
  ...props
}: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const tones = {
    blue: { bg: "var(--accent)", fg: "var(--text-on-blue)" },
    ink: { bg: "var(--ink-900)", fg: "var(--egg-50)" },
    neutral: { bg: "var(--neutral-200)", fg: "var(--text-primary)" },
  } as const;
  const t = tones[tone] || tones.blue;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: round ? "50%" : "var(--radius-2)",
        overflow: "hidden",
        background: src ? "var(--neutral-200)" : t.bg,
        color: t.fg,
        boxShadow: "inset 0 0 0 1px var(--rule)",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: size * 0.38,
        letterSpacing: "-0.02em",
        flex: "none",
        ...style,
      }}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || "—"
      )}
    </span>
  );
}
