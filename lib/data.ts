/* ============================================================
   SITE CONTENT — Chailuv Gidwani
   ------------------------------------------------------------
   ⚠️  PLACEHOLDER CONTENT. Every string, figure, and image below
   is illustrative and needs to be replaced with real, approved
   material before this site is public.

   To replace:
   • Case studies  → edit CG_WORK (title/role/place/blurb/tags/stats).
   • Photographs    → edit CG_PLATES (caption/meta/category/ratio).
   • Imagery        → drop real files into /public and point `img`
                      / `src` at them (e.g. "/photos/plate-01.jpg").
                      The current /public/placeholders/*.svg are
                      stand-ins drawn in the brand palette.
   ============================================================ */

export interface WorkStat {
  value: string;
  label: string;
  unit?: string;
  delta?: string;
}

export interface WorkItem {
  id: string;
  no: string;
  role: string;
  title: string;
  place: string;
  tags: string[];
  blurb: string;
  img: string;
  stats: WorkStat[];
}

export interface Plate {
  figure: string;
  caption: string;
  meta: string;
  src: string;
  ratio: string;
  /** Filter category on the Photographs page. */
  category: "california" | "france" | "chicago" | "islands";
}

// Real campaigns, from the résumé. Copy and figures are accurate; the
// case-study IMAGES are still brand-coloured placeholders (finance work isn't
// especially photogenic) — swap in real ones via `img` if/when you have them.
export const CG_WORK: WorkItem[] = [
  {
    id: "ammar",
    no: "01",
    role: "Finance Director",
    title: "Ammar for Congress",
    place: "CA-48 · 2026",
    tags: ["Call time", "Paid comms", "Warchest"],
    blurb:
      "Directed finance for a competitive open-seat congressional race — building and operationalizing the finance plan and call-time program, owning budget and cashflow through spend-down, and helping shape contrast strategy across mail and digital.",
    img: "/placeholders/work-01.svg",
    stats: [
      { value: "$350K+", label: "Raised as Finance Director" },
      { value: "+33%", label: "Lift over the prior period", delta: "+33%" },
      { value: "CA-48", label: "Open-seat U.S. House race" },
    ],
  },
  {
    id: "morse",
    no: "02",
    role: "Finance Director",
    title: "Jessica Morse for Congress",
    place: "California · 2023–24",
    tags: ["Call time", "Budget", "PACs & labor"],
    blurb:
      "Ran the finance operation for a top-tier U.S. House race — building the finance plan and call-time program, prospecting and managing hundreds of hours of candidate call time, and outraising a sitting Republican incumbent in back-to-back quarters.",
    img: "/placeholders/work-02.svg",
    stats: [
      { value: "$2.2M+", label: "Total raised" },
      { value: "2", unit: "qtrs", label: "Outraising the incumbent" },
      { value: "PAC", label: "& labor support secured" },
    ],
  },
  {
    id: "new-chicago",
    no: "03",
    role: "Finance Associate",
    title: "New Chicago Consulting",
    place: "Chicago · 2022–23",
    tags: ["Events", "Reporting", "Automation"],
    blurb:
      "On the finance teams behind a Chicago mayoral re-election, the state party, a pro-choice PAC, and the Cook County State's Attorney — prospecting call time, tracking financial performance, building automations, and staffing the events that carried a seven-figure share.",
    img: "/placeholders/work-03.svg",
    stats: [
      { value: "$3M+", label: "Raised across the firm's campaigns" },
      { value: "$1M+", label: "Raised through events staffed" },
      { value: "4", label: "Marquee Chicago-area races" },
    ],
  },
  {
    id: "parker",
    no: "04",
    role: "Finance Director",
    title: "Neva Parker for Assembly",
    place: "California · 2024",
    tags: ["Call time", "Events", "Strategy"],
    blurb:
      "Overhauled fundraising for a California Assembly race in the closing months — standing up a call-time program and staffing candidate events to reach high-capacity donors, and advising the campaign manager on election-day strategy.",
    img: "/placeholders/work-04.svg",
    stats: [
      { value: "$33K+", label: "Raised in the closing stretch" },
      { value: "+50%", label: "Over the prior period", delta: "+50%" },
      { value: "Assembly", label: "California state race" },
    ],
  },
];

// Real photographs. `meta` (camera line) is from each file's EXIF and is
// accurate. Captions + categories are drafts based on the image content —
// review and correct the place names / groupings as needed.
export const CG_PLATES: Plate[] = [
  { figure: "01", caption: "Rue Cambon", meta: "55mm · ISO 100 · 1/125", src: "/photos/gallery/DSC_0644.jpg", ratio: "2 / 3", category: "france" },
  { figure: "02", caption: "Paris, from Montmartre", meta: "28mm · ISO 800 · 1.6s", src: "/photos/gallery/DSC_0603.jpg", ratio: "3 / 2", category: "france" },
  { figure: "03", caption: "Beverly Hills, through glass", meta: "55mm · ISO 280 · 1/125", src: "/photos/gallery/DSC_0083.jpg", ratio: "3 / 2", category: "california" },
  { figure: "04", caption: "Place Drouet-d'Erlon, Reims", meta: "55mm · ISO 100 · 1/125", src: "/photos/gallery/DSC_0972.jpg", ratio: "3 / 2", category: "france" },
  { figure: "05", caption: "Morning swim", meta: "55mm · ISO 800 · 1/1250", src: "/photos/gallery/DSC_0256.jpg", ratio: "3 / 2", category: "california" },
  { figure: "06", caption: "Champagne cellar, Reims", meta: "22mm · ISO 3200 · 1/10", src: "/photos/gallery/DSC_0874.jpg", ratio: "3 / 2", category: "france" },
  { figure: "07", caption: "Paris, blue hour", meta: "24mm · ISO 2000 · 1/60", src: "/photos/gallery/DSC_0583.jpg", ratio: "3 / 2", category: "france" },
  { figure: "08", caption: "Resort, blue hour", meta: "18mm · ISO 3200 · 1/20", src: "/photos/gallery/DSC_0456A.jpg", ratio: "3 / 2", category: "california" },
  { figure: "09", caption: "Above the marine layer", meta: "18mm · ISO 160 · 1/500", src: "/photos/gallery/DSC_0496A.jpg", ratio: "3 / 2", category: "california" },
  { figure: "10", caption: "The Getty, midday", meta: "34mm · ISO 100 · 1/250", src: "/photos/gallery/DSC_0063.jpg", ratio: "3 / 2", category: "california" },
  { figure: "11", caption: "Beach bar", meta: "26mm · ISO 200 · 1/500", src: "/photos/gallery/DSC_0163.jpg", ratio: "3 / 2", category: "islands" },
  { figure: "12", caption: "Group stage, corner bar", meta: "30mm · ISO 800 · 1/250", src: "/photos/gallery/DCM2.jpg", ratio: "3 / 2", category: "chicago" },
  { figure: "13", caption: "Oyster bar, low light", meta: "22mm · ISO 1600 · 1/20", src: "/photos/gallery/DSC_0057.jpg", ratio: "3 / 2", category: "chicago" },
  { figure: "14", caption: "Reims, the fountain", meta: "48mm · ISO 100 · 1/160", src: "/photos/gallery/DSC_0756.jpg", ratio: "3 / 2", category: "france" },
  { figure: "15", caption: "Ronnie driving, 7:50 p.m.", meta: "18mm · ISO 200 · 1/30", src: "/photos/gallery/RonnieDriving.jpg", ratio: "3 / 2", category: "chicago" },
];

/** Hero / About portrait. */
export const CG_PORTRAIT = "/photos/portrait.jpg";
