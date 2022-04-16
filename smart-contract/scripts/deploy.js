const { ethers } = require("hardhat");

const main = async() =>{

  const btcFactory = await ethers.getContractFactory("Btc");
  const btcContract = await btcFactory.deploy();
  await btcContract.deployed();
  console.log("BTC deployed to: ", btcContract.address);

  const ethFactory = await ethers.getContractFactory("Btc");
  const ethContract = await ethFactory.deploy();
  await ethContract.deployed();
  console.log("ETH deployed to: ", ethContract.address);

  const dogeFactory = await ethers.getContractFactory("DogeCoin");
  const dogeContract = await dogeFactory.deploy();
  await dogeContract.deployed();
  console.log("DOGE deployed to: ", dogeContract.address);

  const linkFactory = await ethers.getContractFactory("Link");
  const linkContract = await linkFactory.deploy();
  await linkContract.deployed();
  console.log('Link deployed to:', linkContract.address)

  const solanaFactory = await ethers.getContractFactory('Solana')
  const solanaContract = await solanaFactory.deploy();
  await solanaContract.deployed();
  console.log("SOL deployed to: ", solanaContract.address);

  const daiFactory = await ethers.getContractFactory("Dai");
  const daiContract = await daiFactory.deploy();
  await daiContract.deployed();
  console.log("Dai deployed to:", daiContract.address);

  const usdcFactory = await ethers.getContractFactory('Usdc')
  const usdcContract = await usdcFactory.deploy();
  await usdcContract.deployed()
  console.log("USDC deployed to: ", usdcContract.address);
}

(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
