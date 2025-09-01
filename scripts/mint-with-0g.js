const { ethers } = require('ethers');
const { uploadAdCampaign } = require('./upload-ad');

async function mintVibeAdNFT() {
  try {
    // 1. Upload ad content to 0G
    const uploadResult = await uploadAdCampaign();
    
    // 2. Connect to blockchain
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    // 3. Load contract
    const contractABI = require('../artifacts/contracts/VibeAdNFT.sol/VibeAdNFT.json').abi;
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      contractABI,
      wallet
    );
    
    // 4. Mint NFT with 0G storage reference
    console.log('Minting NFT with 0G storage...');
    const tx = await contract.mintVibeAd(
      process.env.OWNER_ADDRESS,
      `ipfs://${uploadResult.metadataCid}`, // IPFS fallback
      uploadResult.metadataLocation,        // 0G primary storage
      uploadResult.contentHash              // Content verification
    );
    
    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);
    
    // 5. Get token ID from event
    const event = receipt.events.find(e => e.event === 'AdMinted');
    const tokenId = event.args.tokenId.toString();
    
    console.log('\n=== NFT MINTED SUCCESSFULLY ===');
    console.log('Token ID:', tokenId);
    console.log('0G Metadata:', uploadResult.metadataLocation);
    console.log('Content Hash:', uploadResult.contentHash);
    
    return {
      tokenId,
      ...uploadResult
    };
    
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}

// Execute if run directly
if (require.main === module) {
  require('dotenv').config();
  mintVibeAdNFT().catch(console.error);
}

module.exports = { mintVibeAdNFT };