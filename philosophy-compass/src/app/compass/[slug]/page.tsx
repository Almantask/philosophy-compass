import { allCompasses } from "contentlayer/generated";
import { notFound } from "next/navigation";
import styles from "@/components/Compass/CompassLayout.module.css";
import Link from "next/link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allCompasses.map((compass) => ({
    slug: compass.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const compass = allCompasses.find((c) => c.slug === slug);
  if (!compass) return {};
  return {
    title: compass.title,
    description: compass.description,
  };
}

export default async function CompassPage({ params }: PageProps) {
  const { slug } = await params;
  const compass = allCompasses.find((c) => c.slug === slug);
  if (!compass) return notFound();

  return (
    <article className={styles.compass}>
      <h1>{compass.title}</h1>
      <p>{compass.description}</p>
      <Link
        href={`/notes?tags=${encodeURIComponent((compass.tags ?? []).join(","))}`}
      >
        <div className={`${styles.tags} ${styles.tagButton}`}>
          {(compass.tags ?? []).join(" | ")}
        </div>
      </Link>
    </article>
  );
}
