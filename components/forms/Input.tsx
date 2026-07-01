"use client";

import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error styling. @default false */
  invalid?: boolean;
  style?: React.CSSProperties;
}
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  rows?: number;
  style?: React.CSSProperties;
}
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Shared input styling — flat field, hairline underline emphasis. */
function fieldStyle(invalid: boolean, extra: React.CSSProperties): React.CSSProperties {
  return {
    width: "100%",
    fontFamily: "var(--font-sans)",
    fontSize: 16,
    color: "var(--text-primary)",
    background: "var(--color-surface)",
    border: "1.5px solid var(--rule-strong)",
    borderRadius: "var(--radius-2)",
    padding: "11px 13px",
    outline: "none",
    transition:
      "border-color var(--dur-fast) var(--ease-precise), box-shadow var(--dur-fast) var(--ease-precise)",
    ...(invalid ? { borderColor: "var(--danger-600)" } : null),
    ...extra,
  };
}
function focusHandlers(invalid: boolean) {
  return {
    onFocus: (e: React.FocusEvent<HTMLElement & { style: CSSStyleDeclaration }>) => {
      e.target.style.borderColor = invalid ? "var(--danger-600)" : "var(--accent)";
      e.target.style.boxShadow = "var(--ring)";
    },
    onBlur: (e: React.FocusEvent<HTMLElement & { style: CSSStyleDeclaration }>) => {
      e.target.style.borderColor = invalid ? "var(--danger-600)" : "var(--rule-strong)";
      e.target.style.boxShadow = "none";
    },
  };
}

/** Single-line text input. */
export function Input({ invalid = false, style = {}, ...props }: InputProps) {
  return <input style={fieldStyle(invalid, style)} {...focusHandlers(invalid)} {...props} />;
}

/** Multi-line text input. */
export function Textarea({ invalid = false, rows = 4, style = {}, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      style={fieldStyle(invalid, { resize: "vertical", lineHeight: 1.5, ...style })}
      {...focusHandlers(invalid)}
      {...props}
    />
  );
}

/** Native select styled to match, with a mono caret. */
export function Select({ invalid = false, children, style = {}, ...props }: SelectProps) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        style={fieldStyle(invalid, {
          appearance: "none",
          WebkitAppearance: "none",
          paddingRight: 36,
          cursor: "pointer",
          ...style,
        })}
        {...focusHandlers(invalid)}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: 13,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-muted)",
          pointerEvents: "none",
        }}
      >
        ▾
      </span>
    </div>
  );
}
