import { ReactElement } from "react";
import Layout from "../../components/Layout";
import { getBlogs } from "../../utils/blogs";
import type { Blog } from "../../types";
import { CustomLink } from "../../components/Link";

export type PageProps = {
    blogs: {
        slug: string;
        frontmatter: Blog;
    }[];
};

export default function Page(props: PageProps) {
    const { blogs } = props;
    return (
        <Layout blogs={blogs}>
            <h1>Hey</h1>
        </Layout>
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

// Page.getLayout = function getLayout(page: ReactElement) {
//     return <Layout >{page}</Layout>;
// };
