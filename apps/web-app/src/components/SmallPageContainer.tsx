import { Container, Stack } from "@chakra-ui/react"

export default function SmallPageContainer({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Stack pt="8" pb="24" display="flex" width="50%" alignItems="center" justifyContent="center">
            {children}
        </Stack>
    )
}
