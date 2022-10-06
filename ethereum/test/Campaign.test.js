const { assert } = require("chai")
const { web3 } = require("hardhat")

// const Campaign = require("../artifacts/contracts/Campaign.sol/Campaign.json")
// const Factory = require("../artifacts/contracts/Campaign.sol/CampaignFactory.json")
const Campaign = artifacts.require("Campaign")
const Factory = artifacts.require("CampaignFactory")

let accounts
let factory
let campaignAddress
let campaign

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  //   factory = await new web3.eth.Contract(Factory.abi)
  //     .deploy({ data: Factory.bytecode })
  //     .send({ from: accounts[0], gas: "1000000" })
  factory = await Factory.new()

  //   await factory.methods.createCampaign("100").send({
  //     from: accounts[0],
  //     gas: "1000000",
  //   })
  await factory.createCampaign("100")

  //   const addresses = await factory.methods.getDeployedCampaigns().call()
  //   campaignAddress = addresses[0]
  const addresses = await factory.getDeployedCampaigns()
  campaignAddress = addresses[0]

  //   campaign = await new web3.eth.Contract(Campaign.abi, campaignAddress)
  campaign = await new web3.eth.Contract(Campaign.abi, campaignAddress)
})

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    console.log(factory.address)
    assert.ok(factory.address)
    console.log(campaign._address)
    assert.ok(campaign._address)
    // console.log(factory)
  })

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(accounts[0], manager)
    console.log(await campaign.methods.manager().call())
  })
})
