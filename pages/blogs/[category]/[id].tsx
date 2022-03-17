import { ReactElement } from "react";
import { MdxPageHeader } from "../../../components/MdxPageHeader";
import { getBlog, getBlogs } from "../../../utils/blogs";
import type { Blog } from "../../../types";
import Layout from "../../../components/Layout";
import MdxProvider from "../../../components/MdxProvider";

export type PageProps = {
    blog: {
        slug: string;
        frontmatter: Blog;
    };
    blogs: {
        slug: string;
        frontmatter: Blog;
    }[];
};

export default function IndividualBlog(props: PageProps) {
    const {
        blog: {
            frontmatter: { title, description, html },
        },
        blogs,
    } = props;
    return (
        <Layout blogs={blogs}>
            <MdxPageHeader frontmatter={{ title, description }} />
            <MdxProvider>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </MdxProvider>
        </Layout>
    );
}

export async function getStaticPaths() {
    const blogs = await getBlogs();
    const paths: { params: { category: string; id: string } }[] = [];

    Object.keys(blogs).map((category) => {
        blogs[category].map((blog) => {
            paths.push({
                params: {
                    category: blog.frontmatter.category,
                    id: blog.frontmatter.name,
                },
            });
        });
    });

    return { paths, fallback: false };
}

export async function getStaticProps({
    params,
}: {
    params: { category: string; id: string };
}) {
    const { category, id } = params;
    const blog = await getBlog(`${category}/${id}`);
    const blogs = await getBlogs();

    return {
        props: {
            blog,
            blogs,
        },
    };
}
