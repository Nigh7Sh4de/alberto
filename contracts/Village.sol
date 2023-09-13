// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Village is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    struct PopModeInfo {
        int16 growth; // 10000 growth = 100%
        uint8 stake;
    }
    enum PopMode {
        GROW,
        ROT,
        STEAL
    }
    PopMode constant popModeDefault = PopMode.GROW;
    mapping(PopMode => PopModeInfo) popModes;

    function initializePopModes() private {
        popModes[PopMode.GROW] = PopModeInfo(100, 100);
        popModes[PopMode.ROT] = PopModeInfo(-100, 100);
        popModes[PopMode.STEAL] = PopModeInfo(50, 120);
    }

    constructor() ERC1155("") {
        initializePopModes();
    }

    struct PlayerInfo {
        bool exists;
        PopMode setting;
        address publicKey;
        uint256 villageId;
    }

    mapping(bytes => PlayerInfo) playerInfo;
    bytes[] private players;

    function newPlayer(
        address player,
        uint256 id
    ) private pure returns (PlayerInfo memory) {
        return PlayerInfo(true, popModeDefault, player, id);
    }

    function pid(
        address player,
        uint256 id
    ) public pure returns (bytes memory) {
        return abi.encodePacked(player, id);
    }

    function getsertPlayer(
        address player,
        uint256 id
    ) private returns (PlayerInfo memory) {
        bytes memory p = pid(player, id);
        if (!playerInfo[p].exists) {
            playerInfo[p] = newPlayer(player, id);
            players.push(p);
        }
        return playerInfo[p];
    }

    function initialize(
        address player,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        mint(player, id, amount);
    }

    function mint(address player, uint256 id, uint256 amount) private {
        getsertPlayer(player, id);

        bytes memory data;
        _mint(player, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) private {
        for (uint8 i = 0; i < ids.length; i++) {
            getsertPlayer(to, ids[i]);
        }
        bytes memory data;
        _mintBatch(to, ids, amounts, data);
    }

    function movePopulation(uint256 from, uint256 to, uint256 amount) public {
        require(balanceOf(msg.sender, from) >= amount);
        burn(msg.sender, from, amount);
        mint(msg.sender, to, amount);
    }

    struct GrowthMap {
        mapping(uint256 => uint256) data;
    }

    function nextTurn() public {
        GrowthMap storage growth;

        // Grow
        for (uint i = 0; i < players.length; i++) {
            PlayerInfo memory p = playerInfo[players[i]];
            growth.data[p.villageId] = uint256(
                int(growth.data[p.villageId]) +
                    int(balanceOf(p.publicKey, p.villageId)) *
                    popModes[p.setting].growth
            );
        }

        // Distribute
        for (uint i = 0; i < players.length; i++) {}
    }

    // ------------------------------------------------------------------------
    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
