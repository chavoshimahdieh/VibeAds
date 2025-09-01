const hre = require("hardhat");
const { ethers } = require("hardhat");

async function deploy_vibe_ads_nft(deployer) {

  // Deploy VibeAds
  const vibeAdsNFT = await ethers.getContractFactory("VibeAdsNFT");
  const vaInstance = await vibeAdsNFT.deploy();
  await vaInstance.deployed();

  return vaInstance;
}

module.exports = deploy_vibe_ads_nft;
