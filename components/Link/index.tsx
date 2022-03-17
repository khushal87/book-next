import Link from "next/link";
import { Button } from "@mantine/core";

type LinkProps = {
    title: string;
    href: string;
};

export function CustomLink({ href, title }: LinkProps) {
    return (
        <Link href={href} passHref>
            <Button component="a">{title}</Button>
        </Link>
    );
}
