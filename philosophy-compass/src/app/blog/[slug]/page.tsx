import { allBlogs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { notFound } from "next/navigation";
import styles from "@/components/Blog/BlogLayout.module.css";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  // Await params if needed (for Next.js 14+)
  const { slug } = params;
  const post = allBlogs.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: `Blog post: ${post.title}`,
  };
}

export default function BlogPage({ params }: PageProps) {
  // Always call the hook
  const post = allBlogs.find((p) => p.slug === params.slug);
  const MDXContent = useMDXComponent(post?.body.code || "");
  if (!post) return notFound();

  return (
    <article className={styles.blog}>
      <MDXContent />
    </article>
  );
}
