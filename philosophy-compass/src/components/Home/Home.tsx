"use client";

import Lottie from "lottie-react";
import thinkerAnimation from "@/assets/lottie/Man-thinking.json";
import LinkList from "../LinkList/linklist";
import styles from "./Home.module.css";
import { BookOpen, PenTool } from "lucide-react"; // requires lucide-react installed
import AnimatedCompass from "@/components/AnimatedCompass/AnimatedCompass";

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
          <a href="/notes" className={styles.linkItem}>
            <BookOpen className={styles.iconInline} />
            Notes
          </a>
          <a href="/blog" className={styles.linkItem}>
            <PenTool className={styles.iconInline} />
            Blog
          </a>
        </div>
      </div>
    </main>
  );
}
