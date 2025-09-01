import { ZeroGStorage } from '@0g/0g-js';
import fs from 'fs';
import path from 'path';
import { generateVibeAdMetadata } from './generate-metadata.js';

async function uploadAdCampaign() {
  try {
    // Initialize 0G storage (use actual 0G SDK when available)
    const storage = new ZeroGStorage();
    
    // 1. Upload ad image to 0G
    console.log('Uploading ad image to 0G...');
    const imagePath = path.join(__dirname, '../assets/ad-image.png');
    const imageBuffer = fs.readFileSync(imagePath);
    const imageCid = await storage.upload(imageBuffer);
    const imageLocation = `0g://${imageCid}/ad-image.png`;
    
    console.log('Image uploaded to:', imageLocation);

    // 2. Generate metadata with 0G locations
    const adData = {
      name: "Summer Sale 2024",
      description: "Get 50% off on all summer items!",
      imageLocation: imageLocation,
      startTime: "08:00",
      endTime: "22:00",
      adType: "Seasonal Promotion",
      targetAudience: "Fashion Enthusiasts"
    };

    const metadata = generateVibeAdMetadata(adData);

    // 3. Upload metadata to 0G
    console.log('Uploading metadata to 0G...');
    const metadataBuffer = Buffer.from(JSON.stringify(metadata));
    const metadataCid = await storage.upload(metadataBuffer);
    const metadataLocation = `0g://${metadataCid}/metadata.json`;
    
    console.log('Metadata uploaded to:', metadataLocation);

    // 4. Calculate content hash for verification
    const { createHash } = require('crypto');
    const contentHash = createHash('sha256')
      .update(metadataBuffer)
      .digest('hex');

    // 5. Return data for NFT minting
    return {
      metadataLocation,
      contentHash,
      imageLocation,
      metadataCid,
      imageCid
    };

  } catch (error) {
    console.error('Error uploading to 0G:', error);
    throw error;
  }
}

// Run the upload if this script is executed directly
if (require.main === module) {
  uploadAdCampaign()
    .then(result => {
      console.log('\n=== UPLOAD COMPLETE ===');
      console.log('Metadata Location:', result.metadataLocation);
      console.log('Content Hash:', result.contentHash);
      console.log('Image Location:', result.imageLocation);
      console.log('Metadata CID:', result.metadataCid);
      console.log('Image CID:', result.imageCid);
      
      // Save to environment file for easy access
      const envContent = `
CONTRACT_ADDRESS=your_contract_address_here
METADATA_LOCATION=${result.metadataLocation}
CONTENT_HASH=${result.contentHash}
IMAGE_CID=${result.imageCid}
METADATA_CID=${result.metadataCid}
      `.trim();
      
      fs.writeFileSync('.env.upload', envContent);
      console.log('\nUpload details saved to .env.upload');
    })
    .catch(console.error);
}

module.exports = { uploadAdCampaign };