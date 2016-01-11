const config = require('environmental').config()
const path = require('path')

const fs = require('fs')
const manifestPath =
  path.join(process.cwd(), config.assets.dist, config.assets.manifest)

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

const webpackAsset = (asset) => {
  return path.join(`${config.assets.publicpath}`, manifest[`${asset}`])
}

export default webpackAsset
