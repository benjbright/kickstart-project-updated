const { ethers } = require("hardhat")

const CampaignFactory = require("../artifacts/contracts/Campaign.sol/CampaignFactory.json")
const abi = CampaignFactory.abi
const byteCode = CampaignFactory.bytecode

async function main() {
  const accounts = await ethers.getSigners()
  const signer = accounts[0]

  const campaignFactory = await ethers.getContractFactory(abi, byteCode, signer)
  const contract = await campaignFactory.deploy()
  console.log("Deploying contract...")
  await contract.deployed()
  console.log("Contract deployed...")

  console.log(`The contract has been deployed to ${contract.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// Contract deployed on Goerli test network at address:
// 0x0693157bE694f1Acb330022B7707Ce5eedc1F4Ee
// Contract verified on Etherscan
