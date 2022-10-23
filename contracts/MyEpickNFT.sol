// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./libraries/Base64.sol";
// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract MyEpicNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct characterAttribute {
        uint256 characterIndex;
        string name;
        string imageUri;
        uint256 hp;
        uint256 maxhp;
        uint256 attackDamage;
    }

    mapping(uint256 => characterAttribute) public nftholderAttribute;

    mapping(address => uint256) public nftholder;

    characterAttribute[] defaultCharacter;

    constructor(
        string[] memory characterName,
        string[] memory characterImageUri,
        uint256[] memory characterHp,
        uint256[] memory characterAttackDmg
    ) ERC721("Heros", "Hero") {
        for (uint256 i = 0; i < characterName.length; i++) {
            defaultCharacter.push(
                characterAttribute({
                    characterIndex: i,
                    name: characterName[i],
                    imageUri: characterImageUri[i],
                    hp: characterHp[i],
                    maxhp: characterHp[i],
                    attackDamage: characterAttackDmg[i]
                })
            );

            characterAttribute memory c = defaultCharacter[i];

            console.log(
                "Done initializing %s w/ HP %s, img %s",
                c.name,
                c.hp,
                c.imageUri
            );
        }
        _tokenIds.increment();
    }

    function mintCharacterNFT(uint256 _characterIndex) external {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        nftholderAttribute[newItemId] = characterAttribute({
            characterIndex: _characterIndex,
            name: defaultCharacter[_characterIndex].name,
            imageUri: defaultCharacter[_characterIndex].imageUri,
            hp: defaultCharacter[_characterIndex].hp,
            maxhp: defaultCharacter[_characterIndex].maxhp,
            attackDamage: defaultCharacter[_characterIndex].attackDamage
        });

        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            newItemId,
            _characterIndex
        );

        nftholder[msg.sender] = newItemId;

        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        characterAttribute memory CharacterAttribute = nftholderAttribute[
            _tokenId
        ];

        string memory strhp = Strings.toString(CharacterAttribute.hp);
        string memory strmaxhp = Strings.toString(CharacterAttribute.maxhp);
        string memory strAttackDamage = Strings.toString(
            CharacterAttribute.attackDamage
        );

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name":"',
                CharacterAttribute.name,
                "--NFT #: ",
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
                CharacterAttribute.imageUri,
                '", "attributes": [ { "trait_type": "Health Points", "value": ',
                strhp,
                ', "max_value":',
                strmaxhp,
                '}, { "trait_type": "Attack Damage", "value": ',
                strAttackDamage,
                "} ]}"
            )
        );
        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return output;
    }
}
