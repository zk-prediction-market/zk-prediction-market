const { poseidonContract } = require("circomlibjs")
const { expect } = require("chai")
const { ethers } = require("hardhat")
const { groth16 } = require("snarkjs")
const verification_key = require("../circuits/verification_key.json")

describe("Utxo", function () {
    it("Create Utxo", async function () {
        // 証明生成のためにcircuitに入れるインプット
        const Input = {
            secret: "1",
            nonce: "0",
            userCurrentBalances: ["11", "12", "13"],
            userNewBalances: ["11", "12", "13"],
            poolCurrentBalances: ["21", "22", "23"]
        }
        // 証明生成
        const { proof, publicSignals } = await groth16.fullProve(
            Input,
            "circuits/circuit_js/circuit.wasm",
            "circuits/circuit_final.zkey"
        )

        // 証明の検証
        const isValid = await groth16.verify(verification_key, publicSignals, proof)
        expect(isValid).to.be.true
    })
})
