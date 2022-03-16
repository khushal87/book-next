import fs from "fs";
import matter from "gray-matter";

export function getBlogs() {
    const files = fs.readdirSync(`${process.cwd()}/contents`);

    const blogs = files.map((fileName) => {
        const markdownWithMetadata = fs
            .readFileSync(`contents/${fileName}`)
            .toString();

        const { data } = matter(markdownWithMetadata);

        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = data.date.toLocaleDateString("en-US", options);

        const frontmatter = {
            ...data,
            date: formattedDate,
        };

        return {
            slug: fileName.replace(".mdx", ""),
            frontmatter,
        };
    });

    return blogs;
}

export function getBlog(fileName: string) {
    const markdownWithMetadata = fs
        .readFileSync(`contents/${fileName}.mdx`)
        .toString();

    const { data } = matter(markdownWithMetadata);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = data.date.toLocaleDateString("en-US", options);

    const frontmatter = {
        ...data,
        date: formattedDate,
    };

    const blog = {
        slug: fileName.replace(".mdx", ""),
        frontmatter,
    };

    return blog;
}
