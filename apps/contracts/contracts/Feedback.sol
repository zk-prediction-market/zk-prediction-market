//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import "./MockCoin.sol";
import "./PredictionToken.sol";
import "./verifier.sol"; //inherits with the MerkleTreeInclusionProof verifier contract

contract Feedback is Groth16Verifier {
    ISemaphore public semaphore;
    uint256[] public groupIds;

    MockCoin public mockCoin;
    mapping(uint256 => uint256) public coinBalances;
    mapping(uint256 => uint256) public tokenABalances;
    mapping(uint256 => uint256) public tokenBBalances;

    mapping(uint256 => uint256) public results;

    mapping(uint256 => bool) private utxoHashStatus;

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
        uint[8] input;
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

        // tokenA = new PredictionToken(tokenAName, tokenASymbol, address(this));
        // tokenB = new PredictionToken(tokenBName, tokenBSymbol, address(this));
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

    function sendFeedback(
        FeedbackInput calldata feedbackInput,
        uint256 groupIdsIdx,
        address ethAddress,
        uint256[3] calldata diffAmounts
    ) public {
        _verifyCheck(groupIdsIdx, feedbackInput.a, feedbackInput.b, feedbackInput.c, feedbackInput.input);

        // TODO: fix later
        // if (feedbackInput.input[3] != 0) {
        //     require(utxoHashStatus[feedbackInput.input[3]], "Utxo already used");
        //     utxoHashStatus[feedbackInput.input[3]] = false;
        // }
        utxoHashStatus[feedbackInput.input[4]] = true;

        ISemaphore.SemaphoreProof memory proof = ISemaphore.SemaphoreProof(
            feedbackInput.merkleTreeDepth,
            feedbackInput.merkleTreeRoot,
            feedbackInput.nullifier,
            feedbackInput.feedback,
            feedbackInput.scope,
            feedbackInput.points
        );

        // semaphore.validateProof(groupIds[groupIdsIdx], proof);

        PoolBalances memory poolBalances = PoolBalances({
            newCoinBalance: feedbackInput.input[5],
            newTokenABalance: feedbackInput.input[6],
            newTokenBBalance: feedbackInput.input[7],
            currentCoinBalance: coinBalances[groupIdsIdx],
            currentTokenABalance: tokenABalances[groupIdsIdx],
            currentTokenBBalance: tokenBBalances[groupIdsIdx],
            _result: results[groupIdsIdx]
        });

        bool success = mockCoin.transferFrom(ethAddress, address(this), diffAmounts[0]);
        require(success, "Transfer failed");

        // if (poolBalances._result != 0) {
        //     require(poolBalances.newCoinBalance >= poolBalances.currentCoinBalance, "new coin balance must be larger");
        //     require(poolBalances.newTokenABalance >= poolBalances.currentTokenABalance, "new TokenA balance must be larger");
        //     require(poolBalances.newTokenBBalance >= poolBalances.currentTokenBBalance, "new TokenB balance must be larger");

        //     if (poolBalances.newCoinBalance >= poolBalances.currentCoinBalance) {
        //         bool success = mockCoin.transferFrom(ethAddress, address(this), diffAmounts[0]);
        //         require(success, "Transfer failed");
        //     }
        // } else {
        //     require(poolBalances.newCoinBalance <= poolBalances.currentCoinBalance, "new coin balance must be smaller");
        //     if (poolBalances._result == 1) {
        //         require(poolBalances.newTokenABalance <= poolBalances.currentTokenABalance, "new TokenA balance must be smaller");
        //         require(poolBalances.newTokenBBalance == poolBalances.currentTokenBBalance, "new TokenB balance can't change");
        //     } else {
        //         require(poolBalances.newTokenABalance == poolBalances.currentTokenABalance, "new TokenA balance can't change");
        //         require(poolBalances.newTokenBBalance <= poolBalances.currentTokenBBalance, "new TokenB balance must be smaller");
        //     }
        // }

        coinBalances[groupIdsIdx] = poolBalances.newCoinBalance;
        tokenABalances[groupIdsIdx] = poolBalances.newTokenABalance;
        tokenBBalances[groupIdsIdx] = poolBalances.newTokenBBalance;

        emit UpdatePoolBalances(
            groupIdsIdx,
            block.timestamp,
            poolBalances.newCoinBalance,
            poolBalances.newTokenABalance,
            poolBalances.newTokenBBalance
        );
    }

    function deposit(uint256 groupIdsIdx, uint256 amount) external {
        mockCoin.transferFrom(msg.sender, address(this), amount);
        // tokenA.mint(address(this), amount * 10);
        // tokenB.mint(address(this), amount * 10);

        coinBalances[groupIdsIdx] += amount;
        tokenABalances[groupIdsIdx] += amount * 10;
        tokenBBalances[groupIdsIdx] += amount * 10;
    }

    function setResult(uint256 _groupIdsIdx, uint256 _result) external {
        results[_groupIdsIdx] = _result;
    }

    function claim(uint256 _groupIdsIdx) external {
        require(results[_groupIdsIdx] != 0, "Result not yet available");
    }

    function checkBalances(uint256 groupIdsIdx) public view returns (uint256, uint256, uint256, uint256) {
        return (
            coinBalances[groupIdsIdx],
            tokenABalances[groupIdsIdx],
            tokenBBalances[groupIdsIdx],
            mockCoin.balanceOf(address(this))
        );
    }

    function checkPrice(uint256 groupIdsIdx) public view returns (uint256, uint256) {
        uint256 totalBalance = tokenABalances[groupIdsIdx] + tokenBBalances[groupIdsIdx];

        require(totalBalance > 0, "Total balance must be greater than zero to prevent division by zero");

        uint256 tokenAPrice = tokenABalances[groupIdsIdx] / totalBalance;
        uint256 tokenBPrice = tokenBBalances[groupIdsIdx] / totalBalance;

        return (tokenAPrice, tokenBPrice);
    }

    function _verifyCheck(
        uint256 groupIdsIdx,
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[8] calldata input
    ) public view returns (bool) {
        require(input[0] == coinBalances[groupIdsIdx], "Invalid mockCoin balance");
        require(input[1] == tokenABalances[groupIdsIdx], "Invalid tokenA balance");
        require(input[2] == tokenBBalances[groupIdsIdx], "Invalid tokenB balance");

        bool isValid = verifyProof(a, b, c, input);

        return isValid;
    }

    function verify(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[8] calldata input
    ) public view returns (bool) {
        bool isValid = verifyProof(a, b, c, input);

        return isValid;
    }
}
