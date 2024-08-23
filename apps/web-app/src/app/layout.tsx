import PageContainer from "@/components/PageContainer"
import type { Metadata } from "next"
import Providers from "./providers"
import { LogContextProvider } from "@/context/LogContext"
import { SemaphoreContextProvider } from "@/context/SemaphoreContext"
import { headers } from "next/headers"
import { cookieToInitialState } from "wagmi"
import { config } from "@/config/config"
// import Web3ModalProvider from "@/context"

export const metadata: Metadata = {
    title: "Semaphore Demo",
    description: "A zero-knowledge protocol for anonymous signaling on Ethereum.",
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
    metadataBase: new URL("https://demo.semaphore.pse.dev"),
    openGraph: {
        type: "website",
        url: "https://demo.semaphore.pse.dev",
        title: "Semaphore Demo",
        description: "A zero-knowledge protocol for anonymous signaling on Ethereum.",
        siteName: "Semaphore Demo",
        images: [
            {
                url: "https://demo.semaphore.pse.dev/social-media.png"
            }
        ]
    },
    twitter: { card: "summary_large_image", images: "https://demo.semaphore.pse.dev/social-media.png" }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const initialState = cookieToInitialState(config, headers().get("cookie"))
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                {/* <Web3ModalProvider initialState={initialState}> */}
                <Providers initialState={initialState}>
                    <SemaphoreContextProvider>
                        <LogContextProvider>
                            <PageContainer>{children}</PageContainer>
                        </LogContextProvider>
                    </SemaphoreContextProvider>
                </Providers>
                {/* </Web3ModalProvider> */}
            </body>
        </html>
    )
}
