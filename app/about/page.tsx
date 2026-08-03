import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "I interned on my first race in high school, and never looked back. I spent nearly two years in Chicago honing the skills of fundraising, and have been serving as Finance Director ever since.",
};

export default function AboutPage() {
  return <AboutView />;
}
