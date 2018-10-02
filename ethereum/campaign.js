import web3 from './web3'
import Campaign from './build/Campaign/Campaign.json'

const createCampaign = address => new web3.eth.Contract(
  JSON.parse(Campaign.interface),
  address
)

export default createCampaign
