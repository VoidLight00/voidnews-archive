import { redirect } from "next/navigation";
import { getLatestSlug } from "@/lib/data";

// Canonical entry point. "/" carries no UI of its own — it forwards to the
// latest weekly edition, where the editorial home surface (/[slug]) lives.
// Keep this a pure redirect; do not render markup here (route contract).
export default function Home() {
  redirect(`/${getLatestSlug()}`);
}
