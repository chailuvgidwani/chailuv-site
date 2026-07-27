import type { Metadata } from "next";
import { WorkView } from "./WorkView";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The campaigns whose finance operations Chailuv Gidwani has built and run — congressional and state races on the west coast and at home in the midwest.",
};

export default function WorkPage() {
  return <WorkView />;
}
