import type { Metadata } from "next";
import { WorkView } from "./WorkView";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Field programs, budgets, and the margins that decide races — a selection of campaigns Chailuv Gidwani has run or advised across Chicago and Illinois.",
};

export default function WorkPage() {
  return <WorkView />;
}
