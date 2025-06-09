import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import styles from "./BlogList.module.css";
import { formatDate } from "@/lib/date";

export default function BlogList() {
  const sortedBlogs = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
            {/* If you want to add a type/category, add here for consistency */}
            {/* <p className={styles.type}>{post.type}</p> */}
            <p className={styles.date}>{formatDate(post.date)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
