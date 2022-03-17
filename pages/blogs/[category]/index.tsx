import { useRouter } from "next/router";
import Link from "next/link";
import { getBlogs } from "../../../utils/blogs";
import Layout from "../../../components/Layout";
import { ReactElement } from "react";
import { Blog } from "../../../types";

type PageProps = {
    blogs: {
        slug: string;
        frontmatter: Blog;
    }[];
};

export default function DirectoryBlogs(props: PageProps) {
    const router = useRouter();
    const { category } = router.query;

    const { blogs } = props;

    const categoryMain = category as string;

    return (
        <Layout blogs={blogs}>
            <h1>Post: {category}</h1>
            <ul>
                {blogs[categoryMain].map(
                    (blog: { slug: string; frontmatter: Blog }) => {
                        return (
                            <li key={blog.frontmatter.title}>
                                <Link
                                    href={{
                                        pathname: `/blogs/[category]/[id]`,
                                        query: {
                                            category: categoryMain,
                                            id: blog.frontmatter.name,
                                        },
                                    }}
                                    as={`/blogs/${categoryMain}/${blog.frontmatter.name}`}
                                >
                                    <a>{blog.frontmatter.title}</a>
                                </Link>
                            </li>
                        );
                    }
                )}
            </ul>
        </Layout>
    );
}

export async function getStaticPaths() {
    const blogs = await getBlogs();
    const paths = Object.keys(blogs).map((blog) => ({
        params: {
            category: blog,
        },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps() {
    const blogs = await getBlogs();

    return {
        props: {
            blogs: blogs,
        },
    };
}
