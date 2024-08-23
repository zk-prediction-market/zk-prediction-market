"use client"

import { useAccount, useEnsName } from "wagmi"

export function Profile() {
    const { address } = useAccount()
    return <div>{address}</div>
}
