import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import styles from "./BlogList.module.css";

export default function BlogList() {
  const sortedBlogs = [...allBlogs].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>All Blogs</h1>
      <div className={styles.grid}>
        {sortedBlogs.map((post, index) => (
          <div
            key={post._id}
            className={`${styles.blogCard} ${
              index % 2 === 0 ? styles.rotateLeft : styles.rotateRight
            }`}
          >
            <Link href={`/blog/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
            <p className={styles.date}>{post.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
