pragma circom 2.0.0;

include "../../../node_modules/circomlib/circuits/poseidon.circom";
include "../../../node_modules/circomlib/circuits/mux1.circom";

template CheckRoot(n) { // compute the root of a MerkleTree of n Levels 
    signal input leaves[2**n];
    signal output root;

    //[assignment] insert your code here to calculate the Merkle root from 2^n leaves
    // リーフハッシュ以外のマークルパスの数
    var hashersLength = 2**n - 1;
    // poseidonのコンポーネントの配列を用意
    component poseidons[hashersLength];

    if (n == 0) {
        // リーフハッシュが1つの場合はそのノードをルートとする
        root <== leaves[0];
    } else {
        // poseidons配列の何番目まで格納したか記録
        var count = 0;
        // 深さnの部分を計算
        for (var i = 0; i < 2**n; i += 2) {
            poseidons[count] = Poseidon(2);
            poseidons[count].inputs[0] <== leaves[i];
            poseidons[count].inputs[1] <== leaves[i+1];
            count += 1;
        }
        
        // 計算に使用したposeidons配列のidxを記録
        var calculatedIndex = 0;
        // 深さn-1から深さ1になるまで計算
        for (var i = n - 1; i > 0; i--) {
            for (var j = 0; j < 2**i; j += 2) {
                poseidons[count] = Poseidon(2);
                var tmpCountIdx = calculatedIndex+j;
                poseidons[count].inputs[0] <== poseidons[tmpCountIdx].out;
                poseidons[count].inputs[1] <== poseidons[tmpCountIdx+1].out;
                calculatedIndex += 2;
                count += 1;
            }
        }
    }

    root === poseidons[hashersLength - 1];
}

template MerkleTreeInclusionProof(n) {
    signal input leaf;
    signal input path_elements[n];
    signal input path_index[n]; // path index are 0's and 1's indicating whether the current element is on the left or right
    signal output root; // note that this is an OUTPUT signal

    //[assignment] insert your code here to compute the root from a leaf and elements along the path
    component poseidons[n];
    component mux[n];

    signal hashes[n + 1];
    hashes[0] <== leaf;

    for (var i = 0; i < n; i++) {
        path_index[i] * (1 - path_index[i]) === 0;
        
        poseidons[i] = Poseidon(2);
        mux[i] = MultiMux1(2);

        mux[i].c[0][0] <== hashes[i];
        mux[i].c[0][1] <== path_elements[i];

        mux[i].c[1][0] <== path_elements[i];
        mux[i].c[1][1] <== hashes[i];

        mux[i].s <== path_index[i];
        
        poseidons[i].inputs[0] <== mux[i].out[0];
        poseidons[i].inputs[1] <== mux[i].out[1];

        hashes[i + 1] <== poseidons[i].out;
    }

    root <== hashes[n];
}