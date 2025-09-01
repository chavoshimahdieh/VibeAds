// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VibeAdsNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Struct to store ad metadata reference
    struct AdMetadata {
        string storageLocation; // 0G storage location
        string contentHash;     // For verification
        uint256 createdAt;
        bool isActive;
    }
    
    mapping(uint256 => AdMetadata) public adMetadata;
    
    event AdMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string storageLocation,
        uint256 timestamp
    );
    
    event AdMetadataUpdated(
        uint256 indexed tokenId,
        string newStorageLocation,
        string newContentHash
    );
    
    constructor() ERC721("VibeAd", "VIBEAD") {}
    
    function mintVibeAd(
        address to,
        string memory tokenURI,
        string memory storageLocation,
        string memory contentHash
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        adMetadata[tokenId] = AdMetadata({
            storageLocation: storageLocation,
            contentHash: contentHash,
            createdAt: block.timestamp,
            isActive: true
        });
        
        emit AdMinted(tokenId, to, storageLocation, block.timestamp);
        return tokenId;
    }
    
    function updateAdMetadata(
        uint256 tokenId,
        string memory newStorageLocation,
        string memory newContentHash,
        string memory newTokenURI
    ) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        
        adMetadata[tokenId].storageLocation = newStorageLocation;
        adMetadata[tokenId].contentHash = newContentHash;
        
        _setTokenURI(tokenId, newTokenURI);
        
        emit AdMetadataUpdated(tokenId, newStorageLocation, newContentHash);
    }
    
    function toggleAdActive(uint256 tokenId, bool isActive) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        adMetadata[tokenId].isActive = isActive;
    }
    
    function getAdMetadata(uint256 tokenId) public view returns (AdMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        return adMetadata[tokenId];
    }
    
    // Override required by Solidity
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}