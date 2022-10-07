import web3 from "./web3"
import CampaignFactory from "./artifacts/contracts/Campaign.sol/CampaignFactory.json"

const abi = CampaignFactory.abi

const instance = new web3.eth.Contract(
  abi,
  "0x0693157be694f1acb330022b7707ce5eedc1f4ee"
)

export default instance
