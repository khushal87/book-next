import fs from "fs";
import matter from "gray-matter";
import { Blog } from "../types";
import { marked } from "marked";

export type Blogs = Record<
    string,
    {
        slug: string;
        frontmatter: Blog;
    }[]
>;

export function getBlogs(): Blogs {
    const topics = fs.readdirSync(`${process.cwd()}/contents`);

    const blogs: Blogs = {};
    topics.forEach((topic) => {
        const files = fs.readdirSync(`${process.cwd()}/contents/${topic}`);
        const filesData = files.map((fileName) => {
            const markdownWithMetadata = fs
                .readFileSync(`contents/${topic}/${fileName}`)
                .toString();

            const { content, data } = matter(markdownWithMetadata);

            const html = marked(content);

            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate: string = data.date.toLocaleDateString(
                "en-US",
                options
            );

            const frontmatter = {
                ...data,
                date: formattedDate,
                html: html,
            } as Blog;

            return {
                slug: fileName.replace(".mdx", ""),
                frontmatter,
            };
        });

        blogs[topic] = filesData;
    });

    return blogs;
}

export function getBlog(fileName: string): { slug: string; frontmatter: Blog } {
    const markdownWithMetadata = fs
        .readFileSync(`contents/${fileName}.mdx`)
        .toString();

    const { content, data } = matter(markdownWithMetadata);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = data.date.toLocaleDateString("en-US", options);

    const html = marked(content);

    const frontmatter = {
        ...data,
        date: formattedDate,
        html: html,
    } as Blog;

    const blog = {
        slug: fileName.replace(".mdx", ""),
        frontmatter,
    };

    return blog;
}
