import { task, types } from "hardhat/config"

task("deploy", "Deploy a Feedback contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, semaphore: semaphoreAddress }, { ethers, run }) => {
        if (!semaphoreAddress) {
            const { semaphore } = await run("deploy:semaphore", {
                logs
            })

            semaphoreAddress = await semaphore.getAddress()
        }

        const FeedbackFactory = await ethers.getContractFactory("Feedback")

        const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress, "Token A", "Token B", "TKA", "TKB")

        await feedbackContract.waitForDeployment()

        // const groupId = await feedbackContract.groupId()

        // if (logs) {
        //     console.info(
        //         `Feedback contract has been deployed to: ${await feedbackContract.getAddress()} (groupId: ${groupId})`
        //     )
        // }

        return feedbackContract
    })

task("deploy:All", "Deploy a Feedback contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, semaphore: semaphoreAddress }, { ethers, run }) => {
        if (!semaphoreAddress) {
            const { semaphore } = await run("deploy:semaphore", {
                logs
            })

            semaphoreAddress = await semaphore.getAddress()
        }

        const FeedbackFactory = await ethers.getContractFactory("Feedback")

        const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress, "Token A", "Token B", "TKA", "TKB")

        await feedbackContract.waitForDeployment()

        // const groupId = await feedbackContract.groupId()

        // if (logs) {
        //     console.info(
        //         `Feedback contract has been deployed to: ${await feedbackContract.getAddress()} (groupId: ${groupId})`
        //     )
        // }

        const MockCoinFactory = await ethers.getContractFactory("MockCoin")

        console.info("5")

        const mockCoinContract = await MockCoinFactory.deploy(feedbackContract.getAddress())

        await mockCoinContract.waitForDeployment()

        console.info("6")

        if (logs) {
            console.info(`MockCoin contract has been deployed to: ${await mockCoinContract.getAddress()}`)
        }

        await feedbackContract.setMockCoin(mockCoinContract.getAddress())

        console.info("7")

        return { feedbackContract, mockCoinContract }
    })

// task("deployAll", "Deploy a Feedback contract")
//     .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
//     .addOptionalParam("logs", "Print the logs", true, types.boolean)
//     .setAction(async ({ logs, semaphore: semaphoreAddress }, { ethers, run }) => {
//         if (!semaphoreAddress) {
//             const { semaphore } = await run("deploy:semaphore", {
//                 logs
//             })

//             semaphoreAddress = await semaphore.getAddress()
//         }

//         console.info("1")

//         const FeedbackFactory = await ethers.getContractFactory("Feedback")

//         console.info("2")

//         const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress, "Token A", "Token B", "TKA", "TKB")

//         console.info("3")

//         await feedbackContract.waitForDeployment()

//         console.info("4")

//         // const groupId = await feedbackContract.groupId()

//         // if (logs) {
//         //     console.info(
//         //         `Feedback contract has been deployed to: ${await feedbackContract.getAddress()} (groupId: ${groupId})`
//         //     )
//         // }

//         // const MockCoinFactory = await ethers.getContractFactory("MockCoin")

//         // console.info("5")

//         // const mockCoinContract = await MockCoinFactory.deploy(feedbackContract.getAddress())

//         // await mockCoinContract.waitForDeployment()

//         // console.info("6")

//         // if (logs) {
//         //     console.info(`MockCoin contract has been deployed to: ${await mockCoinContract.getAddress()}`)
//         // }

//         // await feedbackContract.setMockCoin(mockCoinContract.getAddress())

//         // console.info("7")

//         return { feedbackContract }
//     })

task("deployMockCoin", "Deploy a MockCoin contract")
    .addOptionalParam("feedback", "Feedback contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, feedback: feedbackAddress }, { ethers }) => {
        const MockCoinFactory = await ethers.getContractFactory("MockCoin")

        const mockCoinContract = await MockCoinFactory.deploy(feedbackAddress)

        await mockCoinContract.waitForDeployment()

        if (logs) {
            console.info(`MockCoin contract has been deployed to: ${await mockCoinContract.getAddress()}`)
        }

        return mockCoinContract
    })

task("deployPredictionToken", "Deploy a PredictionToken contract")
    .addOptionalParam("feedback", "Feedback contract address", undefined, types.string)
    .addOptionalParam("tokenName", "Token name", undefined, types.string)
    .addOptionalParam("tokenSymbol", "Token symbol", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, feedback: feedbackAddress, tokenName, tokenSymbol }, { ethers }) => {
        const PredictionTokenFactory = await ethers.getContractFactory("PredictionToken")

        const predictionTokenContract = await PredictionTokenFactory.deploy(tokenName, tokenSymbol, feedbackAddress)

        await predictionTokenContract.waitForDeployment()

        if (logs) {
            console.info(`PredictionToken contract has been deployed to: ${await predictionTokenContract.getAddress()}`)
        }

        return predictionTokenContract
    })
