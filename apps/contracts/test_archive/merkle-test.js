const { poseidonContract } = require("circomlibjs")
const { expect } = require("chai")
const { ethers } = require("hardhat")
const { groth16 } = require("snarkjs")

describe("MerkleTree", function () {
    let merkleTree

    beforeEach(async function () {
        const PoseidonT3Custom = await ethers.getContractFactory(
            poseidonContract.generateABI(2),
            poseidonContract.createCode(2)
        )
        const poseidonT3Custom = await (await PoseidonT3Custom.deploy()).waitForDeployment()

        const MerkleTree = await ethers.getContractFactory("MerkleTree", {
            libraries: {
                PoseidonT3Custom: poseidonT3Custom.target // 修正箇所
            }
        })
        merkleTree = await MerkleTree.deploy()
        await merkleTree.waitForDeployment()
    })

    it("Insert two new leaves and verify the first leaf in an inclusion proof", async function () {
        // 引数はハッシュされたリーフのつもり
        await merkleTree.insertLeaf(1)
        await merkleTree.insertLeaf(2)

        // 0番目のリーフ「1」のマークルパスをコントラクトから取得
        const node9 = (await merkleTree.hashes(9)).toString()
        const node13 = (await merkleTree.hashes(13)).toString()

        // 証明生成のためにcircuitに入れるインプット
        const Input = {
            leaf: "1",
            path_elements: ["2", node9, node13],
            path_index: ["0", "0", "0"]
        }

        // 証明生成
        const { proof, publicSignals } = await groth16.fullProve(
            Input,
            "circuits/circuit_js/circuit.wasm",
            "circuits/circuit_final.zkey"
        )

        // proofとpublicSignalsをSolidityコントラクトで使用できる形式に変換
        const calldata = await groth16.exportSolidityCallData(proof, publicSignals)

        // 変換されたデータを整える
        const argv = calldata
            .replace(/["[\]\s]/g, "")
            .split(",")
            .map((x) => BigInt(x).toString())

        const a = [argv[0], argv[1]]
        const b = [
            [argv[2], argv[3]],
            [argv[4], argv[5]]
        ]
        const c = [argv[6], argv[7]]
        const input = argv.slice(8)

        // a, b, c はzkSNARKの証明のための標準的な形式
        expect(await merkleTree.verify(a, b, c, input)).to.be.true

        // [bonus] verify the second leaf with the inclusion proof
        const Input2 = {
            leaf: "2",
            path_elements: ["1", node9, node13],
            path_index: ["1", "0", "0"]
        }

        const { proof: proof2, publicSignals: publicSignals2 } = await groth16.fullProve(
            Input2,
            "circuits/circuit_js/circuit.wasm",
            "circuits/circuit_final.zkey"
        )

        const calldata2 = await groth16.exportSolidityCallData(proof2, publicSignals2)

        const argv2 = calldata2
            .replace(/["[\]\s]/g, "")
            .split(",")
            .map((x) => BigInt(x).toString())

        const a2 = [argv2[0], argv2[1]]
        const b2 = [
            [argv2[2], argv2[3]],
            [argv2[4], argv2[5]]
        ]
        const c2 = [argv2[6], argv2[7]]
        const input2 = argv2.slice(8)

        expect(await merkleTree.verify(a2, b2, c2, input2)).to.be.true
    })
})
