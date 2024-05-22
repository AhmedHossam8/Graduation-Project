// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HederaResponseCodes.sol";
import "./IHederaTokenService.sol";
import "./HederaTokenService.sol";
import "./ExpiryHelper.sol";
import "./KeyHelper.sol";

contract ActivityNFTCreator is ExpiryHelper, KeyHelper, HederaTokenService {

    function createActivityNFT(
        string memory name, 
        string memory symbol, 
        string memory memo, 
        int64 maxSupply,  
        int64 autoRenewPeriod
    ) external payable returns (address) {
        IHederaTokenService.TokenKey[] memory keys = new IHederaTokenService.TokenKey[](1);
        // Set this contract as supply for the token
        keys[0] = getSingleKey(KeyType.SUPPLY, KeyValueType.CONTRACT_ID, address(this));

        IHederaTokenService.HederaToken memory token;
        token.name = name;
        token.symbol = symbol;
        token.memo = memo;
        token.treasury = address(this);
        token.tokenSupplyType = true; // set supply to FINITE
        token.maxSupply = maxSupply;
        token.tokenKeys = keys;
        token.freezeDefault = false;
        token.expiry = createAutoRenewExpiry(address(this), autoRenewPeriod); // Contract auto-renews the token

        (int responseCode, address createdToken) = HederaTokenService.createNonFungibleToken(token);

        require(responseCode == HederaResponseCodes.SUCCESS, "Failed to create non-fungible token");
        return createdToken;
    }

    function mintActivityNFT(
        address token,
        bytes[] memory metadata
    ) external returns(int64) {
        (int response, , int64[] memory serial) = HederaTokenService.mintToken(token, 0, metadata);

        require(response == HederaResponseCodes.SUCCESS, "Failed to mint non-fungible token");
        return serial[0];
    }

    function transferActivityNFT(
        address token,
        address receiver, 
        int64 serial
    ) external returns(int) {
        int response = HederaTokenService.transferNFT(token, address(this), receiver, serial);

        require(response == HederaResponseCodes.SUCCESS, "Failed to transfer non-fungible token");
        return response;
    }
}
