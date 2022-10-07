const { assert } = require("chai")
const { web3 } = require("hardhat")

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
  campaign = new web3.eth.Contract(Campaign.abi, campaignAddress)
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

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    })
    const approvers = await campaign.methods.approversCount().call()
    assert.equal(approvers, 1)

    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      })
      assert(false)
    } catch (error) {
      assert(error)
    }
  })

  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Buy Batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      })

    const request = await campaign.methods.requests(0).call()

    assert.equal("Buy Batteries", request.description)
  })

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    })

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      })

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    })

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    })

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, "ether")
    balance = parseFloat(balance)
    console.log(balance)

    assert(balance > 104)
  })
})
