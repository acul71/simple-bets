// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
// Contract address: 0xae1a2772C7b9298dd343805804713b75c9066f93

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "./Base.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */
 
contract RandomNumberConsumer is VRFConsumerBase, Base {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    
    uint256 public randomResult;
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     * --------------------------------------------------------------------
     * Network: Mumbai Testnet
        The VRF Coordinator for Mumbai Testnet is 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
        The address of the LINK token on the Mumbai Testnet is 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
        The KeyHash for Mumbai Testnet is 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
        The fee for making a VRF request on the Mumbai Testnet is 100000000000000 (0.0001 LINK)
     */
    constructor() 
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        )
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4; // KeyHash Polygon Mumbai Testnet
        fee = 100000000000000; // 0.0001 LINK (Varies by network)
    }
    
    /** 
     * Requests randomness 
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    //function fulfillRandomness(bytes32 requestId) internal override {
        randomResult = randomness;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
