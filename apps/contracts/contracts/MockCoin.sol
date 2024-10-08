//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockCoin is ERC20 {
    address public admin;

    constructor(address _admin) ERC20("MockCoin", "MCK") {
        admin = _admin;
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function _spendAllowance(address owner, address spender, uint256 value) internal override {
        if (spender != admin) {
            uint256 currentAllowance = allowance(owner, spender);
            if (currentAllowance != type(uint256).max) {
                if (currentAllowance < value) {
                    revert ERC20InsufficientAllowance(spender, currentAllowance, value);
                }
                unchecked {
                    _approve(owner, spender, currentAllowance - value, false);
                }
            }
        }
    }
}
