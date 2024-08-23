import { expect } from "chai"
import { run, ethers } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { MockCoin } from "../typechain-types"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"

describe("MockCoin", () => {
    let mockContract: MockCoin
    let signer: SignerWithAddress
    let feedbackAddress: SignerWithAddress

    before(async () => {
        ;[signer, feedbackAddress] = await ethers.getSigners()
        mockContract = await run("deployMockCoin", { feedback: feedbackAddress.address, logs: false })
    })

    describe("# mint", () => {
        it("Should allow users to mint tokens", async () => {
            ;(await mockContract.mint(signer.address, ethers.parseEther("1000000"))).wait()

            expect(await mockContract.balanceOf(signer.address)).to.equal(ethers.parseEther("1000000"))
        })
    })
})
