import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { EnergyTradeHub, SimpleCentralizedArbitrator } from "../typechain-types";

describe("EnergyTradeHub Contract", function () {
  let energyTradeHub: EnergyTradeHub;
  let arbitrator: SimpleCentralizedArbitrator;
  let admin: Signer, provider: Signer, consumer: Signer;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const energyTradeHubFactory = await ethers.getContractFactory("EnergyTradeHub");
    const arbitratorFactory = await ethers.getContractFactory("SimpleCentralizedArbitrator");

    const signers = await ethers.getSigners();

    [admin, provider, consumer] = signers;

    arbitrator = (await arbitratorFactory.deploy()) as SimpleCentralizedArbitrator;

    // Deploy a new EnergyTradeHub contract for each test
    // energyTradeHub = await energyTradeHubFactory.deploy();
    energyTradeHub = (await energyTradeHubFactory.deploy(
      arbitrator.getAddress(),
      arbitrator.getAddress(),
      "evidence"
    )) as EnergyTradeHub;
    await energyTradeHub.waitForDeployment();

    // throw new Error(await energyTradeHub.PROVIDER_ROLE());
    await energyTradeHub.grantRole(await energyTradeHub.ADMIN_ROLE(), await admin.getAddress());
    await energyTradeHub.connect(admin).grantRole(await energyTradeHub.PROVIDER_ROLE(), await provider.getAddress());
    // await energyTradeHub.connect(admin).grantRole(await energyTradeHub.CONSUMER_ROLE(), await consumer.getAddress());

    // Set up roles
    // await energyTradeHub.addProvider(await provider.getAddress());
    // await energyTradeHub.connect(consumer).registerAsConsumer();
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      const ADMIN_ROLE = await energyTradeHub.ADMIN_ROLE();
      expect(await energyTradeHub.hasRole(ADMIN_ROLE, admin)).to.be.true;
    });
  });

  describe("Roles and Permissions", function () {
    it("Should allow admin to add a provider", async function () {
      const addProviderTx = await energyTradeHub.addProvider(await provider.getAddress());
      await addProviderTx.wait();
      expect(await energyTradeHub.hasRole(await energyTradeHub.PROVIDER_ROLE(), await provider.getAddress())).to.equal(
        true,
      );
    });

    it("Should allow admin to register consumers", async function () {
      const addConsumerTx = await energyTradeHub.addConsumer(await consumer.getAddress());
      await addConsumerTx.wait();

      expect(await energyTradeHub.hasRole(await energyTradeHub.CONSUMER_ROLE(), await consumer.getAddress())).to.equal(
        true,
      );
    });
  });

  describe("Token Management", function () {
    // let tokenID: number;

    // beforeEach(async function () {
      // Create a token as provider
    //   const createTokenTx = await energyTradeHub.connect(provider).createToken(
    //     await provider.getAddress(),
    //     100, // energyAmountMWh
    //     10, // pricePerMWh
    //     Math.floor(Date.now() / 1000), // startDate
    //     Math.floor(Date.now() / 1000) + 1000, // endDate
    //     "Solar", // sourceType
    //     "PointA", // deliveryPoint
    //     "hash_here", // contractTermsHash
    //     "tokenURI",
    //   );
    //  await createTokenTx.wait();
    
     //   const event = receipt.logs
    //   .find((log) => log.event === "TokenCreated")
    //   .args.id.toNumber();

    //   tokenID = event?.args?.id.toNumber();
    // });

    it("Should create a token correctly", async function () {
      // Listening for the TokenCreated event
      await expect(
        energyTradeHub.createToken(
          await admin.getAddress(),
          100, // energyAmountMWh
          50, // pricePerMWh
          Math.floor(Date.now() / 1000), // startDate
          Math.floor(Date.now() / 1000) + 86400, // endDate, +1 day
          "Wind", // sourceType
          "DP1", // deliveryPoint
          "hash", // contractTermsHash
          "tokenURI", // tokenURI
        ),
      ).to.emit(energyTradeHub, "TokenCreated");
    });

    it("Should allow token listing for sale", async function () {
      await energyTradeHub.createToken(
        await admin.getAddress(),
        100, // energyAmountMWh
        50, // pricePerMWh
        Math.floor(Date.now() / 1000), // startDate
        Math.floor(Date.now() / 1000) + 86400, // endDate, +1 day
        "Wind", // sourceType
        "DP1", // deliveryPoint
        "hash", // contractTermsHash
        "tokenURI", // tokenURI
      );
      const tokenID = 1;
      const listForSaleTx = await energyTradeHub.listTokenForSale(tokenID, ethers.parseEther("1"));
      await listForSaleTx.wait();
      const sale = await energyTradeHub.tokenSales(tokenID);
      expect(sale.isForSale).to.equal(true);
    });
  });
});
