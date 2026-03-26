import { redirect } from "next/navigation";
import { getLatestSlug } from "@/lib/data";

export default function Home() {
  redirect(`/${getLatestSlug()}`);
}
