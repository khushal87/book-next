import { ReactElement } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { getBlogs } from "../../utils/blogs";
import type { Blog } from "../../types";

export type PageProps = {
    blogs: {
        slug: string;
        frontmatter: Blog;
    }[];
};

export default function Page(props: PageProps) {
    const { blogs } = props;
    return (
        <div>
            {blogs.map(({ slug, frontmatter: { title } }) => (
                <div key={title}>
                    <Link key={title} href={`blogs/${slug}`}>
                        <a>{title}</a>
                    </Link>
                    <br />
                </div>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const blogs = await getBlogs();

    return {
        props: {
            blogs,
        },
    };
}

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
