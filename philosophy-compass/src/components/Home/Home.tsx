import styles from "./home.module.css";
import LinkList from "../LinkList/linklist";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1>
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Philosophy Compass
          </span>
        </h1>
        <p>
          This is my space for exploring philosophical ideas, timelines, and
          thoughts.
        </p>
        <LinkList />
      </div>
    </main>
  );
}
