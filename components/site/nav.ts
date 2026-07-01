/** Shared nav model — the single source of truth for routes + labels. */
export interface NavItem {
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/photographs", label: "Photographs" },
  { href: "/about", label: "About" },
];
