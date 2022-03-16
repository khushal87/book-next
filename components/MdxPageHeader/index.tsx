import React from "react";
import { Title, Text } from "@mantine/core";
import { MdxPageProps } from "../../types";
import useStyles from "./MdxPageHeader.styles";

export function MdxPageHeader({ frontmatter }: MdxPageProps) {
    const { classes, cx } = useStyles();

    const hasTabs = Array.isArray([]);

    const hasLinks = true;

    if (!hasLinks && !hasTabs) {
        return null;
    }

    return (
        <div className={classes.wrapper}>
            <div
                className={cx(classes.header, { [classes.withTabs]: hasTabs })}
            >
                <Title className={classes.title}>
                    {frontmatter.title || frontmatter.title}
                </Title>

                <Text size="lg" className={classes.description}>
                    {frontmatter.description}
                </Text>
            </div>
        </div>
    );
}
