"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  mdxSource: MDXRemoteSerializeResult;
  meta: {
    title: string;
    date: string;
    description?: string;
  };
};

export default function MDXContent({ mdxSource, meta }: Props) {
  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <h1>{meta.title}</h1>
      <p className="text-sm text-muted-foreground">{meta.date}</p>
      <p className="text-sm text-muted-foreground">{meta.description}</p>
      <MDXRemote {...mdxSource} />
    </article>
  );
}
