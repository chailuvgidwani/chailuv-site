import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Chailuv Gidwani — a campaign finance director based in Chicago who raises the money that keeps races competitive, and photographs the world between them.",
};

export default function AboutPage() {
  return <AboutView />;
}
