import { useReadContract, useWriteContract } from "wagmi"
import MockCoin from "../../contract-artifacts/MockCoin.json"
import { useCallback } from "react"

const mockCoinAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"

export function useReadMockCoinContract(functionName: string, args: any) {
    const readResult = useReadContract({
        abi: MockCoin.abi,
        address: mockCoinAddress,
        functionName,
        args
    } as any)

    return readResult
}

export function useWriteMockCoinContract(functionName: string) {
    const writeResult = useWriteContract()

    const sendTx = useCallback(
        async (args: any) => {
            try {
                console.log("Sending transaction with args:", args) // Added for debugging
                await writeResult.writeContractAsync({
                    abi: MockCoin.abi,
                    address: mockCoinAddress,
                    functionName: functionName,
                    args: args
                } as any)
                console.log("Transaction successful") // Added for debugging
            } catch (error: any) {
                console.error("Transaction failed with error:", error) // Added for debugging
                throw Error(error.message)
            }
        },
        [writeResult]
    )

    return { sendTx, writeResult }
}
