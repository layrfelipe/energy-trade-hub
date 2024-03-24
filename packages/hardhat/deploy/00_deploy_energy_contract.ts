import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import { SimpleCentralizedArbitrator } from "../contracts/SimpleCentralizedArbitrator.sol";

const deployEnergyContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const arbitrator = await deploy("SimpleCentralizedArbitrator", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("EnergyTradeHub", {
    from: deployer,
    // Contract constructor arguments
    args: [arbitrator.address, arbitrator.address],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  // const EnergyTradeHubContract = await hre.ethers.getContract<Contract>("EnergyTradeHub", deployer);
  // console.log("👋 Initial greeting:", await EnergyTradeHubContract.greeting());
};

export default deployEnergyContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployEnergyContract.tags = ["EnergyTradeHub"];
