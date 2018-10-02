const fs = require('fs-extra')
const solc = require('solc')
const { resolve } = require('path')

const compile = async files => {
  const loadingFiles = files
    .map(async name => ({
      name,
      source: await fs.readFile(resolve(__dirname, 'contracts', name), 'utf8')
    }))
  const loadedFiles = await Promise.all(loadingFiles)
  const sources = loadedFiles
    .reduce((sources, { name, source }) => Object.assign(sources, { [name]: source }), {})
  const result = solc.compile({ sources }, 1)

  if (result.errors && result.errors.length) {
    console.error(result.errors.join('\n'))
    throw new Error(`Compilation has failed.`)
  }

  return result.contracts
}

module.exports = compile
