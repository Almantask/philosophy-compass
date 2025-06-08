import Link from "next/link";
import styles from "./LinkList.module.css";

export default function LinkList() {
  return (
    <ul className={styles.links}>
      <li>
        <Link href="/notes" className={styles.linkItem}>
          🧠 Notes
        </Link>
      </li>
      <li>
        <Link href="/blog" className={styles.linkItem}>
          ✍️ Blog
        </Link>
      </li>
    </ul>
  );
}
