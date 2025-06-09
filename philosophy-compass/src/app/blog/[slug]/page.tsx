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

export function generateMetadata({ params }: PageProps) {
  const post = allBlogs.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: `Blog post: ${post.title}`,
  };
}

export default function BlogPage({ params }: PageProps) {
  const post = allBlogs.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className={styles.blog}>
      <MDXContent />
    </article>
  );
}
