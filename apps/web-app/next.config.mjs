/** @type {import('next').NextConfig} */

import withPWA from "next-pwa"
import fs from "fs"
import { config } from "dotenv"

if (!fs.existsSync("./.env")) {
    config({ path: "../../.env" })
}

const nextConfig = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development"
})({
    env: {
        INFURA_API_KEY: process.env.INFURA_API_KEY,
        ETHEREUM_PRIVATE_KEY: process.env.ETHEREUM_PRIVATE_KEY,
        GELATO_RELAYER_API_KEY: process.env.GELATO_RELAYER_API_KEY
    },
    async headers() {
        return [
            {
                // All page routes, not the api ones
                source: "/:path((?!api).*)*",
                headers: [
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                    { key: "Cross-Origin-Embedder-Policy", value: "require-corp" }
                ]
            }
        ]
    },
    // webpack: (config) => {
    //     // config.externals.push("pino-pretty")
    //     return config
    // }
})

export default nextConfig
