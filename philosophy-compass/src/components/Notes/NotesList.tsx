// src/components/Notes/NotesList.tsx
"use client";

import Link from "next/link";
import { allNotes, type Note } from "contentlayer/generated";
import styles from "./StickyNoteList.module.css";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function NotesListWrapper() {
  return (
    <Suspense fallback={<div>Loading notes...</div>}>
      <NotesList />
    </Suspense>
  );
}

function NotesList() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    if (tagsParam) {
      const decodedTags = tagsParam
        .split(",")
        .map((tag) => decodeURIComponent(tag.trim()));
      setSelectedTags(decodedTags);
    } else {
      setSelectedTags([]); // Reset tags if no tags are in the URL
    }
  }, [searchParams]);

  const allTags = Array.from(
    new Set(allNotes.flatMap((note) => note.tags || []))
  );

  const sortedNotes = [...allNotes].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const filteredNotes =
    selectedTags.length > 0
      ? sortedNotes.filter((note) =>
          selectedTags.some((tag) => note.tags && note.tags.includes(tag))
        )
      : sortedNotes;

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>All Notes</h1>
      <div className={styles.tagContainer}>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${
              selectedTags.includes(tag) ? styles.activeTag : ""
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filteredNotes.map((note: Note, index: number) => (
          <div
            key={note._id}
            className={`${styles.note} ${
              index % 2 === 0 ? styles.rotateLeft : styles.rotateRight
            }`}
          >
            <Link href={`/notes/${note.slug}`} className={styles.link}>
              {note.title}
            </Link>
            <div className={styles.tags}>
              {note.tags?.map((tag) => (
                <button
                  key={tag}
                  className={styles.tag}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
