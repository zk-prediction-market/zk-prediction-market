"use client"

import { useLogContext } from "@/context/LogContext"
import shortenString from "@/utils/shortenString"
import { Box, Button, Container, Heading, HStack, Icon, IconButton, Link, Spinner, Stack, Text } from "@chakra-ui/react"
import { Identity } from "@semaphore-protocol/core"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useMyWeb3Modal from "@/hooks/useMyWeb3Modal"
import { WalletOptions } from "./wallet-options"
import { ConnectWallet } from "./ConnectWallet"

export default function PageContainer({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const { log } = useLogContext()
    const router = useRouter()
    const [_identity, setIdentity] = useState<Identity>()
    // const { open } = useMyWeb3Modal()

    useEffect(() => {
        const privateKey = localStorage.getItem("identity")

        if (privateKey) {
            const identity = Identity.import(privateKey)
            setIdentity(identity)
        }
    }, [])

    function getExplorerLink(network: string, address: string) {
        switch (network) {
            case "sepolia":
                return `https://sepolia.etherscan.io/address/${address}`
            case "arbitrum-sepolia":
                return `https://sepolia.arbiscan.io/address/${address}`
            default:
                return ""
        }
    }

    return (
        <>
            <HStack align="center" justify="space-between" p="2" mb="8">
                <Link href="/" _hover={{ textDecoration: "none" }}>
                    <Heading mt="2" ml="4" size="lg" color="white" _hover={{ opacity: 0.8 }}>
                        ZK Prediction Markets
                    </Heading>
                </Link>
                <HStack mt="2" mr="4" spacing="4">
                    <Button
                        onClick={() => {
                            router.push("/signUp")
                        }}
                    >
                        for Traders
                    </Button>
                    <ConnectWallet />
                </HStack>
            </HStack>

            <Container maxW="100%" display="flex" justifyContent="center">
                {children}
            </Container>

            {/* <HStack
                flexBasis="56px"
                borderTopWidth="1px"
                borderTopColor="text.600"
                backgroundColor="darkBlueBg"
                align="center"
                justify="center"
                spacing="4"
                p="4"
            >
                {log.endsWith("...") && <Spinner color="primary.400" />}
                <Text>{log || `Current step: ${pathname}`}</Text>
            </HStack> */}
        </>
    )
}
