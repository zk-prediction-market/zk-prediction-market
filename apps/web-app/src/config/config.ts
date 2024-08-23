import { http, createConfig, cookieStorage, createStorage } from "wagmi"
import { hardhat, sepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

// const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

export const config = createConfig({
    chains: [hardhat, sepolia],
    connectors: [
        injected()
        // walletConnect({ projectId }),
        // metaMask(),
    ],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    transports: {
        [hardhat.id]: http(),
        [sepolia.id]: http()
    }
})
