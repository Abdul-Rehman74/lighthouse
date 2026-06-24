import type { Metadata } from "next";
import { TestHome } from "@/components/test-home/TestHome";

export const metadata: Metadata = {
  title: "Home",
};

export default function TestHomePage() {
  return <TestHome />;
}
