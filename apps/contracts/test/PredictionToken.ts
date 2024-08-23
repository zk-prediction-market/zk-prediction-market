import { expect } from "chai"
import { run, ethers } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { PredictionToken } from "../typechain-types"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"

describe("PredictionToken", () => {
    let predictionTokenContract: PredictionToken
    let signer: SignerWithAddress
    let feedbackAddress: SignerWithAddress

    before(async () => {
        ;[signer, feedbackAddress] = await ethers.getSigners()
        predictionTokenContract = await run("deployPredictionToken", {
            feedback: feedbackAddress.address,
            tokenName: "TestToken",
            tokenSymbol: "TST",
            logs: false
        })
    })

    describe("# mint", () => {
        it("Should allow users to mint tokens", async () => {
            ;(await predictionTokenContract.mint(signer.address, ethers.parseEther("1000000"))).wait()

            expect(await predictionTokenContract.balanceOf(signer.address)).to.equal(ethers.parseEther("1000000"))
        })
    })
})
