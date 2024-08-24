// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

pragma solidity >=0.7.0 <0.9.0;

contract Groth16Verifier {
    // Scalar field size
    uint256 constant r = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    // Base field size
    uint256 constant q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    // Verification Key data
    uint256 constant alphax = 20491192805390485299153009773594534940189261866228447918068658471970481763042;
    uint256 constant alphay = 9383485363053290200918347156157836566562967994039712273449902621266178545958;
    uint256 constant betax1 = 4252822878758300859123897981450591353533073413197771768651442665752259397132;
    uint256 constant betax2 = 6375614351688725206403948262868962793625744043794305715222011528459656738731;
    uint256 constant betay1 = 21847035105528745403288232691147584728191162732299865338377159692350059136679;
    uint256 constant betay2 = 10505242626370262277552901082094356697409835680220590971873171140371331206856;
    uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
    uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
    uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
    uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
    uint256 constant deltax1 = 12071472506076160018438858512330475346490893796208393090478009515493806557084;
    uint256 constant deltax2 = 5134832121666429037100245775946315247203502875267769405454390094407182915045;
    uint256 constant deltay1 = 18878192407417719107439500348188290945364135684901161713010843917301475334678;
    uint256 constant deltay2 = 10776746780430384398677620192928766788291824459733435013380996101711429154967;

    uint256 constant IC0x = 3350018345719380180018575500998616586503123595930289789935273594958752007835;
    uint256 constant IC0y = 7692942428401711826780484073088667545737388387705954353361391705880064813410;

    uint256 constant IC1x = 17673031097020900718281250058228957372960655855492289697136454907167536497636;
    uint256 constant IC1y = 11558117780894048921523454837913997201589655410730433119354676626778203114538;

    uint256 constant IC2x = 14646922019437854551464570431928538063804453534064719647547763478756333688773;
    uint256 constant IC2y = 12680279121841568490161362061827456089622560318900808471530255494493638166863;

    uint256 constant IC3x = 4766406434446523879672003570943830627549128100469396648965195583179990594472;
    uint256 constant IC3y = 10599938811495633618151221074522300062593628214549913046119185001360066138324;

    uint256 constant IC4x = 4939869135625457428750919967704322877521147055899366998014086580114126910243;
    uint256 constant IC4y = 17441312478936732495422353042036510264208625575087958473334183698420262147763;

    uint256 constant IC5x = 10675255422731112909565823703746685779158556306444345807153875433146571591465;
    uint256 constant IC5y = 7329723723772032605022027442078982273628628585495704913137143608281164049791;

    uint256 constant IC6x = 6296117864996058253440019503035973582951441653681848334587715810037734896662;
    uint256 constant IC6y = 14774321518941574432017135804432645660889839399507897618560079509171745777091;

    uint256 constant IC7x = 6974541516954372158090057227250596530716337481418922089393914896130826807953;
    uint256 constant IC7y = 5839888311335292276965123674147915305741326157468634277315943203622222724622;

    uint256 constant IC8x = 2498121922737641820488306266592335230137692124341016011105962660361919512565;
    uint256 constant IC8y = 93797023380075901731460302392895381181497143846088615023529353456536998590;

    // Memory data
    uint16 constant pVk = 0;
    uint16 constant pPairing = 128;

    uint16 constant pLastMem = 896;

    function verifyProof(
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[8] calldata _pubSignals
    ) public view returns (bool isValid) {
        assembly {
            function checkField(v) {
                if iszero(lt(v, q)) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }

            // G1 function to multiply a G1 value(x,y) to value in an address
            function g1_mulAccC(pR, x, y, s) {
                let success
                let mIn := mload(0x40)
                mstore(mIn, x)
                mstore(add(mIn, 32), y)
                mstore(add(mIn, 64), s)

                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }

                mstore(add(mIn, 64), mload(pR))
                mstore(add(mIn, 96), mload(add(pR, 32)))

                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }

            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {
                let _pPairing := add(pMem, pPairing)
                let _pVk := add(pMem, pVk)

                mstore(_pVk, IC0x)
                mstore(add(_pVk, 32), IC0y)

                // Compute the linear combination vk_x

                g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))

                g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))

                g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))

                g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))

                g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))

                g1_mulAccC(_pVk, IC6x, IC6y, calldataload(add(pubSignals, 160)))

                g1_mulAccC(_pVk, IC7x, IC7y, calldataload(add(pubSignals, 192)))

                g1_mulAccC(_pVk, IC8x, IC8y, calldataload(add(pubSignals, 224)))

                // -A
                mstore(_pPairing, calldataload(pA))
                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))

                // B
                mstore(add(_pPairing, 64), calldataload(pB))
                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

                // alpha1
                mstore(add(_pPairing, 192), alphax)
                mstore(add(_pPairing, 224), alphay)

                // beta2
                mstore(add(_pPairing, 256), betax1)
                mstore(add(_pPairing, 288), betax2)
                mstore(add(_pPairing, 320), betay1)
                mstore(add(_pPairing, 352), betay2)

                // vk_x
                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))

                // gamma2
                mstore(add(_pPairing, 448), gammax1)
                mstore(add(_pPairing, 480), gammax2)
                mstore(add(_pPairing, 512), gammay1)
                mstore(add(_pPairing, 544), gammay2)

                // C
                mstore(add(_pPairing, 576), calldataload(pC))
                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

                // delta2
                mstore(add(_pPairing, 640), deltax1)
                mstore(add(_pPairing, 672), deltax2)
                mstore(add(_pPairing, 704), deltay1)
                mstore(add(_pPairing, 736), deltay2)

                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

                isOk := and(success, mload(_pPairing))
            }

            let pMem := mload(0x40)
            mstore(0x40, add(pMem, pLastMem))

            // Validate that all evaluations ∈ F

            checkField(calldataload(add(_pubSignals, 0)))

            checkField(calldataload(add(_pubSignals, 32)))

            checkField(calldataload(add(_pubSignals, 64)))

            checkField(calldataload(add(_pubSignals, 96)))

            checkField(calldataload(add(_pubSignals, 128)))

            checkField(calldataload(add(_pubSignals, 160)))

            checkField(calldataload(add(_pubSignals, 192)))

            checkField(calldataload(add(_pubSignals, 224)))

            checkField(calldataload(add(_pubSignals, 256)))

            // Validate all evaluations
            isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

            // mstore(0, isValid)
            //  return(0, 0x20)
        }
    }
}
