import { Group, Identity, generateProof } from "@semaphore-protocol/core"
import { expect } from "chai"
import { BigNumberish, encodeBytes32String } from "ethers"
import { ethers, run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { Feedback, MockCoin } from "../typechain-types"
const { groth16 } = require("snarkjs")
import verification_key from "../circuits/verification_key.json"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"

const parseGloth16Proof = async (proof: any, publicSignals: any) => {
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
    // inputの型を修正
    const input: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ] = [argv[8], argv[9], argv[10], argv[11], argv[12], argv[13], argv[14], argv[15]] // ここで必要な要素数を確保

    return { a, b, c, input }
}

describe("Feedback", () => {
    let feedbackContract: Feedback
    let semaphoreContract: string
    let mockCoinContract: MockCoin

    let deployer: SignerWithAddress
    let user: SignerWithAddress

    const groupId = 0
    const group = new Group()
    const users: Identity[] = []

    before(async () => {
        ;[deployer, user] = await ethers.getSigners()
        const { semaphore } = await run("deploy:semaphore", {
            logs: false
        })

        const { feedbackContract: feedback, mockCoinContract: mockCoin } = await run("deploy:All", {
            logs: true,
            semaphore: await semaphore.getAddress(),
            tokenAName: "Token A",
            tokenBName: "Token B",
            tokenASymbol: "TKA",
            tokenBSymbol: "TKB"
        })
        semaphoreContract = semaphore
        feedbackContract = feedback
        mockCoinContract = mockCoin

        users.push(new Identity())
        users.push(new Identity())
    })

    describe("# joinGroup", () => {
        it("Should allow users to join the group", async () => {
            for await (const [i, user] of users.entries()) {
                const grounIdsIdx = 0
                const transaction = feedbackContract.joinGroup(user.commitment, grounIdsIdx)

                group.addMember(user.commitment)

                await expect(transaction)
                    .to.emit(semaphoreContract, "MemberAdded")
                    .withArgs(groupId, i, user.commitment, group.root)
            }
        })
    })

    describe("# verify", () => {
        it("Should allow users to verify the feedback", async () => {
            // 証明生成のためにcircuitに入れるインプット
            const Input = {
                secret: "1",
                nonce: "0",
                userCurrentBalances: ["0", "0", "0"],
                userNewBalances: ["11", "12", "13"],
                poolCurrentBalances: ["21", "22", "23"]
            }
            console.log("Input")
            // 証明生成
            const { proof, publicSignals } = await groth16.fullProve(
                Input,
                "circuits/circuit_js/circuit.wasm",
                "circuits/circuit_final.zkey"
            )

            console.log("proof")

            const { a, b, c, input } = await parseGloth16Proof(proof, publicSignals)
            console.log("input", input)

            // a, b, c はzkSNARKの証明のための標準的な形式
            const transaction = await feedbackContract.verify(a, b, c, input)
            await expect(transaction).not.to.be.reverted
        })
    })

    describe("# sendFeedback", () => {
        it("Should allow users to send feedback anonymously", async () => {
            const feedback = encodeBytes32String("Hello World")

            const scope = 1

            const fullProof = await generateProof(users[1], group, feedback, scope)

            // 証明生成のためにcircuitに入れるインプット
            const Input = {
                secret: "1",
                nonce: "1",
                userCurrentBalances: ["11", "12", "13"],
                userNewBalances: ["31", "32", "33"],
                poolCurrentBalances: ["21", "22", "23"]
            }
            // 証明生成
            const { proof, publicSignals } = await groth16.fullProve(
                Input,
                "circuits/circuit_js/circuit.wasm",
                "circuits/circuit_final.zkey"
            )
            const diffAmounts = [
                parseInt(Input.userNewBalances[0]) - parseInt(Input.userCurrentBalances[0]),
                parseInt(Input.userNewBalances[1]) - parseInt(Input.userCurrentBalances[1]),
                parseInt(Input.userNewBalances[2]) - parseInt(Input.userCurrentBalances[2])
            ]

            console.log("diffAmounts", diffAmounts)
            console.log("diffAmounts[0]", diffAmounts[0])

            const { a, b, c, input } = await parseGloth16Proof(proof, publicSignals)
            console.log("input", input)

            // const transaction = await feedbackContract.sendFeedback(
            //     fullProof.merkleTreeDepth,
            //     fullProof.merkleTreeRoot,
            //     fullProof.nullifier,
            //     feedback,
            //     scope,
            //     fullProof.points,
            //     a,
            //     b,
            //     c,
            //     input
            // )

            const grounIdsIdx = 0

            const mockCoinAddress = await mockCoinContract.getAddress()
            console.log("mockCoinAddress", mockCoinAddress)

            const mockCoinAddrInFB = await feedbackContract.mockCoin()
            console.log("mockCoinAddrInFB", mockCoinAddrInFB)

            let deployerBalanceOfMockCoin
            let userBalanceOfMockCoin
            let poolBalancesOfMockCoin

            await(await mockCoinContract.mint(deployer.getAddress(), 1000000)).wait()

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            userBalanceOfMockCoin = await mockCoinContract.balanceOf(user.getAddress())
            console.log("userBalanceOfMockCoin", userBalanceOfMockCoin)

            poolBalancesOfMockCoin = await mockCoinContract.balanceOf(feedbackContract.getAddress())
            console.log("poolBalancesOfMockCoin", poolBalancesOfMockCoin)

            await (
                await feedbackContract.sendFeedback(
                    {
                        merkleTreeDepth: fullProof.merkleTreeDepth,
                        merkleTreeRoot: fullProof.merkleTreeRoot,
                        nullifier: fullProof.nullifier,
                        feedback: feedback,
                        scope: scope,
                        points: fullProof.points,
                        a: a,
                        b: b,
                        c: c,
                        input: input
                    },
                    grounIdsIdx,
                    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // local account #0
                    [diffAmounts[0], diffAmounts[1], diffAmounts[2]]
                )
            ).wait()

            // await expect(
            //     await feedbackContract.sendFeedback(
            //         {
            //             merkleTreeDepth: fullProof.merkleTreeDepth,
            //             merkleTreeRoot: fullProof.merkleTreeRoot,
            //             nullifier: fullProof.nullifier,
            //             feedback: feedback,
            //             scope: scope,
            //             points: fullProof.points,
            //             a: a,
            //             b: b,
            //             c: c,
            //             input: input
            //         },
            //         grounIdsIdx,
            //         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // local account #0
            //         [diffAmounts[0], diffAmounts[1], diffAmounts[2]]
            //     )
            // )
            //     .to.emit(feedbackContract, "UpdatePoolBalances")
            //     .withArgs(groupId, (await ethers.provider.getBlock("latest"))!.timestamp, input[5], input[6], input[7])

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            userBalanceOfMockCoin = await mockCoinContract.balanceOf(user.getAddress())
            console.log("userBalanceOfMockCoin", userBalanceOfMockCoin)

            poolBalancesOfMockCoin = await mockCoinContract.balanceOf(feedbackContract.getAddress())
            console.log("poolBalancesOfMockCoin", poolBalancesOfMockCoin)
        })
    })
})
