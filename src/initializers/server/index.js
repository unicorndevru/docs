const config = require('environmental').config()
import './cssHook'
import reload from './reload'
import assets from './assets'
let App = null

module.exports = function (middlewareConfig){
  return function*(next) {
    yield* next

    if (this.method != 'HEAD' && this.method != 'GET') return
    if (this.body != null || this.status != 404) return

    this.render(middlewareConfig.view, {
      assets: assets
    })
  }
}
