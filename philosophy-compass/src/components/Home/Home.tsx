"use client";

import styles from "./Home.module.css";
import { BookOpen, PenTool } from "lucide-react"; // requires lucide-react installed
import AnimatedCompass from "@/components/AnimatedCompass/AnimatedCompass";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.compassWrapper}>
          <AnimatedCompass />
        </div>

        <h1 className={styles.heading}>
          Welcome to <span>Philosophy Compass</span>
        </h1>

        <p className={styles.lead}>
          A practical guide to philosophy, ethics, and critical thinking.
        </p>

        <div className={styles.links}>
          <Link href="/notes" className={styles.linkItem}>
            <BookOpen className={styles.iconInline} />
            Notes
          </Link>
          <Link href="/blog" className={styles.linkItem}>
            <PenTool className={styles.iconInline} />
            Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
