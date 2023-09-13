import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe("Village", () => {
  describe("movePopulation", () => {
    it("moves population to target village", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const [A, B] = [1, 2];
      const transferAmount = ethers.parseEther("100");

      const villageContract = await ethers.deployContract("Village");
      await villageContract.initialize(PLAYER, A, transferAmount);

      await villageContract
        .connect(PLAYER)
        .movePopulation(A, B, transferAmount);

      expect(await villageContract.balanceOf(PLAYER, A)).to.eq(0);
      expect(await villageContract.balanceOf(PLAYER, B)).to.eq(transferAmount);
    });
    it("fails if player lacks population in source", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const [A, B] = [1, 2];
      const transferAmount = ethers.parseEther("100");

      const villageContract = await ethers.deployContract("Village");

      expect(
        villageContract.connect(PLAYER).movePopulation(A, B, transferAmount)
      ).to.be.rejected;
    });
  });
  describe("nextTurn", () => {
    it("grow for homogenous village increases population linearly", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const [A] = [1];
      const initialAmount = ethers.parseEther("100");

      const villageContract = await ethers.deployContract("Village");
      await villageContract.initialize(PLAYER, A, initialAmount);

      await villageContract.nextTurn();

      expect(await villageContract.balanceOf(PLAYER, A)).to.be.gt(
        initialAmount
      );
    });
  });
});
