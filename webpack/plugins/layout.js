import R from 'ramda'
import fs from 'fs'
import crypto from 'crypto'

export default function(chunkNames) {
  return function() {
    this.plugin('done', function(stats) {
      R.forEach(function(chunksName){
        var layoutName = chunksName
        var chunks = stats.toJson().assetsByChunkName
        var appHtml = R.compose(
          R.reduce(function(appHtml, chunk){
            let hash = crypto.createHash('md5').update(fs.readFileSync('./public/' + chunk)).digest('hex')
            return appHtml.replace(chunk, `${ chunk }?${ hash }`)
          }, fs.readFileSync('./public/' + layoutName + '.html', { encoding: 'utf8' })),
          R.filter(function(chunk){
            return /\.js$|\.css$/.test(chunk)
          })
        )(chunks[chunksName])

        fs.writeFileSync('./public/' + layoutName + '.html', appHtml)
      }, [].concat(chunkNames))

    })
  }
}
