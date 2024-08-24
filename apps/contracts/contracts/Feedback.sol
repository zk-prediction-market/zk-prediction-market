//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import "./MockCoin.sol";
import "./verifier.sol";
import "hardhat/console.sol";

contract Feedback is Groth16Verifier {
    ISemaphore public semaphore;
    uint256[] public groupIds;

    MockCoin public mockCoin;
    mapping(uint256 => uint256) public coinBalances;
    mapping(uint256 => uint256) public tokenABalances;
    mapping(uint256 => uint256) public tokenBBalances;

    mapping(uint256 => uint256) public results;

    mapping(uint256 => bool) public utxoHashStatus;

    struct PoolBalances {
        uint256 newCoinBalance;
        uint256 newTokenABalance;
        uint256 newTokenBBalance;
        uint256 currentCoinBalance;
        uint256 currentTokenABalance;
        uint256 currentTokenBBalance;
        uint256 _result;
    }

    event UpdatePoolBalances(
        uint256 groupId,
        uint256 timestamp,
        uint256 newCoinBalance,
        uint256 newTokenABalance,
        uint256 newTokenBBalance
    );

    struct FeedbackInput {
        uint256 merkleTreeDepth;
        uint256 merkleTreeRoot;
        uint256 nullifier;
        uint256 feedback;
        uint256 scope;
        uint256[8] points;
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
        uint[12] input;
    }

    constructor(
        address semaphoreAddress,
        string memory tokenAName,
        string memory tokenBName,
        string memory tokenASymbol,
        string memory tokenBSymbol
    ) {
        semaphore = ISemaphore(semaphoreAddress);

        uint256 groupId0 = semaphore.createGroup(address(this));
        groupIds.push(groupId0);

        uint256 groupId1 = semaphore.createGroup(address(this));
        groupIds.push(groupId1);

        uint256 groupId2 = semaphore.createGroup(address(this));
        groupIds.push(groupId2);

        uint256 groupId3 = semaphore.createGroup(address(this));
        groupIds.push(groupId3);
    }

    function setMockCoin(address mockCoinAddress) external {
        mockCoin = MockCoin(mockCoinAddress);
    }

    function createGroup() external {
        uint256 groupId = semaphore.createGroup(address(this));
        groupIds.push(groupId);
    }

    function joinGroup(uint256 identityCommitment, uint256 groupIdsIdx) external {
        semaphore.addMember(groupIds[groupIdsIdx], identityCommitment);
    }

    function checkGroupIds() public view returns (uint256[] memory) {
        return groupIds;
    }

    function sendFeedback(FeedbackInput calldata feedbackInput, uint256 groupIdsIdx, address ethAddress) public {
        console.log("feedbackInput.input[0]", feedbackInput.input[0]);
        console.log("feedbackInput.input[1]", feedbackInput.input[1]);
        console.log("feedbackInput.input[2]", feedbackInput.input[2]);
        console.log("feedbackInput.input[3]", feedbackInput.input[3]);
        console.log("feedbackInput.input[4]", feedbackInput.input[4]);
        console.log("feedbackInput.input[5]", feedbackInput.input[5]);
        console.log("feedbackInput.input[6]", feedbackInput.input[6]);
        console.log("feedbackInput.input[7]", feedbackInput.input[7]);
        console.log("feedbackInput.input[8]", feedbackInput.input[8]);
        console.log("feedbackInput.input[9]", feedbackInput.input[9]);
        console.log("feedbackInput.input[10]", feedbackInput.input[10]);
        console.log("feedbackInput.input[11]", feedbackInput.input[11]);
        _verifyCheck(groupIdsIdx, feedbackInput.a, feedbackInput.b, feedbackInput.c, feedbackInput.input);

        if (feedbackInput.input[3] != 0) {
            require(utxoHashStatus[feedbackInput.input[3]] == true, "utxoHash already used");
            utxoHashStatus[feedbackInput.input[3]] = false;
        }
        utxoHashStatus[feedbackInput.input[4]] = true;

        ISemaphore.SemaphoreProof memory proof = ISemaphore.SemaphoreProof(
            feedbackInput.merkleTreeDepth,
            feedbackInput.merkleTreeRoot,
            feedbackInput.nullifier,
            feedbackInput.feedback,
            feedbackInput.scope,
            feedbackInput.points
        );

        semaphore.validateProof(groupIds[groupIdsIdx], proof);

        PoolBalances memory poolBalances = PoolBalances({
            newCoinBalance: feedbackInput.input[9],
            newTokenABalance: feedbackInput.input[10],
            newTokenBBalance: feedbackInput.input[11],
            currentCoinBalance: coinBalances[groupIdsIdx],
            currentTokenABalance: tokenABalances[groupIdsIdx],
            currentTokenBBalance: tokenBBalances[groupIdsIdx],
            _result: results[groupIdsIdx]
        });

        if (poolBalances._result == 0) {
            // require(poolBalances.newCoinBalance >= poolBalances.currentCoinBalance, "new coin balance must be larger");
            // require(poolBalances.newTokenABalance >= poolBalances.currentTokenABalance, "new TokenA balance must be larger");
            // require(poolBalances.newTokenBBalance >= poolBalances.currentTokenBBalance, "new TokenB balance must be larger");
            if (feedbackInput.input[8] != 0) {
                bool success = mockCoin.transferFrom(ethAddress, address(this), feedbackInput.input[8]);
                require(success, "Transfer failed");
            } else {
                coinBalances[groupIdsIdx] += feedbackInput.input[5];
                tokenABalances[groupIdsIdx] += feedbackInput.input[6];
                tokenBBalances[groupIdsIdx] += feedbackInput.input[7];
            }
            // if (poolBalances.newCoinBalance > poolBalances.currentCoinBalance) {

            //     coinBalances[groupIdsIdx] = poolBalances.currentCoinBalance;
            // } else {
            //     tokenABalances[groupIdsIdx] = poolBalances.currentTokenABalance + feedbackInput.input[6];
            //     tokenBBalances[groupIdsIdx] = poolBalances.currentTokenBBalance + feedbackInput.input[7];
            // }
        } else if (poolBalances._result == 1 && feedbackInput.input[7] == 0) {
            // require(poolBalances.newCoinBalance <= poolBalances.currentCoinBalance, "new coin balance must be smaller");
            if (feedbackInput.input[5] != 0 && feedbackInput.input[6] != 0 && feedbackInput.input[8] == 0) {
                uint256 winAmount = (poolBalances.currentCoinBalance * feedbackInput.input[6]) /
                    poolBalances.currentTokenABalance;

                coinBalances[groupIdsIdx] -= winAmount;
                tokenABalances[groupIdsIdx] = poolBalances.currentTokenABalance - feedbackInput.input[6];

                // uint256 c = 1000;
                // uint256 a = 700;
                // uint256 d = c / a;
            } else if (feedbackInput.input[8] != 0) {
                bool success = mockCoin.transfer(ethAddress, feedbackInput.input[8]);
                require(success, "Transfer failed");
            }
        } else if (poolBalances._result == 2) {}

        emit UpdatePoolBalances(
            groupIdsIdx,
            block.timestamp,
            poolBalances.newCoinBalance,
            poolBalances.newTokenABalance,
            poolBalances.newTokenBBalance
        );
    }

    function setResult(uint256 _groupIdsIdx, uint256 _result) external {
        results[_groupIdsIdx] = _result;
    }

    function setBalances(
        uint256 _groupIdsIdx,
        uint256 _coinBalance,
        uint256 _tokenABalance,
        uint256 _tokenBBalance,
        address _ethAddress,
        uint256 _poolAdd,
        uint256 _poolSub
    ) external {
        coinBalances[_groupIdsIdx] = _coinBalance;
        tokenABalances[_groupIdsIdx] = _tokenABalance;
        tokenBBalances[_groupIdsIdx] = _tokenBBalance;
        mockCoin.transferFrom(_ethAddress, address(this), _poolAdd);
        mockCoin.transfer(_ethAddress, _poolSub);
    }

    function checkBalances(uint256 groupIdsIdx) public view returns (uint256, uint256, uint256, uint256) {
        return (
            coinBalances[groupIdsIdx],
            tokenABalances[groupIdsIdx],
            tokenBBalances[groupIdsIdx],
            mockCoin.balanceOf(address(this))
        );
    }

    function _verifyCheck(
        uint256 groupIdsIdx,
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[12] calldata input
    ) public view returns (bool) {
        // require(input[0] == coinBalances[groupIdsIdx], "Invalid mockCoin balance");
        // require(input[1] == tokenABalances[groupIdsIdx], "Invalid tokenA balance");
        // require(input[2] == tokenBBalances[groupIdsIdx], "Invalid tokenB balance");

        bool isValid = verifyProof(a, b, c, input);

        return isValid;
    }

    function verify(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[12] calldata input
    ) public view returns (bool) {
        bool isValid = verifyProof(a, b, c, input);

        return isValid;
    }
}
