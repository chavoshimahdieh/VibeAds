import { ZeroGStorage } from '@0g/0g-js';

async function uploadAdContent() {
  const storage = new ZeroGStorage();
  
  // Upload ad image
  const imageBuffer = fs.readFileSync('path/to/ad-image.png');
  const imageCid = await storage.upload(imageBuffer);
  
  // Create and upload metadata
  const metadata = {
    name: "VibeAd #1",
    image: `0g://${imageCid}/image.png`,
    // ... rest of metadata
  };
  
  const metadataBuffer = Buffer.from(JSON.stringify(metadata));
  const metadataCid = await storage.upload(metadataBuffer);
  
  console.log('Image CID:', imageCid);
  console.log('Metadata CID:', metadataCid);
  console.log('Metadata location:', `0g://${metadataCid}/metadata.json`);
}