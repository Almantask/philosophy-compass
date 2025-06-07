import Link from "next/link";
import { allBlogs } from "contentlayer/generated";

export default function BlogPage() {
  return (
    <main className="prose mx-auto p-8">
      <h1>My Thoughts</h1>
      <ul>
        {allBlogs
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <p>{post.date}</p>
            </li>
          ))}
      </ul>
    </main>
  );
}
