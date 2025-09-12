import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <LayoutContainer>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground mb-8">
          Thoughts, experiments, and documentation from the Kill the Competition journey.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border rounded-xl p-6 hover:bg-muted transition"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-muted-foreground">{post.description}</p>
              <span className="text-xs text-gray-500">{post.date}</span>
            </Link>
          ))}
        </div>
      </section>
    </LayoutContainer>
  );
}
