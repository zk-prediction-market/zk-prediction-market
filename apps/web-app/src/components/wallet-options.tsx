import { Button } from "@chakra-ui/react"
import * as React from "react"
import { Connector, useConnect } from "wagmi"

export function WalletOptions() {
    const { connectors, connect } = useConnect()

    return connectors.map((connector) => (
        <WalletOption key={connector.uid} connector={connector} onClick={() => connect({ connector })} />
    ))
}

export function WalletOption({ connector, onClick }: { connector: Connector; onClick: () => void }) {
    const [ready, setReady] = React.useState(false)

    React.useEffect(() => {
        ;(async () => {
            const provider = await connector.getProvider()
            setReady(!!provider)
        })()
    }, [connector])

    return (
        <Button disabled={!ready} onClick={onClick}>
            Connect
        </Button>
    )
}

export function WalletInjected() {
    const { connectors, connect } = useConnect()

    const injected = connectors[0]

    return <WalletOption connector={injected} onClick={() => connect({ connector: injected })} />
}
