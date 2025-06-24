"use client";

import Link from "next/link";
import { allBlogs, type Blog } from "contentlayer/generated";
import styles from "./BlogList.module.css";
import { formatDate } from "@/lib/date";
import { useState } from "react";

export default function BlogList() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(allBlogs.flatMap((post) => post.tags || []))
  );

  const sortedBlogs = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredBlogs =
    selectedTags.length > 0
      ? sortedBlogs.filter((post) =>
          selectedTags.every((tag) => post.tags && post.tags.includes(tag))
        )
      : sortedBlogs;

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
      <h1 className={styles.title}>All Blogs</h1>
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
        {filteredBlogs.map((post, index) => (
          <div
            key={post._id}
            className={`${styles.blogCard} ${
              index % 2 === 0 ? styles.rotateLeft : styles.rotateRight
            }`}
          >
            <Link href={`/blog/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
            <p className={styles.date}>{formatDate(post.date)}</p>
            <div className={styles.tags}>
              {post.tags?.map((tag) => (
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
