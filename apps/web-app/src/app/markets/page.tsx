"use client"
import Stepper from "@/components/Stepper"
import { useLogContext } from "@/context/LogContext"
import { useSemaphoreContext } from "@/context/SemaphoreContext"
import IconRefreshLine from "@/icons/IconRefreshLine"
import { Box, Button, Divider, Heading, HStack, Link, Text, useBoolean, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import Feedback from "../../../contract-artifacts/Feedback.json"
import { ethers } from "ethers"
import useSemaphoreIdentity from "@/hooks/useSemaphoreIdentity"
import proofTest from "../../examples/proofTest.json"

export default function GroupsPage() {
    const router = useRouter()
    const { setLog } = useLogContext()
    const { _users, refreshUsers, addUser } = useSemaphoreContext()
    const [_loading, setLoading] = useBoolean()
    const { _identity } = useSemaphoreIdentity()
    const [proof, setProof] = useState<any>(null)

    useEffect(() => {
        if (_users.length > 0) {
            setLog(`${_users.length} user${_users.length > 1 ? "s" : ""} retrieved from the group 🤙🏽`)
        }
    }, [_users, setLog])

    const users = useMemo(() => [..._users].reverse(), [_users])

    const joinGroup = useCallback(async () => {
        if (!_identity) {
            return
        }

        setLoading.on()
        setLog(`Joining the Feedback group...`)

        let joinedGroup: boolean = false

        // if (process.env.NEXT_PUBLIC_OPENZEPPELIN_AUTOTASK_WEBHOOK) {
        //     const response = await fetch(process.env.NEXT_PUBLIC_OPENZEPPELIN_AUTOTASK_WEBHOOK, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({
        //             abi: Feedback.abi,
        //             address: process.env.NEXT_PUBLIC_FEEDBACK_CONTRACT_ADDRESS as string,
        //             functionName: "joinGroup",
        //             functionParameters: [_identity.commitment.toString()]
        //         })
        //     })

        //     if (response.status === 200) {
        //         joinedGroup = true
        //     }
        // } else if (
        //     process.env.NEXT_PUBLIC_GELATO_RELAYER_ENDPOINT &&
        //     process.env.NEXT_PUBLIC_GELATO_RELAYER_CHAIN_ID &&
        //     process.env.GELATO_RELAYER_API_KEY
        // ) {
        //     const iface = new ethers.Interface(Feedback.abi)
        //     const request = {
        //         chainId: process.env.NEXT_PUBLIC_GELATO_RELAYER_CHAIN_ID,
        //         target: process.env.NEXT_PUBLIC_FEEDBACK_CONTRACT_ADDRESS,
        //         data: iface.encodeFunctionData("joinGroup", [_identity.commitment.toString()]),
        //         sponsorApiKey: process.env.GELATO_RELAYER_API_KEY
        //     }
        //     const response = await fetch(process.env.NEXT_PUBLIC_GELATO_RELAYER_ENDPOINT, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(request)
        //     })

        //     if (response.status === 201) {
        //         joinedGroup = true
        //     }
        // } else {
        const response = await fetch("api/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identityCommitment: _identity.commitment.toString(),
                proof: proof
            })
        })

        if (response.status === 200) {
            joinedGroup = true
        }
        // }

        if (joinedGroup) {
            addUser(_identity.commitment.toString())

            setLog(`You have joined the Feedback group event 🎉 Share your feedback anonymously!`)
        } else {
            setLog("Some error occurred, please try again!")
        }

        setLoading.off()
    }, [_identity, addUser, setLoading, setLog])

    const userHasJoined = useMemo(
        () => _identity !== undefined && _users.includes(_identity.commitment.toString()),
        [_identity, _users]
    )

    async function getDefault() {
        const { prove, verify } = await import("tlsn-js")

        // console.time("prove")
        // const proof = await prove("https://swapi.dev/api/people/1", {
        //     method: "GET",
        //     maxTranscriptSize: 16384,
        //     notaryUrl: "https://notary.pse.dev/v0.1.0-alpha.5",
        //     websocketProxyUrl: "wss://notary.pse.dev/proxy?token=swapi.dev"
        // })
        // console.timeEnd("prove")

        const proofTmp = proofTest

        console.log("proof", proofTmp)
        setProof(proofTmp)

        console.time("verify")
        const result = await verify(proofTmp)
        console.timeEnd("verify")

        console.log(result)
    }

    return (
        <>
            <Heading as="h2" size="xl">
                Join
            </Heading>

            <Text pt="2" fontSize="md"></Text>

            <Divider pt="5" borderColor="gray.500" />

            <button onClick={getDefault}>Get</button>

            <HStack py="5" justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                    Group users ({_users.length})
                </Text>
                <Button leftIcon={<IconRefreshLine />} variant="link" color="text.300" onClick={refreshUsers} size="lg">
                    Refresh
                </Button>
            </HStack>

            {_users.length > 0 && (
                <VStack spacing="3" pb="3" align="left" maxHeight="300px" overflowY="scroll">
                    {users.map((user, i) => (
                        <HStack key={i} pb="3" borderBottomWidth={i < _users.length - 1 ? 1 : 0} whiteSpace="nowrap">
                            <Text textOverflow="ellipsis" overflow="hidden">
                                {_identity?.commitment.toString() === user ? <b>{user}</b> : user}
                            </Text>
                        </HStack>
                    ))}
                </VStack>
            )}

            <Box pb="5">
                <Button
                    w="full"
                    colorScheme="primary"
                    isDisabled={_loading || !_identity || userHasJoined}
                    onClick={joinGroup}
                >
                    Join
                </Button>
            </Box>

            <Divider pt="3" borderColor="gray.500" />

            <Stepper
                step={2}
                onPrevClick={() => router.push("/signUp")}
                onNextClick={userHasJoined ? () => router.push("/proofs") : undefined}
            />
        </>
    )
}
