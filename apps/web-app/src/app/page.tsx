"use client"

import { Box, Button, Divider, Heading, HStack, Link, Text } from "@chakra-ui/react"
import { Identity } from "@semaphore-protocol/core"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import Stepper from "../components/Stepper"
import { useLogContext } from "../context/LogContext"
import Chart from "@/components/Chart"
import { Profile } from "@/components/profile"

export default function IdentitiesPage() {
    const router = useRouter()
    const { setLog } = useLogContext()
    const [_identity, setIdentity] = useState<Identity>()
    const [_userCurrentBalances, setUserCurrentBalances] = useState<string[]>([])

    useEffect(() => {
        const privateKey = localStorage.getItem("identity")
        const userCurrentBalances: string[] = JSON.parse(localStorage.getItem("userCurrentBalances") || "[]")

        if (privateKey) {
            const identity = Identity.import(privateKey)
            setIdentity(identity)

            setUserCurrentBalances(userCurrentBalances)

            // setLog("Your Semaphore identity has been retrieved from the browser cache 👌🏽")
        } else {
            // setLog("Create your Semaphore identity 👆🏽")
        }
    }, [setLog])

    const createIdentity = useCallback(async () => {
        const identity = new Identity()

        setIdentity(identity)

        localStorage.setItem("identity", identity.export())
        localStorage.setItem("userCurrentBalances", JSON.stringify(["0", "0", "0"]))

        setLog("Your new Semaphore identity has just been created 🎉")
    }, [setLog])

    return (
        <>
            <Box width="100%">
                <Chart />
            </Box>
        </>
    )
}
