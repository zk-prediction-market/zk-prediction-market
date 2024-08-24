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
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ] = [
        argv[8],
        argv[9],
        argv[10],
        argv[11],
        argv[12],
        argv[13],
        argv[14],
        argv[15],
        argv[16],
        argv[17],
        argv[18],
        argv[19]
    ] // ここで必要な要素数を確保

    return { a, b, c, input }
}

describe("Feedback", () => {
    let feedbackContract: Feedback
    let semaphoreContract: string
    let mockCoinContract: MockCoin

    let deployer: SignerWithAddress
    let user: SignerWithAddress

    const feedback = encodeBytes32String("Hello World")
    const secret = "777"
    const groupId = 0
    const grounIdsIdx = 0
    const group = new Group()
    const users: Identity[] = []

    let deployerBalanceOfMockCoin
    let checkBalances

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
            console.log(
                "5214945504902875382907094956281886666286383287992303378982586946317105417533",
                await feedbackContract.utxoHashStatus(
                    "5214945504902875382907094956281886666286383287992303378982586946317105417533"
                )
            )
        })
    })

    describe("# deposit", () => {
        it("Should allow users to send feedback anonymously", async () => {
            const scope = 1

            const fullProof = await generateProof(users[1], group, feedback, scope)

            expect(await feedbackContract.checkBalances(groupId)).to.deep.equal([
                BigInt(0),
                BigInt(0),
                BigInt(0),
                BigInt(0)
            ])

            // 証明生成のためにcircuitに入れるインプット
            const Input = {
                secret: secret,
                nonce: "0",
                userCurrentBalances: ["0", "0", "0"],
                userNewBalances: ["1000", "0", "0"],
                diff: ["0", "0", "0", "1000"],
                poolCurrentBalances: ["0", "0", "0"]
            }

            const diffA = parseInt(Input.userNewBalances[1]) - parseInt(Input.userCurrentBalances[1])
            const diffB = parseInt(Input.userNewBalances[2]) - parseInt(Input.userCurrentBalances[2])

            const diffAmounts = [
                diffA + diffB,
                diffA,
                diffB,
                parseInt(Input.userNewBalances[0]) - parseInt(Input.userCurrentBalances[0])
            ]

            console.log("diffAmounts", diffAmounts)

            // Input.diff = diffAmounts.map((diff) => diff.toString())

            console.log("Input", Input)
            // 証明生成
            const { proof, publicSignals } = await groth16.fullProve(
                Input,
                "circuits/circuit_js/circuit.wasm",
                "circuits/circuit_final.zkey"
            )

            const { a, b, c, input } = await parseGloth16Proof(proof, publicSignals)
            console.log("input", input)

            await (await mockCoinContract.mint(deployer.getAddress(), 1000000)).wait()

            expect(await mockCoinContract.balanceOf(deployer.getAddress())).to.equal(1000000)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            console.log("feedbackInput.input[3]", input[3])
            console.log("utxoHashStatus", await feedbackContract.utxoHashStatus(input[3]))
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
                    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                )
            ).wait()

            console.log("deposit done")

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            expect(await feedbackContract.checkBalances(groupId)).to.deep.equal([
                BigInt(0),
                BigInt(0),
                BigInt(0),
                BigInt(1000)
            ])
        })
    })

    describe("# bet", () => {
        it("bet 1", async () => {
            const scope = 2

            const fullProof = await generateProof(users[1], group, feedback, scope)

            const checkBalancesOfPool = await feedbackContract.checkBalances(groupId)
            console.log("checkBalancesOfPool", checkBalancesOfPool)
            expect(checkBalancesOfPool).to.deep.equal([BigInt(0), BigInt(0), BigInt(0), BigInt(1000)])

            // 証明生成のためにcircuitに入れるインプット
            const Input = {
                secret: "777",
                nonce: "1",
                userCurrentBalances: ["1000", "0", "0"],
                userNewBalances: ["300", "700", "0"],
                diff: ["0", "0", "0", "0"],
                poolCurrentBalances: ["0", "0", "0"]
            }

            const diffA = parseInt(Input.userNewBalances[1]) - parseInt(Input.userCurrentBalances[1])
            console.log("debug")
            const diffB = parseInt(Input.userNewBalances[2]) - parseInt(Input.userCurrentBalances[2])

            const diffAmounts = [diffA + diffB, diffA, diffB, 0]

            console.log("diffAmounts", diffAmounts)

            Input.diff = diffAmounts.map((diff) => diff.toString())

            console.log("Input", Input)
            // 証明生成
            const { proof, publicSignals } = await groth16.fullProve(
                Input,
                "circuits/circuit_js/circuit.wasm",
                "circuits/circuit_final.zkey"
            )

            const { a, b, c, input: input2 } = await parseGloth16Proof(proof, publicSignals)
            console.log("input", input2)

            const grounIdsIdx = 0

            let deployerBalanceOfMockCoin
            let checkBalances

            expect(await mockCoinContract.balanceOf(deployer.getAddress())).to.equal(1000000 - 1000)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            console.log("feedbackInput.input[3]", input2[3])
            console.log("utxoHashStatus", await feedbackContract.utxoHashStatus(input2[3]))
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
                        input: input2
                    },
                    grounIdsIdx,
                    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                )
            ).wait()

            console.log("deposit done")

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            console.log("User UTXO", Input)
        })
        it("bet 2", async () => {
            const scope = 3

            const fullProof = await generateProof(users[1], group, feedback, scope)

            const checkBalancesOfPool = await feedbackContract.checkBalances(groupId)
            console.log("checkBalancesOfPool", checkBalancesOfPool)
            expect(checkBalancesOfPool).to.deep.equal([BigInt(700), BigInt(700), BigInt(0), BigInt(1000)])

            // 証明生成のためにcircuitに入れるインプット
            const Input3 = {
                secret: "777",
                nonce: "2",
                userCurrentBalances: ["300", "700", "0"],
                userNewBalances: ["0", "700", "300"],
                diff: ["0", "0", "0", "0"],
                poolCurrentBalances: ["700", "700", "0"]
            }

            const diffA = parseInt(Input3.userNewBalances[1]) - parseInt(Input3.userCurrentBalances[1])
            console.log("debug")
            const diffB = parseInt(Input3.userNewBalances[2]) - parseInt(Input3.userCurrentBalances[2])

            const diffAmounts = [diffA + diffB, diffA, diffB, 0]

            console.log("diffAmounts", diffAmounts)

            Input3.diff = diffAmounts.map((diff) => diff.toString())

            console.log("Input", Input3)
            // 証明生成
            const { proof, publicSignals } = await groth16.fullProve(
                Input3,
                "circuits/circuit_js/circuit.wasm",
                "circuits/circuit_final.zkey"
            )

            const { a, b, c, input: input3 } = await parseGloth16Proof(proof, publicSignals)
            console.log("input3", input3)

            const grounIdsIdx = 0

            let deployerBalanceOfMockCoin
            let checkBalances

            expect(await mockCoinContract.balanceOf(deployer.getAddress())).to.equal(1000000 - 1000)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            console.log("feedbackInput.input[3]", input3[3])
            console.log("utxoHashStatus", await feedbackContract.utxoHashStatus(input3[3]))
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
                        input: input3
                    },
                    grounIdsIdx,
                    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                )
            ).wait()

            console.log("deposit done")

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            expect(checkBalances).to.deep.equal([BigInt(1000), BigInt(700), BigInt(300), BigInt(1000)])

            console.log("User UTXO", Input3)
        })
    })

    describe("# result and withdraw", () => {
        it("result 1", async () => {
            // const grounIdsIdx = 0
            let result
            result = await feedbackContract.results(grounIdsIdx)

            console.log("result before setResult", result)

            await (await feedbackContract.setResult(grounIdsIdx, 1)).wait()

            console.log("setResult done")

            result = await feedbackContract.results(grounIdsIdx)

            console.log("result after setResult", result)

            const scope = 4

            const fullProof = await generateProof(users[1], group, feedback, scope)

            const checkBalancesOfPool = await feedbackContract.checkBalances(groupId)
            console.log("checkBalancesOfPool", checkBalancesOfPool)
            expect(checkBalancesOfPool).to.deep.equal([BigInt(1000), BigInt(700), BigInt(300), BigInt(1000)])

            // 証明生成のためにcircuitに入れるインプット
            // const Input = {
            //     secret: "777",
            //     nonce: "3",
            //     userCurrentBalances: ["300", "700", "300"],
            //     userNewBalances: ["500", "350", "300"],
            //     poolCurrentBalances: ["1000", "700", "300"]
            // }
            const Input4 = {
                secret: "777",
                nonce: "3",
                userCurrentBalances: ["0", "700", "300"],
                userNewBalances: ["500", "350", "300"],
                diff: ["0", "0", "0", "0"],
                poolCurrentBalances: ["1000", "700", "300"]
            }

            const diffA2 = parseInt(Input4.userCurrentBalances[1]) - parseInt(Input4.userNewBalances[1])

            console.log("diffA2", diffA2)

            const diffAmounts = [diffA2, diffA2, 0, 0]

            console.log("diffAmounts", diffAmounts)

            console.log("diffA2", diffA2)

            Input4.diff = diffAmounts.map((diff) => diff.toString())
            console.log("Input", Input4)
            // 証明生成
            const { proof, publicSignals } = await groth16.fullProve(
                Input4,
                "circuits/circuit_js/circuit.wasm",
                "circuits/circuit_final.zkey"
            )

            console.log("Input4", Input4)

            console.log("parseInt(Input4.userCurrentBalances[1])", parseInt(Input4.userCurrentBalances[1]))
            console.log("parseInt(Input4.userNewBalances[1])", parseInt(Input4.userNewBalances[1]))

            const { a, b, c, input: input4 } = await parseGloth16Proof(proof, publicSignals)
            console.log("input4", input4)

            let deployerBalanceOfMockCoin
            let checkBalances

            expect(await mockCoinContract.balanceOf(deployer.getAddress())).to.equal(1000000 - 1000)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            console.log("============before sendFeedback")

            console.log("feedbackInput.input[3]", input4[3])
            console.log("utxoHashStatus", await feedbackContract.utxoHashStatus(input4[3]))
            console.log(
                "5214945504902875382907094956281886666286383287992303378982586946317105417533",
                await feedbackContract.utxoHashStatus(
                    "5214945504902875382907094956281886666286383287992303378982586946317105417533"
                )
            )
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
                        input: input4
                    },
                    grounIdsIdx,
                    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                )
            ).wait()
            console.log("============")

            console.log("win rate done")

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            console.log("===========")
            const checkBalancesOfPool2 = await feedbackContract.checkBalances(groupId)
            console.log("checkBalancesOfPool", checkBalancesOfPool2)
            expect(checkBalancesOfPool2).to.deep.equal([BigInt(500), BigInt(350), BigInt(300), BigInt(1000)])
            console.log("===========")

            console.log("User UTXO", Input4)
        })

        it("withdraw", async () => {
            const scope = 5

            const fullProof = await generateProof(users[1], group, feedback, scope)

            const checkBalancesOfPool = await feedbackContract.checkBalances(groupId)
            console.log("checkBalancesOfPool", checkBalancesOfPool)
            expect(checkBalancesOfPool).to.deep.equal([BigInt(500), BigInt(350), BigInt(300), BigInt(1000)])

            // 証明生成のためにcircuitに入れるインプット
            const Input5 = {
                secret: "777",
                nonce: "4",
                userCurrentBalances: ["500", "350", "300"],
                userNewBalances: ["250", "350", "300"],
                diff: ["0", "0", "0", "0"],
                poolCurrentBalances: ["500", "350", "300"]
            }
            console.log("Input", Input5)

            console.log("Input5", Input5)

            console.log("parseInt(Input5.userCurrentBalances[1])", parseInt(Input5.userCurrentBalances[1]))
            console.log("parseInt(Input5.userNewBalances[1])", parseInt(Input5.userNewBalances[1]))

            const diffC = parseInt(Input5.userCurrentBalances[0]) - parseInt(Input5.userNewBalances[0])

            console.log("diffC", diffC)

            const diffAmounts = [0, 0, 0, diffC]

            console.log("diffAmounts", diffAmounts)

            Input5.diff = diffAmounts.map((diff) => diff.toString())
            // 証明生成
            const { proof, publicSignals } = await groth16.fullProve(
                Input5,
                "circuits/circuit_js/circuit.wasm",
                "circuits/circuit_final.zkey"
            )

            const { a, b, c, input: input5 } = await parseGloth16Proof(proof, publicSignals)
            console.log("input5", input5)

            let deployerBalanceOfMockCoin
            let checkBalances

            expect(await mockCoinContract.balanceOf(deployer.getAddress())).to.equal(1000000 - 1000)

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            console.log("feedbackInput.input[3]", input5[3])
            console.log("utxoHashStatus", await feedbackContract.utxoHashStatus(input5[3]))
            const currentTimestamp = (await ethers.provider.getBlock("latest"))!.timestamp
            console.log("currentTimestamp", currentTimestamp)
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
                        input: input5
                    },
                    grounIdsIdx,
                    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                )
            ).wait()
            // .to.emit(feedbackContract, "UpdatePoolBalances")
            // .withArgs(grounIdsIdx, (await ethers.provider.getBlock("latest"))!.timestamp, 500, 350, 300)

            console.log("withdraw done")

            deployerBalanceOfMockCoin = await mockCoinContract.balanceOf(deployer.getAddress())
            console.log("deployerBalanceOfMockCoin", deployerBalanceOfMockCoin)

            checkBalances = await feedbackContract.checkBalances(grounIdsIdx)
            console.log("checkBalances", checkBalances)

            expect(checkBalances).to.deep.equal([BigInt(500), BigInt(350), BigInt(300), BigInt(750)])

            // console.log("User UTXO", input5)
        })
    })
})
