"use client"

import Stepper from "@/components/Stepper"
import { useLogContext } from "@/context/LogContext"
import { useSemaphoreContext } from "@/context/SemaphoreContext"
import IconRefreshLine from "@/icons/IconRefreshLine"
import { Box, Button, Divider, Heading, HStack, Input, Link, Text, useBoolean, VStack } from "@chakra-ui/react"
import { generateProof, Group } from "@semaphore-protocol/core"
import { encodeBytes32String, ethers } from "ethers"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import Feedback from "../../../contract-artifacts/Feedback.json"
import useSemaphoreIdentity from "@/hooks/useSemaphoreIdentity"
import path from "path"
import Chart from "@/components/Chart"
import { Profile } from "@/components/profile"
const { groth16 } = require("snarkjs")
import { useAccount } from "wagmi"
import { abi } from "../../../contract-artifacts/MockCoin.json"
import { useReadMockCoinContract, useWriteMockCoinContract } from "@/hooks/useMockCoin"
import { generateGroth16Proof } from "@/utils/generateGroth16Proof"
import { useReadFeedbackContract, useWriteFeedbackContract } from "@/hooks/useFeedback"

const groupIdsIdx = 0

export default function ProofsPage() {
    const router = useRouter()
    const { setLog } = useLogContext()
    const { _users, _feedback, refreshFeedback, addFeedback } = useSemaphoreContext()
    const [_loading, setLoading] = useBoolean()
    const { _identity } = useSemaphoreIdentity()
    const [_userCurrentBalances, setUserCurrentBalances] = useState<string[]>([])
    const [_userOnchainBlanace, setUserOnchainBlanace] = useState<string>("")
    const [depositAmount, setDepositAmount] = useState<string>("0")
    const [betAmount, setBetAmount] = useState<string>("0")
    const [withdrawAmount, setWithdrawAmount] = useState<string>("0")
    const [sendFeedBackNonce, setSendFeedBackNonce] = useState<number>(0)
    const [withdrawEthAddress, setWithdrawEthAddress] = useState<string>("")

    const { address } = useAccount()

    const { data: balanceOfMockCoin, refetch: refetchBalanceOfMockCoin } = useReadMockCoinContract("balanceOf", [
        address
    ])
    const { data: balancesOfMarket, refetch: refetchBalancesOfMarket } = useReadFeedbackContract("checkBalances", [
        groupIdsIdx
    ])

    const { sendTx: sendTxMockCoin, writeResult: writeResultMockCoin } = useWriteMockCoinContract("mint")

    const { sendTx: sendTxSetResult, writeResult: WriteResultSetResult } = useWriteFeedbackContract("setResult")

    const { data: resultOfMarket, refetch: refetchResultOfMarket } = useReadFeedbackContract("results", [groupIdsIdx])

    const { sendTx: sendTxSetBalances, writeResult: WriteSetBalancesResult } = useWriteFeedbackContract("setBalances")

    useEffect(() => {
        const userCurrentBalances: string[] = JSON.parse(
            localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
        )

        if (!userCurrentBalances || userCurrentBalances.length === 0) {
            localStorage.setItem(`userCurrentBalances${groupIdsIdx}`, JSON.stringify(["0", "0", "0"]))

            setUserCurrentBalances(["0", "0", "0"])
        }
    }, [])

    useEffect(() => {
        const userCurrentBalances: string[] = JSON.parse(
            localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
        )

        if (userCurrentBalances.length !== 0) {
            setUserCurrentBalances(userCurrentBalances)
        }
    }, [_feedback, sendFeedBackNonce])

    useEffect(() => {
        if (writeResultMockCoin.data) {
            refetchBalanceOfMockCoin()
        }
    }, [writeResultMockCoin.data, refetchBalanceOfMockCoin])

    useEffect(() => {
        if (WriteResultSetResult.data) {
            refetchResultOfMarket()
        }
    }, [WriteResultSetResult.data, refetchResultOfMarket])

    const feedback = useMemo(() => [..._feedback].reverse(), [_feedback])

    const sendDeposit = async () => {
        let userCurrentBalances: string[] = JSON.parse(
            localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
        )

        const newUserCoinBalance = (parseInt(userCurrentBalances[0]) + parseInt(depositAmount)).toString()

        console.log("userNewBalances", [newUserCoinBalance, userCurrentBalances[1], userCurrentBalances[2]])

        const utxoBalances = await calcUtxo(
            [newUserCoinBalance, userCurrentBalances[1], userCurrentBalances[2]],
            address
        )

        await sendFeedback(utxoBalances)

        setDepositAmount("0")

        await refetchBalanceOfMockCoin()
    }

    const sendBet = async (flag: boolean) => {
        let userCurrentBalances: string[] = JSON.parse(
            localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
        )

        const newUserCoinBalance = (parseInt(userCurrentBalances[0]) - parseInt(betAmount)).toString()

        let newUserTokenABalance: string
        let newUserTokenBBalance: string
        if (flag) {
            newUserTokenABalance = (parseInt(userCurrentBalances[1]) + parseInt(betAmount)).toString()
            newUserTokenBBalance = parseInt(userCurrentBalances[2]).toString()
        } else {
            newUserTokenABalance = parseInt(userCurrentBalances[1]).toString()
            newUserTokenBBalance = (parseInt(userCurrentBalances[2]) + parseInt(betAmount)).toString()
        }

        console.log("userNewBalances", [newUserCoinBalance, newUserTokenABalance, newUserTokenBBalance])

        const utxoBalances = await calcUtxo([newUserCoinBalance, newUserTokenABalance, newUserTokenBBalance], address)

        await sendFeedback(utxoBalances)

        await refetchBalanceOfMockCoin()

        setBetAmount("0")
    }

    const getReward = async () => {
        let userCurrentBalances: string[] = JSON.parse(
            localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
        )

        const result = resultOfMarket! as any

        const newUserCoinBalance = (
            parseInt(userCurrentBalances[0]) +
            (Number((balancesOfMarket as any)[0]) * parseInt(userCurrentBalances[result])) /
                Number((balancesOfMarket as any)[result])
        ).toString()

        let newUserTokenABalance: string = "0"
        let newUserTokenBBalance: string = "0"
        if (result == 1) {
            newUserTokenABalance = (parseInt(userCurrentBalances[1]) - parseInt(betAmount)).toString()
            newUserTokenBBalance = parseInt(userCurrentBalances[2]).toString()
        } else if (result == 2) {
            newUserTokenABalance = parseInt(userCurrentBalances[1]).toString()
            newUserTokenBBalance = (parseInt(userCurrentBalances[2]) - parseInt(betAmount)).toString()
        }

        console.log("userNewBalances", [newUserCoinBalance, newUserTokenABalance, newUserTokenBBalance])

        const utxoBalances = await calcUtxo([newUserCoinBalance, newUserTokenABalance, newUserTokenBBalance], address)

        await sendFeedback(utxoBalances)

        await refetchBalanceOfMockCoin()

        setBetAmount("0")
    }

    const sendWithdraw = async () => {
        let userCurrentBalances: string[] = JSON.parse(
            localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
        )

        const result = resultOfMarket! as any

        const newUserCoinBalance = (parseInt(userCurrentBalances[0]) - parseInt(withdrawAmount)).toString()

        let newUserTokenABalance: string = userCurrentBalances[1]
        let newUserTokenBBalance: string = userCurrentBalances[2]

        console.log("userNewBalances", [newUserCoinBalance, newUserTokenABalance, newUserTokenBBalance])

        const utxoBalances = await calcUtxo([newUserCoinBalance, newUserTokenABalance, newUserTokenBBalance], address)

        await sendFeedback(utxoBalances)

        await refetchBalanceOfMockCoin()

        setBetAmount("0")
    }

    const calcUtxo = useCallback(
        async (userNewBalances: string[], ethAddress: `0x${string}` | undefined) => {
            let userCurrentBalances: string[] = JSON.parse(
                localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
            )

            let diffAmounts: number[] = []

            const result = resultOfMarket! as any
            if (result == 0) {
                const diffA = Math.abs(parseInt(userNewBalances[1]) - parseInt(userCurrentBalances[1]))
                const diffB = Math.abs(parseInt(userNewBalances[2]) - parseInt(userCurrentBalances[2]))
                const diffC =
                    diffA == 0 && diffB == 0
                        ? Math.abs(parseInt(userNewBalances[0]) - parseInt(userCurrentBalances[0]))
                        : 0

                diffAmounts = [diffA + diffB, diffA, diffB, diffC]
            } else {
                const diffA = Math.abs(parseInt(userCurrentBalances[1]) - parseInt(userNewBalances[1]))
                const diffB = Math.abs(parseInt(userCurrentBalances[2]) - parseInt(userNewBalances[2]))
                const diffC =
                    diffA == 0 && diffB == 0
                        ? Math.abs(parseInt(userCurrentBalances[0]) - parseInt(userNewBalances[0]))
                        : 0

                diffAmounts = [diffA + diffB, diffA, diffB, diffC]
            }
            console.log("diffAmounts", diffAmounts)

            await refetchBalancesOfMarket()

            console.log("userCurrentBalances", userCurrentBalances)
            console.log("userNewBalances", userNewBalances)
            console.log("poolCurrentBalances", balancesOfMarket)
            console.log("ethAddress", ethAddress)

            return {
                userCurrentBalances: userCurrentBalances,
                userNewBalances: userNewBalances,
                poolCurrentBalances: [
                    (balancesOfMarket as any)[0].toString(),
                    (balancesOfMarket as any)[1].toString(),
                    (balancesOfMarket as any)[2].toString()
                ],
                ethAddress: ethAddress,
                diffAmounts: diffAmounts
            }
        },
        [balancesOfMarket, _users, _identity, addFeedback, setLoading]
    )

    const sendFeedback = useCallback(
        async (utxoBalances: any) => {
            if (!_identity) {
                return
            }

            // const feedback = prompt("Please enter your feedback:")
            const feedback = "test"

            if (feedback && _users) {
                setLoading.on()

                try {
                    let feedbackSent: boolean = false

                    const group = new Group(_users)
                    const message = encodeBytes32String(feedback)

                    const nonce = localStorage.getItem(`nonce${groupIdsIdx}`) || "0"
                    const scope = parseInt(nonce, 10)
                    console.log("scope", scope)

                    console.log("generateProof args for semaphore", _identity, group, message, scope)

                    const { points, merkleTreeDepth, merkleTreeRoot, nullifier } = await generateProof(
                        _identity,
                        group,
                        message,
                        scope
                    )

                    // let userCurrentBalances: string[] = JSON.parse(
                    //     localStorage.getItem(`userCurrentBalances${groupIdsIdx}`) || "[]"
                    // )

                    // if (userCurrentBalances.length === 0) {
                    //     userCurrentBalances = ["0", "0", "0"]
                    // }

                    const Input = {
                        secret:
                            typeof _identity.privateKey === "string"
                                ? BigInt("0x" + Buffer.from(_identity.privateKey, "base64").toString("hex"))
                                : BigInt(0),
                        nonce: nonce,
                        userCurrentBalances: utxoBalances.userCurrentBalances,
                        userNewBalances: utxoBalances.userNewBalances,
                        poolCurrentBalances: utxoBalances.poolCurrentBalances
                    }

                    console.log("Input", Input)

                    const { proof, publicSignals } = await generateGroth16Proof(Input)

                    const response = await fetch("api/feedback", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            feedback: message,
                            merkleTreeDepth,
                            merkleTreeRoot,
                            nullifier,
                            scope,
                            groupIdsIdx,
                            ethAddress: utxoBalances.ethAddress,
                            diffAmounts: utxoBalances.diffAmounts,
                            points,
                            proof,
                            publicSignals
                        })
                    })

                    if (response.status === 200) {
                        localStorage.setItem(`nonce${groupIdsIdx}`, (parseInt(nonce) + 1).toString())
                        feedbackSent = true
                    }

                    if (feedbackSent) {
                        addFeedback(feedback)

                        await refetchBalancesOfMarket()
                        setSendFeedBackNonce(sendFeedBackNonce + 1)

                        localStorage.setItem(`userCurrentBalances${groupIdsIdx}`, JSON.stringify(Input.userNewBalances))
                    }
                } catch (error) {
                    console.error(error)
                } finally {
                    setLoading.off()
                }
            }
        },
        [_identity, _users, addFeedback, setLoading, setLog]
    )

    return (
        <>
            <Box width="100%" mb="10">
                <HStack width="100%" justify="space-between">
                    <Box width="65%">
                        <Chart />
                        <Box>{balancesOfMarket?.toString()}</Box>
                        <Box>{resultOfMarket?.toString()}</Box>
                    </Box>
                    <Box width="30%">
                        <Heading as="h2" size="xl">
                            Market
                        </Heading>

                        <Text pt="2" fontSize="md"></Text>

                        <Divider pt="5" borderColor="gray.500" />

                        <HStack py="5" justify="space-between">
                            {/* <Text fontWeight="bold" fontSize="lg">
                                Feedback ({_feedback.length})
                            </Text>
                            <Button
                                leftIcon={<IconRefreshLine />}
                                variant="link"
                                color="text.300"
                                onClick={refreshFeedback}
                                size="lg"
                            >
                                Refresh
                            </Button> */}
                        </HStack>
                        <Box mt="5">
                            <Text fontWeight="bold" fontSize="lg">
                                Amount
                            </Text>
                            <Input
                                type="number"
                                width="100%"
                                padding="8px"
                                marginTop="8px"
                                borderRadius="4px"
                                border="1px solid #ccc"
                                value={betAmount}
                                onChange={(e) => {
                                    setBetAmount(e.target.value)
                                }}
                            />
                        </Box>
                        <HStack pb="5" mt="5" spacing="4" w="full" justify="space-between">
                            <Box width="100%">
                                <Button
                                    w="full"
                                    color="white"
                                    colorScheme="green"
                                    isDisabled={_loading}
                                    onClick={() => sendBet(true)}
                                >
                                    Yes
                                </Button>
                            </Box>
                            <Box width="100%">
                                <Button
                                    w="full"
                                    color="white"
                                    colorScheme="orange"
                                    isDisabled={_loading}
                                    onClick={() => sendBet(false)}
                                >
                                    No
                                </Button>
                            </Box>
                        </HStack>
                        <Box width="100%">
                            <Button w="full" isDisabled={_loading} onClick={() => getReward()}>
                                Get Reward
                            </Button>
                            <Button
                                mt="5"
                                w="full"
                                isDisabled={_loading}
                                onClick={() => sendTxSetResult([groupIdsIdx, 1])}
                            >
                                Win A Result (for demo)
                            </Button>
                        </Box>
                        <Box mt="8">
                            <Text fontWeight="bold" fontSize="lg">
                                Your Secret Balance
                            </Text>
                            <Text>
                                <b>Coin Balance</b>: {_userCurrentBalances[0]}
                            </Text>
                            <Text>
                                <b>Token A Balance</b>: {_userCurrentBalances[1]}
                            </Text>
                            <Text>
                                <b>Token B Balance</b>: {_userCurrentBalances[2]}
                            </Text>
                        </Box>
                        <Box mt="12">
                            <Text fontWeight="bold" fontSize="xl">
                                Onchain Operations
                            </Text>
                            <Text>
                                <b>Connected Eth Address</b>
                            </Text>
                            <Profile />
                            <Text>
                                <b>Onchain Coin Balance</b>: {balanceOfMockCoin?.toString()}
                            </Text>
                            <Text mt="4" fontWeight="bold" fontSize="lg">
                                Deposit to secret
                            </Text>
                            <Text mt="2">Amount</Text>
                            <Input
                                type="number"
                                width="100%"
                                padding="8px"
                                marginTop="8px"
                                borderRadius="4px"
                                border="1px solid #ccc"
                                value={depositAmount}
                                onChange={(e) => {
                                    setDepositAmount(e.target.value)
                                }}
                            />
                            <Box width="100%">
                                <Button mt="2" w="full" isDisabled={_loading} onClick={sendDeposit}>
                                    Deposit
                                </Button>
                            </Box>
                            <Box width="100%">
                                <Button
                                    mt="2"
                                    w="full"
                                    isDisabled={_loading}
                                    onClick={() => {
                                        if (!address) {
                                            alert("Please connect your wallet.")
                                            return
                                        } else {
                                            sendTxMockCoin([address, 10000])
                                        }
                                    }}
                                >
                                    Faucet ( for demo )
                                </Button>
                            </Box>
                            <Text mt="5" fontWeight="bold" fontSize="lg">
                                Withdraw from secret
                            </Text>
                            <Box width="100%">
                                <Text mt="2">Withdraw Eth Address</Text>
                                <Input
                                    type="string"
                                    width="100%"
                                    padding="8px"
                                    marginTop="8px"
                                    borderRadius="4px"
                                    border="1px solid #ccc"
                                    value={withdrawEthAddress}
                                    onChange={(e) => {
                                        setWithdrawEthAddress(e.target.value)
                                    }}
                                />
                                <Text mt="2">Amount</Text>
                                <Input
                                    type="number"
                                    width="100%"
                                    padding="8px"
                                    marginTop="8px"
                                    borderRadius="4px"
                                    border="1px solid #ccc"
                                    value={withdrawAmount}
                                    onChange={(e) => {
                                        setWithdrawAmount(e.target.value)
                                    }}
                                />
                                <Button mt="4" w="full" isDisabled={_loading} onClick={sendWithdraw}>
                                    Withdraw to Eth Address
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </HStack>

                {/* <button onClick={generateGroth16Proof(Input)}>Groth16</button> */}

                {/* {_feedback.length > 0 && (
                    <VStack spacing="3" pb="3" align="left" maxHeight="300px" overflowY="scroll">
                        {feedback.map((f, i) => (
                            <HStack key={i} pb="3" borderBottomWidth={i < _feedback.length - 1 ? 1 : 0}>
                                <Text>{f}</Text>
                            </HStack>
                        ))}
                    </VStack>
                )} */}

                {/* <Divider pt="3" borderColor="gray" /> */}

                {/* <Stepper step={3} onPrevClick={() => router.push("/group")} /> */}
            </Box>
        </>
    )
}
