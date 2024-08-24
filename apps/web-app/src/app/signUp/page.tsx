"use client"

import { Box, Button, Divider, Heading, HStack, Link, Text } from "@chakra-ui/react"
import { Identity } from "@semaphore-protocol/core"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import Stepper from "../../components/Stepper"
import { useLogContext } from "../../context/LogContext"
import SmallPageContainer from "@/components/SmallPageContainer"
import IconChevronRight from "@/icons/IconChevronRight"
import IconChevronLeft from "@/icons/IconChevronLeft"

export default function IdentitiesPage() {
    const router = useRouter()
    const { setLog } = useLogContext()
    const [_identity, setIdentity] = useState<Identity>()

    useEffect(() => {
        const privateKey = localStorage.getItem("identity")
        const userCurrentBalances: string[] = JSON.parse(localStorage.getItem("userCurrentBalances") || "[]")

        if (privateKey) {
            const identity = Identity.import(privateKey)
            setIdentity(identity)
        }
    }, [setLog])

    const createIdentity = useCallback(async () => {
        const identity = new Identity()

        setIdentity(identity)

        localStorage.setItem("identity", identity.export())

        setLog("Your new Semaphore identity has just been created 🎉")
    }, [setLog])

    return (
        <>
            <SmallPageContainer>
                <Heading as="h2" size="xl">
                    Sign Up
                </Heading>

                <Text pt="2" fontSize="md"></Text>

                <Divider pt="5" borderColor="gray.500" />

                {!_identity && (
                    <Box mt="5" pb="5">
                        <Button w="full" colorScheme="primary" onClick={createIdentity}>
                            {!_identity ? "Create secret identity" : "Created"}
                        </Button>
                    </Box>
                )}

                {_identity && (
                    <>
                        <HStack py="5">
                            <Text fontWeight="bold" fontSize="lg">
                                Secret Identity
                            </Text>
                        </HStack>
                        <Box pb="6" pl="2">
                            <Text>
                                <b>Private Key (base64)</b>:<br /> {_identity.export()}
                            </Text>
                            <Text>
                                <b>Public Key</b>:<br /> [{_identity.publicKey[0].toString()},{" "}
                                {_identity.publicKey[1].toString()}]
                            </Text>
                            <Text>
                                <b>Commitment</b>:<br /> {_identity.commitment.toString()}
                            </Text>
                        </Box>
                    </>
                )}
                <Text></Text>
                <Button
                    onClick={() => {
                        localStorage.clear()
                        window.location.reload()
                    }}
                >
                    Clear Localhost:3000 Storage ( for hackathon demo )
                </Button>

                <Divider pt="3" borderColor="gray.500" />

                {/* <Stepper step={1} onNextClick={_identity && (() => router.push("/groupselect"))} /> */}
                <HStack width="full" justify="space-between" pt="6">
                    {/* <Button
                        flex="1"
                        leftIcon={<IconChevronLeft />}
                        justifyContent="left"
                        colorScheme="primary"
                        variant="link"
                        size="lg"
                        // disabled={!onPrevClick}
                        // onClick={onPrevClick || undefined}
                        // visibility={onPrevClick ? "visible" : "hidden"}
                    >
                        Prev
                    </Button> */}

                    <Button
                        flex="1"
                        rightIcon={<IconChevronRight />}
                        justifyContent="right"
                        colorScheme="primary"
                        variant="link"
                        size="lg"
                        onClick={() => router.push("/groupselect")}
                        // disabled={!onNextClick}
                        // onClick={onNextClick || undefined}
                        // visibility={onNextClick ? "visible" : "hidden"}
                    >
                        Next
                    </Button>
                </HStack>
            </SmallPageContainer>
        </>
    )
}
