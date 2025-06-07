import { allBlogs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { notFound } from "next/navigation";

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

export default async function BlogPage({ params }: PageProps) {
  const post = allBlogs.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose mx-auto p-8">
      <MDXContent />
    </article>
  );
}
