"use client";

import React from "react";
import { Button } from "@/components/core/Button";
import { Field } from "@/components/forms/Field";
import { Input, Textarea, Select } from "@/components/forms/Input";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<FieldErrors>({});

  if (sent) {
    return (
      <div style={{ border: "1px solid var(--rule)", borderTop: "2px solid var(--accent)", borderRadius: "var(--radius-3)", padding: "clamp(28px, 4vw, 44px)", background: "var(--color-surface)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--green-600)" }}>Message sent</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", letterSpacing: "-0.02em", margin: "12px 0 8px" }}>Thanks — I&apos;ll be in touch.</h3>
        <p style={{ color: "var(--text-secondary)" }}>I read everything myself, usually within a day.</p>
        <div style={{ marginTop: 20 }}>
          <Button variant="secondary" onClick={() => { setSent(false); setFormError(null); setErrors({}); }}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const reason = String(data.get("reason") || "");
    const message = String(data.get("message") || "").trim();

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please add your name.";
    if (!email) nextErrors.email = "Please add an email.";
    else if (!EMAIL_RE.test(email)) nextErrors.email = "That email doesn't look right.";
    if (!message) nextErrors.message = "A sentence is plenty — but I need something.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason, message }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setSent(true);
      form.reset();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="cg-collapse"
      style={{ border: "1px solid var(--rule)", borderRadius: "var(--radius-3)", padding: "clamp(24px, 4vw, 40px)", background: "var(--color-surface)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
    >
      <Field label="Name" htmlFor="c-name" required error={errors.name}>
        <Input id="c-name" name="name" placeholder="Your name" invalid={!!errors.name} autoComplete="name" />
      </Field>
      <Field label="Email" htmlFor="c-email" required error={errors.email}>
        <Input id="c-email" name="email" type="email" placeholder="you@example.com" invalid={!!errors.email} autoComplete="email" />
      </Field>
      <Field style={{ gridColumn: "1 / -1" }} label="This is about" htmlFor="c-reason">
        <Select id="c-reason" name="reason" defaultValue="A 2026 campaign">
          <option>A 2026 campaign</option>
          <option>Consulting / advising</option>
          <option>A photograph</option>
          <option>Just saying hello</option>
        </Select>
      </Field>
      <Field style={{ gridColumn: "1 / -1" }} label="Message" htmlFor="c-msg" hint="A sentence is plenty." error={errors.message} required>
        <Textarea id="c-msg" name="message" rows={4} placeholder="What's on your mind?" invalid={!!errors.message} />
      </Field>
      {formError && (
        <div style={{ gridColumn: "1 / -1", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.04em", color: "var(--danger-600)" }}>
          {formError}
        </div>
      )}
      <div style={{ gridColumn: "1 / -1" }}>
        <Button type="submit" full disabled={sending}>
          {sending ? "Sending…" : "Send note"}
        </Button>
      </div>
    </form>
  );
}
