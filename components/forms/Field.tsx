import React from "react";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase label above the control. */
  label?: string;
  hint?: string;
  /** Error text — replaces hint and turns clay. */
  error?: string;
  htmlFor?: string;
  required?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Field — label + control + hint/error wrapper. Mono uppercase label
 * sits above the control on the grid. Use around Input/Textarea/Select.
 */
export function Field({
  label,
  hint,
  error,
  htmlFor,
  required = false,
  children,
  style = {},
  ...props
}: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, ...style }} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            display: "flex",
            gap: 5,
          }}
        >
          {label}
          {required && <span style={{ color: "var(--highlight)" }}>*</span>}
        </label>
      )}
      {children}
      {(hint || error) && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.02em",
            color: error ? "var(--danger-600)" : "var(--text-muted)",
          }}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
