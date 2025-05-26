import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogTeaser() {
  const posts = [
    { title: "Come funziona KTC", slug: "funziona-ktc" },
    { title: "Dietro le quinte: admin panel", slug: "admin-panel" },
  ];

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold mb-6">Dal blog</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post, i) => (
          <Card key={i}>
            <CardContent className="py-6">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-lg font-semibold hover:underline">{post.title}</h3>
              </Link>
              <p className="text-muted-foreground text-sm mt-1">Leggi l&apos;articolo completo →</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
