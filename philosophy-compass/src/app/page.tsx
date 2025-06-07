import Link from "next/link";

export default function Home() {
  return (
    <main className="prose mx-auto p-8">
      <h1>Welcome to Philosophy Compass</h1>
      <p>
        This is my space for exploring philosophical ideas, timelines, and
        thoughts.
      </p>

      <ul>
        <li>
          <Link href="/notes">🧠 Notes</Link>
        </li>
        <li>
          <Link href="/blog">✍️ Thoughts & Blog</Link>
        </li>
      </ul>
    </main>
  );
}
