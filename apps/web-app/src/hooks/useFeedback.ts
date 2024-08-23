import { useReadContract, useWriteContract } from "wagmi"
import Feedback from "../../contract-artifacts/Feedback.json"
import { useCallback } from "react"

const feedbackAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"

export function useReadFeedbackContract(functionName: string, args: any) {
    const readResult = useReadContract({
        abi: Feedback.abi,
        address: feedbackAddress,
        functionName,
        args
    } as any)

    return readResult
}

export function useWriteFeedbackContract(functionName: string) {
    const writeResult = useWriteContract()

    const sendTx = useCallback(
        async (args: any) => {
            try {
                console.log("Sending transaction with args:", args) // Added for debugging
                await writeResult.writeContractAsync({
                    abi: Feedback.abi,
                    address: feedbackAddress,
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
