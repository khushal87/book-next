import { AppShell, Navbar, Header } from "@mantine/core";

export default function Layout({ children }: any) {
    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ base: 200 }} height={900} p="xs">
                    {/* Navbar content */}
                </Navbar>
            }
            header={
                <Header height={60} p="xs">
                    {/* Header content */}
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
