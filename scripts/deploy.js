const { ethers } = require("hardhat");

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

  console.log('deploying ...')

  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed()
  console.log(`Deployed contract address: ${simpleStorage.address}`)
};

const verify = async (contractAddress, params) => {
  console.log('Verifying...')
  
}

main();
