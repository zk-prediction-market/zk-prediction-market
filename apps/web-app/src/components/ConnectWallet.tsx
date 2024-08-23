import { useAccount } from "wagmi"
import { Account } from "./account"
import { WalletInjected } from "./wallet-options"

export const ConnectWallet = () => {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletInjected />
}
