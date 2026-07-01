import type { Metadata } from "next";
import { GalleryView } from "./GalleryView";

export const metadata: Metadata = {
  title: "Photographs",
  description:
    "Photographs by Chailuv Gidwani — travel and street work from Paris, Reims, the California coast, the Caribbean, and Chicago.",
};

export default function PhotographsPage() {
  return <GalleryView />;
}
