import { allNotes } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return allNotes.map((note) => ({
    slug: note.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const note = allNotes.find((n) => n.slug === params.slug);
  if (!note) return {};
  return {
    title: note.title,
    description: `Note about ${note.title}`,
  };
}

// Had to make it async, weird js issue. TODO: to investigate further.
export default async function NotePage({ params }: PageProps) {
  const note = allNotes.find((n) => n.slug === params.slug);
  if (!note) return notFound();

  const MDXContent = useMDXComponent(note.body.code);

  return (
    <article className="prose mx-auto p-8">
      <MDXContent />
    </article>
  );
}
