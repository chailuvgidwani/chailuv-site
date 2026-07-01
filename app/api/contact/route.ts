import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const reason = (body.reason || "General").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  // No mail provider configured → accept the message and log it. This keeps
  // the form working out of the box on a fresh Vercel deploy. Add RESEND_API_KEY
  // + CONTACT_TO_EMAIL in the Vercel dashboard to actually deliver mail.
  if (!apiKey || !to) {
    console.log("[contact] (no mail provider configured) received:", { name, email, reason, message });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Chailuv Gidwani site <${from}>`,
        to: [to],
        reply_to: email,
        subject: `Contact form — ${reason} — ${name}`,
        html: `
          <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6;">
            <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
            <p><strong>About:</strong> ${escapeHtml(reason)}</p>
            <hr />
            <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend error:", res.status, detail);
      return NextResponse.json({ error: "Could not send right now. Please email me directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "Could not send right now. Please email me directly." }, { status: 502 });
  }
}
