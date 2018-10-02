import Web3 from 'web3'

const getProvider = () => window.web3.currentProvider
const createProvider = () => new Web3.providers.HttpProvider(
  'https://rinkeby.infura.io/v3/8c742679825044c98765b7857d282437'
)

const hasProvider = () =>
  typeof window !== 'undefined' && typeof window.web3 !== 'undefined'

const web3 = new Web3(hasProvider() ? getProvider() : createProvider())

export default web3
