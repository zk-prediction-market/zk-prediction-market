const { groth16 } = require("snarkjs")

export const generateGroth16Proof = async (Input: any) => {
    // const Input = {
    //     "userAmounts": ["11", "12", "13"]
    // }

    const circuitWasmPath = "/circuits/circuit_js/circuit.wasm"
    const circuitFinalZkeyPath = "/circuits/circuit_final.zkey"

    const { proof, publicSignals } = await groth16.fullProve(Input, circuitWasmPath, circuitFinalZkeyPath)
    console.log("Proof generated successfully:", proof)
    console.log("Public signals:", publicSignals)

    return { proof, publicSignals }
}
