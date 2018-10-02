const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const fs = require('fs-extra')
const { resolve } = require('path')
const config = require('../config.json')

const provider = new HDWalletProvider(config.mnemonic, config.link)
const web3 = new Web3(provider)

const deploy = async () => {
  const contractFile = process.argv[2]
  if (!contractFile) {
    console.error('Contract is not specified')
    throw new Error('Contract is not sepcified')
  }
  const contract = require(resolve(__dirname, 'build', contractFile + '.json'))

  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(contract.interface))
    .deploy({ data: contract.bytecode })
    .send({ from: accounts[0], gas: (1e6).toString() })
  console.log('Contract deployed to', result.options.address)
  process.exit(0)
}

deploy().catch(err => {
  console.error(err.message)
  process.exit(1)
})
