const hre = require("hardhat");
const { ethers } = require("hardhat");

async function deploy_vibe_ads_nft() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying the VibeAdsNFT contract...");

  // Deploy VibeAds
  const vibeAdsNFT = await ethers.getContractFactory("VibeAdsNFT");
  const vaInstance = await vibeAdsNFT.deploy();
  await vaInstance.deployed();

  console.log("VibeAdsNFT Contract deployed to:", vaInstance.address);
  console.log("---------------------------------------------------------");
  return vaInstance.address;
}

module.exports = deploy_vibe_ads_nft;
