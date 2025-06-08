// src/app/notes/[slug]/page.tsx
import { allNotes } from "contentlayer/generated";
import { notFound } from "next/navigation";
import NoteBody from "@/components/Notes/NoteBody";

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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // ✅ Required for Next.js 15
  const note = allNotes.find((n) => n.slug === slug);
  if (!note) return {};
  return {
    title: note.title,
    description: `Note about ${note.title}`,
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = allNotes.find((n) => n.slug === slug);
  if (!note) return notFound();

  return (
    <article className="prose mx-auto p-8">
      <NoteBody code={note.body.code} />
    </article>
  );
}
