import fs from "fs";
import matter from "gray-matter";

export type Post = {
    posts: {
        slug: string;
        frontmatter: {
            [x: string]: any;
        };
    }[];
};

export default function Posts(props: Post) {
    const { posts } = props;
    return (
        <div>
            {posts.map(({ frontmatter: { title, description, date } }) => (
                <article key={title}>
                    <header>
                        <h3>{title}</h3>
                        <span>{date}</span>
                    </header>
                    <section>
                        <p>{description}</p>
                    </section>
                </article>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const files = fs.readdirSync(`${process.cwd()}/contents`);

    const posts = files.map((fileName) => {
        const markdownWithMetadata = fs
            .readFileSync(`contents/${fileName}`)
            .toString();

        const { data } = matter(markdownWithMetadata);

        const frontmatter = {
            ...data,
        };

        return {
            slug: fileName.replace(".mdx", ""),
            frontmatter,
        };
    });

    return {
        props: {
            posts,
        },
    };
}
