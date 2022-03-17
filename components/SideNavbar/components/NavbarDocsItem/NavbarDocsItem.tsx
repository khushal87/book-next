import React from "react";
import useStyles from "./NavbarDocsItem.styles";
import Link from "next/link";
import { CustomLink } from "../../../Link";
import { Text } from "@mantine/core";

type NavbarDocsItemProps = {
    category: string;
    name: string;
    title: string;
};

export default function NavbarDocsItem({
    category,
    name,
    title,
}: NavbarDocsItemProps) {
    const { classes, cx } = useStyles();

    return (
        <Link
            href={{
                pathname: `blogs/[category]/[id]`,
                query: { category: category, id: name },
            }}
            as={`/blogs/${category}/${name}`}
            passHref
        >
            <Text className={classes.link}>{title}</Text>
        </Link>
    );
}
