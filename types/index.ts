export type Blog = {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    order: number;
};

export type PostMarkdownAttributes = {
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    slug: string;
    order: number;
};

export interface MdxPageProps {
    frontmatter: Partial<Blog>;
}

export interface Frontmatter {}
