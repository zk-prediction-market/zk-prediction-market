pragma circom 2.0.0;

include "./utxo.circom";

component main {public [diff, poolCurrentBalances]} = Utxo();