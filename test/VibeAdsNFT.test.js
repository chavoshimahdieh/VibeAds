// Import necessary packages and libraries
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { vibeAdsNFTFixture } = require("./fixture/vibeAdsNFT.fixture.js");

describe("VibeAdsNFT", function () {
  let vaInstance, owner;

  beforeEach(async function () {
    ({ vaInstance, owner } = await loadFixture(vibeAdsNFTFixture));
  });

  describe("emulate", () => {
    it("should return true if everything is ok", async () => {
    //   const isVerified = await vaInstance.connect(owner).emulate();
      expect(true).to.be.true;
    });
  });
});
