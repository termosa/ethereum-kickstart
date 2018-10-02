import web3 from './web3'
import CampaignFactory from './build/Campaign/CampaignFactory.json'
const { address } = require('../config.json')

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  address
)

export default instance
