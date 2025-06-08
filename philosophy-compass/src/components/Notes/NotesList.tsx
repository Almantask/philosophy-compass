// src/components/Notes/NotesList.tsx
import Link from "next/link";
import styles from "./NotesList.module.css";
import { allNotes } from "contentlayer/generated";

export default function NotesList() {
  const sortedNotes = allNotes.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>All Notes</h1>
      <ul className={styles.list}>
        {sortedNotes.map((note) => (
          <li key={note._id} className={styles.item}>
            <Link href={`/notes/${note.slug}`} className={styles.link}>
              {note.title}
            </Link>
            <p className={styles.date}>{note.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
