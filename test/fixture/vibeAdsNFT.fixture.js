const { ethers } = require("hardhat");
const deploy_vibe_ads_nft = require("./deploy_scripts/deploy_vibe_ads_nft");

let VA_fixtureData; // Promise to store the fixture instance

async function vibeAdsNFTFixture() {
  if (!VA_fixtureData) {
    const [owner] = await ethers.getSigners();


    const vaInstance = await deploy_vibe_ads_nft(owner.add);

    VA_fixtureData = {
      vaInstance,
      owner,
    };
  }

  return VA_fixtureData;

}

module.exports = { 
  vibeAdsNFTFixture
 };
