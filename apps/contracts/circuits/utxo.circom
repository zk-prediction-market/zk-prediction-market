pragma circom 2.0.0;

include "../../../node_modules/circomlib/circuits/poseidon.circom";
include "../../../node_modules/circomlib/circuits/comparators.circom";

template Utxo() {
    signal input secret;
    signal input nonce;
    signal input userCurrentBalances[3];
    signal input userNewBalances[3];
    signal input poolCurrentBalances[3];
    signal output poolNewBalances[3];
    signal output currentUtxoHash;
    signal output newUtxoHash;

    component poseidonCurrent = Poseidon(5);
    poseidonCurrent.inputs[0] <== secret;
    poseidonCurrent.inputs[1] <== nonce;
    poseidonCurrent.inputs[2] <== userCurrentBalances[0];
    poseidonCurrent.inputs[3] <== userCurrentBalances[1];
    poseidonCurrent.inputs[4] <== userCurrentBalances[2];

    component poseidonNew = Poseidon(5);
    poseidonNew.inputs[0] <== secret;
    poseidonNew.inputs[1] <== nonce;
    poseidonNew.inputs[2] <== userNewBalances[0];
    poseidonNew.inputs[3] <== userNewBalances[1];
    poseidonNew.inputs[4] <== userNewBalances[2];

    component isZero[3];
    isZero[0] = IsZero();
    isZero[1] = IsZero();
    isZero[2] = IsZero();
    isZero[0].in <== userCurrentBalances[0];
    isZero[1].in <== userCurrentBalances[1];
    isZero[2].in <== userCurrentBalances[2];

    signal t1;
    signal t2;
    t1 <== isZero[0].out * isZero[1].out;
    t2 <== t1 * isZero[2].out;

    currentUtxoHash <== t2 *poseidonCurrent.out;

    newUtxoHash <== poseidonNew.out;
}