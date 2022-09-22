const { ethers, run, network } = require("hardhat");

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("deploying ...");

  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract address: ${simpleStorage.address}`);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    // on Goerli and has Etherscan api key
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue}`);

  // update current value
  const txResponse = await simpleStorage.store(7);
  await txResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`);
};

const verify = async (contractAddress, args) => {
  console.log("Verifying...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(error);
  }
};

main();
