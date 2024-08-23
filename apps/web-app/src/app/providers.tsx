"use client"

import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../styles/index"
import { State, WagmiProvider } from "wagmi"
import { config } from "@/config/config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect } from "react"

const queryClient = new QueryClient()

export default function Providers({
    children,
    initialState
}: {
    children: React.ReactNode
    initialState: State | undefined
}) {
    // useEffect(() => {
    //     if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    //         localStorage.clear()
    //         console.log("Local storage has been cleared.")
    //     }
    // }, [])

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <CacheProvider>
                    <ChakraProvider theme={theme}>{children}</ChakraProvider>
                </CacheProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
