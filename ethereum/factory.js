import web3 from "./web3"
import CampaignFactory from "./artifacts/contracts/Campaign.sol/CampaignFactory.json"

const abi = CampaignFactory.abi

const instance = new web3.eth.Contract(
  abi,
  "0x5C93b0D761c2643C9640e9DE4692760c1506a7C5"
)

export default instance
