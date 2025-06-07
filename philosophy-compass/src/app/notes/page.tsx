import Link from "next/link";
import { allNotes } from "contentlayer/generated";

export default function NotesPage() {
  return (
    <main className="prose mx-auto p-8">
      <h1>All Notes</h1>
      <ul>
        {allNotes
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((note) => (
            <li key={note._id}>
              <Link href={`/notes/${note.slug}`}>{note.title}</Link>
              <p>{note.date}</p>
            </li>
          ))}
      </ul>
    </main>
  );
}
