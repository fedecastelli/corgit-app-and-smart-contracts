pragma solidity ^0.8.0;

import "./cgToken.sol";

contract cgFactory {

    // struct
    struct CgToken {
        cgToken tokenContract;
        uint createdAt;
    }

    // contracts
    /// @dev list of all the CgTokens created
    CgToken[] cgTokenList;
    GithubAddressRegister githubAddressRegister;

    constructor(address _githubAddressRegister) {
        githubAddressRegister = GithubAddressRegister(_githubAddressRegister);
    }

    function generate(
        string memory _name,
        string memory _symbol,
        uint16 _percFundingDistribute
    ) external returns(address) {

        cgToken cgt = new cgToken(
            _name,
            _symbol,
            100000 * (10 ** 18),
            _percFundingDistribute,
            address(githubAddressRegister),
            msg.sender
        );

        cgTokenList.push(CgToken({
            tokenContract: cgt,
            createdAt: block.timestamp
        }));

        return address(cgt);
    }

}
