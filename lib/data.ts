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
  category: "field" | "chicago" | "portrait";
}

export const CG_WORK: WorkItem[] = [
  {
    id: "il-gov",
    no: "01",
    role: "Field Director",
    title: "Statewide Coordinated Campaign",
    place: "Illinois · 2022",
    tags: ["Field", "Turnout", "Data"],
    blurb:
      "Built and ran a 9-region field program from a single spreadsheet into 1,400 trained volunteers and a 212k-door universe.",
    img: "/placeholders/work-01.svg",
    stats: [
      { value: "212k", label: "Doors knocked" },
      { value: "+18.4", unit: "pts", label: "Net approval shift", delta: "+6.1" },
      { value: "1,400", label: "Volunteers trained" },
    ],
  },
  {
    id: "chi-runoff",
    no: "02",
    role: "Senior Advisor",
    title: "Municipal Runoff",
    place: "Chicago · 2023",
    tags: ["Strategy", "Message", "GOTV"],
    blurb:
      "Rewrote the closing message in the final ten days and held the coalition together through a six-week runoff.",
    img: "/placeholders/work-02.svg",
    stats: [
      { value: "6", unit: "wk", label: "Runoff sprint" },
      { value: "52.7%", label: "Final share", delta: "+3.9" },
      { value: "38", label: "Wards organized" },
    ],
  },
  {
    id: "il-06",
    no: "03",
    role: "Campaign Manager",
    title: "Congressional, IL-06",
    place: "Illinois · 2024",
    tags: ["Operations", "Budget", "Comms"],
    blurb:
      "Managed a $4.2M cycle end-to-end — staff, budget, paid media, and a field plan that out-ran the top of the ticket.",
    img: "/placeholders/work-03.svg",
    stats: [
      { value: "$4.2M", label: "Cycle budget" },
      { value: "31", label: "Staff hired" },
      { value: "+2.3", unit: "pts", label: "Over-performance", delta: "+2.3" },
    ],
  },
];

export const CG_PLATES: Plate[] = [
  { figure: "01", caption: "Cook County, 6:14 a.m.", meta: "35mm · ISO 800 · 1/250", src: "/placeholders/plate-01.svg", ratio: "4 / 5", category: "field" },
  { figure: "02", caption: "Pilsen, after the rally", meta: "50mm · ISO 200 · 1/500", src: "/placeholders/plate-02.svg", ratio: "3 / 2", category: "chicago" },
  { figure: "03", caption: "Lake Street, blue hour", meta: "28mm · ISO 1600 · 1/60", src: "/placeholders/plate-03.svg", ratio: "3 / 2", category: "chicago" },
  { figure: "04", caption: "Field office, election eve", meta: "35mm · ISO 3200 · 1/40", src: "/placeholders/plate-04.svg", ratio: "4 / 5", category: "field" },
  { figure: "05", caption: "South Shore, first light", meta: "85mm · ISO 400 · 1/1000", src: "/placeholders/plate-05.svg", ratio: "3 / 2", category: "chicago" },
  { figure: "06", caption: "The hold room", meta: "24mm · ISO 2000 · 1/50", src: "/placeholders/plate-06.svg", ratio: "4 / 5", category: "portrait" },
  { figure: "07", caption: "Garfield Park conservatory", meta: "50mm · ISO 320 · 1/250", src: "/placeholders/plate-07.svg", ratio: "3 / 2", category: "chicago" },
  { figure: "08", caption: "Closing night, the count", meta: "35mm · ISO 4000 · 1/30", src: "/placeholders/plate-08.svg", ratio: "4 / 5", category: "portrait" },
];

/** Hero / About portrait — replace with a real photograph. */
export const CG_PORTRAIT = "/placeholders/portrait.svg";
