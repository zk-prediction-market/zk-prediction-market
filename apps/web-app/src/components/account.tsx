import { Button } from "@chakra-ui/react"
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()

    return (
        <div>
            {/* {address && <div>{address}</div>} */}
            <Button onClick={() => disconnect()}>Disconnect</Button>
        </div>
    )
}
