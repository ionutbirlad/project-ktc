// ✅ pagina in src/app/blog/[slug]/page.tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import { use } from "react";
import MDXContent from "@/components/custom/MDXContent";

// ⚠️ workaround: marcare come statica o dinamica
export const dynamic = "force-static";

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return {
    mdxSource,
    meta: data as { title: string; date: string },
  };
}

export function generateStaticParams(): { slug: string }[] {
  const dir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(dir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx?$/, ""),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  const post = use(getPost(props?.params?.slug));
  if (!post) return notFound();

  return <MDXContent {...post} />;
}
