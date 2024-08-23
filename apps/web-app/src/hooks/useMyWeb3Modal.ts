import { useWeb3Modal } from "@web3modal/wagmi/react"

export default function useMyWeb3Modal() {
    const { open } = useWeb3Modal()
    return { open }
}
