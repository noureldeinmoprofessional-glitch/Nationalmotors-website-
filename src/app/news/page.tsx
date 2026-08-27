import { redirect } from "next/navigation";

// The News & Media landing page is disabled. Its sub-pages (Press Releases,
// Articles & Insights, Media) remain available via the navigation dropdown.
// Any direct visit to /news is redirected to the first sub-page.
export default function NewsPage() {
  redirect("/news/press-releases");
}
