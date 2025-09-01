const hre = require("hardhat");
const { ethers } = require("hardhat");
const deploy_vibe_ads_nft = require("./deploy.js"); 

async function main() {
  // deploy contracts
  await deploy_vibe_ads_nft();
 
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
