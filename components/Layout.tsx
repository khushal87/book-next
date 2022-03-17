import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Header as HeaderDefault } from "../components/Header/Header";
import { SideNavbar } from "./SideNavbar";

export default function Layout({ blogs, children }: any) {
    const [navbarOpened, setNavbarState] = React.useState(false);

    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!navbarOpened}
                    width={{ sm: 200, lg: 300 }}
                >
                    <SideNavbar blogs={blogs} />
                </Navbar>
            }
            header={
                <Header height={53}>
                    <HeaderDefault
                        navbarOpened={navbarOpened}
                        toggleNavbar={() => setNavbarState((o) => !o)}
                    />
                </Header>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            {children}
        </AppShell>
    );
}
