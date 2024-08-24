import { Contract, encodeBytes32String, InfuraProvider, JsonRpcProvider, Wallet } from "ethers"
import { NextRequest } from "next/server"
import Feedback from "../../../../contract-artifacts/Feedback.json"
import { parseGloth16Proof } from "@/utils/parseGloth16Proof"

export async function POST(req: NextRequest) {
    if (typeof process.env.ETHEREUM_PRIVATE_KEY !== "string") {
        throw new Error("Please, define ETHEREUM_PRIVATE_KEY in your .env file")
    }

    const ethereumPrivateKey = process.env.ETHEREUM_PRIVATE_KEY
    const ethereumNetwork = process.env.NEXT_PUBLIC_DEFAULT_NETWORK as string
    const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY as string
    const contractAddress = process.env.NEXT_PUBLIC_FEEDBACK_CONTRACT_ADDRESS as string

    const provider =
        ethereumNetwork === "localhost"
            ? new JsonRpcProvider("http://127.0.0.1:8545")
            : new InfuraProvider(ethereumNetwork, infuraApiKey)

    const signer = new Wallet(ethereumPrivateKey, provider)
    const contract = new Contract(contractAddress, Feedback.abi, signer)

    const {
        feedback,
        merkleTreeDepth,
        merkleTreeRoot,
        nullifier,
        scope,
        groupIdsIdx,
        ethAddress,
        diffAmounts,
        points,
        proof,
        publicSignals
    } = await req.json()

    console.log("scope", scope)

    try {
        const { a, b, c, input } = await parseGloth16Proof(proof, publicSignals)

        // await contract.verify(a, b, c, input)

        // await testTx.wait()

        // const feedback2: string = input[0].toString()

        // const feedback3: string = encodeBytes32String("test")

        // console.log("========================")
        // console.log("feedback", feedback)
        // console.log("feedback2", feedback2)
        // console.log("feedback3", feedback3)
        // console.log("========================")

        console.log("13")
        const transaction = await contract.sendFeedback(
            {
                merkleTreeDepth,
                merkleTreeRoot,
                nullifier,
                feedback: feedback,
                scope,
                points,
                a,
                b,
                c,
                input
            },
            groupIdsIdx,
            ethAddress,
            diffAmounts
        )
        console.log("14")

        await transaction.wait()

        return new Response("Success", { status: 200 })
    } catch (error: any) {
        console.error(error)

        return new Response(`Server error: ${error}`, {
            status: 500
        })
    }
}
