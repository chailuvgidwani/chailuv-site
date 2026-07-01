import type { Metadata } from "next";
import { WorkView } from "./WorkView";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The campaigns whose finance operations Chailuv Gidwani has built and run — congressional and state races in California and Chicago.",
};

export default function WorkPage() {
  return <WorkView />;
}
