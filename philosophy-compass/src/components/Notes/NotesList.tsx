// src/components/Notes/NotesList.tsx
import Link from "next/link";
import { allNotes, type Note } from "contentlayer/generated";
import styles from "./StickyNoteList.module.css";
import { formatDate } from "@/lib/date";

export default function NotesList() {
  const sortedNotes = [...allNotes].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>All Notes</h1>
      <div className={styles.grid}>
        {sortedNotes.map((note: Note, index: number) => (
          <div
            key={note._id}
            className={`${styles.note} ${
              index % 2 === 0 ? styles.rotateLeft : styles.rotateRight
            }`}
          >
            <Link href={`/notes/${note.slug}`} className={styles.link}>
              {note.title}
            </Link>
            <p className={styles.type}>{note.noteType}</p>
            <p className={styles.date}>{formatDate(note.date)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
