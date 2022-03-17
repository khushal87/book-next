import React, { useState, useEffect } from "react";
import { Burger, Group } from "@mantine/core";
import useStyles from "./Header.styles";
import { Discord } from "./Discord/Discord";
import { SourceCode } from "./SourceCode/SourceCode";

interface HeaderProps {
    navbarOpened: boolean;
    toggleNavbar(): void;
}

function isMac() {
    if ("navigator" in window) {
        return window.navigator.platform.includes("Mac");
    }

    return false;
}

export function Header({ navbarOpened, toggleNavbar }: HeaderProps) {
    const { classes } = useStyles();
    const [isMacOS, setIsMacOS] = useState(true);
    const burgerTitle = navbarOpened ? "Open navigation" : "Hide navigation";

    useEffect(() => {
        setIsMacOS(isMac());
    }, []);

    return (
        <div className={classes.header}>
            <div className={classes.mainSection}>
                <Burger
                    opened={navbarOpened}
                    className={classes.burger}
                    size="sm"
                    onClick={toggleNavbar}
                    title={burgerTitle}
                    aria-label={burgerTitle}
                />
                <div className={classes.logoWrapper}>
                    <div
                        className={classes.logo}
                        style={{ fontWeight: "bolder" }}
                    >
                        Book
                    </div>
                </div>
                <div />
            </div>

            <Group className={classes.links} spacing="xs">
                <Discord />
                <SourceCode />
            </Group>
        </div>
    );
}
