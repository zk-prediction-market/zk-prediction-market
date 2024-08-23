import { BigNumberish } from "ethers"

const { groth16 } = require("snarkjs")

export const parseGloth16Proof = async (proof: any, publicSignals: any) => {
    const calldata = await groth16.exportSolidityCallData(proof, publicSignals)

    const argv = calldata
        .replace(/["[\]\s]/g, "")
        .split(",")
        .map((x: string) => BigInt(x).toString())

    const a: [BigNumberish, BigNumberish] = [argv[0], argv[1]]
    const b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]] = [
        [argv[2], argv[3]],
        [argv[4], argv[5]]
    ]
    const c: [BigNumberish, BigNumberish] = [argv[6], argv[7]]
    const input: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ] = [argv[8], argv[9], argv[10], argv[11], argv[12], argv[13], argv[14], argv[15]]

    return { a, b, c, input }
}
