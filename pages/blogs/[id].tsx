import { ReactElement } from "react";
import { MdxPageHeader } from "../../components/MdxPageHeader";
import { getBlog, getBlogs } from "../../utils/blogs";
import type { Blog } from "../../types";
import Layout from "../../components/Layout";

export type PageProps = {
    blog: {
        slug: string;
        frontmatter: Blog;
    };
};

export default function IndividualBlog(props: PageProps) {
    const {
        blog: {
            frontmatter: { title, description },
        },
    } = props;
    return <MdxPageHeader frontmatter={{ title, description }} />;
}

export async function getStaticPaths() {
    const blogs = await getBlogs();
    const paths = blogs.map((blog) => ({
        params: { id: blog.slug },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const blog = await getBlog(params.id);
    return {
        props: {
            blog,
        },
    };
}

IndividualBlog.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
