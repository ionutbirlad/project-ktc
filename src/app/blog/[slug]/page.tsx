import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import MDXContent from "@/components/custom/MDXContent";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(dir);
  return files.map((file) => ({ slug: file.replace(/\.mdx?$/, "") }));
}

const getPost = async (slug: string) => {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const file = matter(source);
  const content = file.content;
  const data = file.data as { title: string; date: string };

  const mdxSource = await serialize(content);
  return { mdxSource, meta: data };
};

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return <MDXContent {...post} />;
}
