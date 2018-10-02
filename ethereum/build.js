const compile = require('./compile')
const fs = require('fs-extra')
const { resolve, sep } = require('path')

const sources = [
  'Campaign.sol'
]

const buildPath = resolve(__dirname, 'build')

const saveContract = (name, contract) => fs.outputJson(
  resolve(buildPath, name.split('.sol:').join(sep) + '.json'),
  contract
)

const build = async () => {
  await fs.remove(buildPath)
  await fs.ensureDir(buildPath)
  const contracts = await compile(sources)
  const savingContracts = Object.entries(contracts).map(([name, contract]) => saveContract(name, contract))
  await Promise.all(savingContracts)
  if (savingContracts.length)
    console.log(`Next contracts has been built:\n${Object.keys(contracts).join('\n')}`)
  else
    console.log('No contracts has been built')
}

build()
