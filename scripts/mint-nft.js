async function mintVibeAd() {
    const contract = await ethers.getContractAt("VibeAdNFT", CONTRACT_ADDRESS);
    
    const tx = await contract.mintVibeAd(
      OWNER_ADDRESS,
      `ipfs://${METADATA_CID}`, // Traditional IPFS fallback
      `0g://${METADATA_CID}/metadata.json`, // 0G storage location
      CONTENT_HASH // Compute hash of metadata
    );
    
    await tx.wait();
    console.log('NFT minted!');
  }