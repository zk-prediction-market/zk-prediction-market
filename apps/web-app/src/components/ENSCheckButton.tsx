import React, { useState, useEffect } from "react"
import { useAccount, useEnsName } from "wagmi"
import { Button, useToast } from "@chakra-ui/react"

const ENSCheckButton = ({ onJoin }) => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: ensName, isLoading: isEnsLoading } = useEnsName({ address })
    const toast = useToast()
    const [buttonText, setButtonText] = useState("JOIN")

    useEffect(() => {
        if (!isEnsLoading && !ensName && !isDisconnected) {
            setButtonText("CAN'T JOIN")
        }
    }, [ensName, isEnsLoading, isDisconnected])

    const handleClick = async () => {
        console.log("isDisconnected:", isDisconnected)
        console.log("isConnecting:", isConnecting)
        console.log("isEnsLoading:", isEnsLoading)
        console.log("ensName:", ensName)

        if (isDisconnected) {
            toast({
                title: "Wallet is not connected",
                description: "Please connect your wallet.",
                status: "error",
                duration: 5000,
                isClosable: true
            })
            return
        }

        if (isConnecting || isEnsLoading) {
            return // Do nothing if still connecting or loading
        }

        if (ensName) {
            onJoin()
        } else {
            toast({
                title: "ENS is not set",
                description: "You need an ENS to join this DAO.",
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
    }

    return (
        <Button
            colorScheme="teal"
            size="md"
            width="40%"
            alignSelf="center"
            onClick={handleClick}
            isLoading={isConnecting || isEnsLoading}
            loadingText="Checking"
        >
            {buttonText}
        </Button>
    )
}

export default ENSCheckButton
