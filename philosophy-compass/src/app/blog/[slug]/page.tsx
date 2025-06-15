import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import styles from "@/components/Blog/BlogLayout.module.css";
import BlogBody from "@/components/Blog/BlogBody";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = allBlogs.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: `Blog post: ${post.title}`,
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = allBlogs.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className={styles.blog}>
      <BlogBody code={post.body.code} />
    </article>
  );
}
