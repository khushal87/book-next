import { Accordion } from "@mantine/core";
import { useEffect, useState } from "react";
import { Blog } from "../../types";
import { Blogs, getBlogs } from "../../utils/blogs";
import NavbarDocsItem from "./components/NavbarDocsItem/NavbarDocsItem";

export type PageProps = {
    blogs: Blogs;
};

export function SideNavbar(props: PageProps) {
    const { blogs } = props;

    return (
        <Accordion>
            {Object.keys(blogs).map((item) => {
                return (
                    <Accordion.Item key={item} label={item}>
                        {blogs[item].map((blog) => {
                            return (
                                <NavbarDocsItem
                                    key={blog.slug}
                                    title={blog.frontmatter.title}
                                    name={blog.frontmatter.name}
                                    category={blog.frontmatter.category}
                                />
                            );
                        })}
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}
