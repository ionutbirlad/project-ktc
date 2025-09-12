import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Button } from "@/components/ui/button";

export const dynamic = "force-static";

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return {
    content,
    meta: data as { title: string; date?: string; description?: string },
  };
}

type BlogParams = { slug: string };

export default async function Page(props: unknown) {
  const { params } = props as { params: BlogParams };
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <Button className="mb-20">
        <Link href="/blog">Torna al blog</Link>
      </Button>
      <h1>{post.meta.title}</h1>
      {post.meta.date && <p className="text-sm text-muted-foreground">{post.meta.date}</p>}
      {post.meta.description && (
        <p className="text-sm text-muted-foreground">{post.meta.description}</p>
      )}
      <MDXRemote source={post.content} />
    </article>
  );
}
