import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "src/content/blog");

export function getAllPosts() {
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      const slug = filename.replace(/\.mdx?$/, "");
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
