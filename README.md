# Chailuv Gidwani — personal website

Campaigns & photography portfolio. Next.js (App Router, TypeScript), deployed on
Vercel. Built from the `design-system/` hand-off — tokens and components shipped
as-is; pages rebuilt as real routes.

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- Plain CSS custom properties (no Tailwind) — the design system lives in
  `app/styles/` (`styles.css` + `tokens/`), imported once in `app/layout.tsx`.
- **Fonts:** Schibsted Grotesk + IBM Plex Mono via `next/font/google`
  (self-hosted; they feed `--font-sans` / `--font-mono`).

## Structure
```
app/
  layout.tsx            Header + Footer shell, font + CSS wiring, metadata
  page.tsx              Home  (Hero · StatBand · SelectedWork · PhotoStrip)
  work/                 Work  (case studies)      — page.tsx + WorkView.tsx
  photographs/          Gallery + lightbox        — page.tsx + GalleryView.tsx
  about/                Bio · timeline · contact   — page.tsx + AboutView.tsx + ContactForm.tsx
  api/contact/route.ts  Contact form endpoint (Resend, optional)
  styles/               Design system (shipped as-is) + site.css
components/
  core/ forms/ content/ Ported design-system components
  site/                 Header, Footer, nav model
lib/data.ts             ⚠️ PLACEHOLDER content — case studies + plates
public/placeholders/    ⚠️ PLACEHOLDER imagery (brand-coloured SVGs)
```

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Replacing placeholders
Everything marked `PLACEHOLDER` needs real content before launch:
- **Copy & case studies / plate captions** → `lib/data.ts`
- **Imagery** → drop real files into `public/` and repoint `img` / `src` in
  `lib/data.ts` (and `CG_PORTRAIT`). The current SVGs in
  `public/placeholders/` are brand-coloured stand-ins.
- **Contact email + social links** → `components/site/Footer.tsx`

## Contact form
`app/api/contact/route.ts` works with no configuration — it logs the submission
and returns success. To actually deliver mail, set these env vars in Vercel
(Project → Settings → Environment Variables) and redeploy:

| Variable            | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `RESEND_API_KEY`    | Resend API key (resend.com)               |
| `CONTACT_TO_EMAIL`  | Where submissions are delivered           |
| `CONTACT_FROM_EMAIL`| Verified sender (defaults to Resend test) |

See `.env.example`.

## Brand rules (non-negotiable)
Eggshell page · ink text · royal blue for action · muted gold accent used
sparingly · **no red** · Schibsted Grotesk + IBM Plex Mono only · quiet
structural scroll motion (honours `prefers-reduced-motion`).
