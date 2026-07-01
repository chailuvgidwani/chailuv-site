import type { Metadata } from "next";
import { GalleryView } from "./GalleryView";

export const metadata: Metadata = {
  title: "Photographs",
  description:
    "Photographs by Chailuv Gidwani — dawn light, field offices, and the people doing the work. Mostly black and white, mostly Chicago.",
};

export default function PhotographsPage() {
  return <GalleryView />;
}
