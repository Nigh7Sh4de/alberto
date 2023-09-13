// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Player is ERC721, Ownable {
    constructor() ERC721("Player", "PLYR") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://plotnik.xyz/alberto/assets/players?tokenId=";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
