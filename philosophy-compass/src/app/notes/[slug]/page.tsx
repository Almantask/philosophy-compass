import { allNotes } from "contentlayer/generated";
import { notFound } from "next/navigation";
import NoteLayout from "@/components/Notes/NoteLayout";

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
  const { slug } = await params;
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

  return <NoteLayout code={note.body.code} />;
}
