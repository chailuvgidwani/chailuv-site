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
