import type { Metadata } from "next";
import { GalleryView } from "./GalleryView";

export const metadata: Metadata = {
  title: "Photographs",
};

export default function PhotographsPage() {
  return <GalleryView />;
}
