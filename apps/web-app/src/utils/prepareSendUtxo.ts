import { useSemaphoreContext } from "@/context/SemaphoreContext"
import { generateProof, Group, Identity } from "@semaphore-protocol/core"
import { generateGroth16Proof } from "./generateGroth16Proof"

export const prepareSendUtxo = async (
    group: Group,
    groupIdsIdx: number,
    message: string,
    _identity: Identity,
    userNewBalances: string[],
    poolCurrentBalances: string[]
) => {
    const nonce = localStorage.getItem("nonce") || "1"
    const scope = nonce
    console.log("scope", scope)

    const { points, merkleTreeDepth, merkleTreeRoot, nullifier } = await generateProof(_identity, group, message, scope)

    const userCurrentBalances: string[] = JSON.parse(localStorage.getItem("userCurrentBalances") || "[]")

    const Input = {
        secret:
            typeof _identity.privateKey === "string"
                ? BigInt("0x" + Buffer.from(_identity.privateKey, "base64").toString("hex"))
                : BigInt(0),
        nonce: nonce,
        userCurrentBalances: userCurrentBalances,
        userNewBalances: userNewBalances,
        poolCurrentBalances: poolCurrentBalances
    }

    console.log("Input", Input)

    const { proof, publicSignals } = await generateGroth16Proof(Input)

    return {
        feedback: message,
        merkleTreeDepth,
        merkleTreeRoot,
        nullifier,
        scope,
        points,
        proof,
        publicSignals
    }
}
