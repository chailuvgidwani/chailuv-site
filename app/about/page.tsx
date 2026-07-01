import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Chailuv Gidwani — a decade in Democratic field and management roles across Chicago and Illinois, and a camera that came from the same habit.",
};

export default function AboutPage() {
  return <AboutView />;
}
