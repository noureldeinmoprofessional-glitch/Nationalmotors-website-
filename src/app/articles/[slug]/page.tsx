import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleDetail from "@/components/news/ArticleDetail";
import { ARTICLES_LIST, getArticleBySlug } from "@/lib/articlesData";

// Pre-render a page for every supplied article. The list is empty until the
// PPTX/CMS provides real entries; any other slug 404s via notFound() below.
export function generateStaticParams() {
  return ARTICLES_LIST.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.content.slice(0, 155) || "An article from National Motors.",
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: `${article.title} | National Motors`,
      url: `/articles/${article.slug}`,
      images: [{ url: article.coverImage, width: 1920, height: 1080, alt: article.coverAlt ?? article.title }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main id="main">
        <ArticleDetail article={article} />
      </main>
      <Footer />
    </>
  );
}
