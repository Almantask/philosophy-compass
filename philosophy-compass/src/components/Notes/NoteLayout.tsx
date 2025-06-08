// src/components/Notes/NoteLayout.tsx
import styles from "./NoteLayout.module.css";
import NoteBody from "./NoteBody";

type NoteLayoutProps = {
  code: string;
};

export default function NoteLayout({ code }: NoteLayoutProps) {
  return (
    <article className={styles.note}>
      <NoteBody code={code} />
    </article>
  );
}
