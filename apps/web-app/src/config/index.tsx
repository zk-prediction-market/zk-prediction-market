// // config/index.tsx

// import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"

// import { cookieStorage, createStorage } from "wagmi"
// import { hardhat, localhost, mainnet, sepolia } from "wagmi/chains"

// // Your WalletConnect Cloud project ID
// export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

// // Create a metadata object
// const metadata = {
//     name: "semaphore-test",
//     description: "AppKit Example",
//     url: "https://web3modal.com", // origin must match your domain & subdomain
//     icons: ["https://avatars.githubusercontent.com/u/37784886"]
// }

// // Create wagmiConfig
// const chains = [hardhat] as const
// export const config = defaultWagmiConfig({
//     chains,
//     projectId,
//     metadata,
//     ssr: true,
//     storage: createStorage({
//         storage: cookieStorage
//     })
//     // ...wagmiOptions // Optional - Override createConfig parameters
// })
