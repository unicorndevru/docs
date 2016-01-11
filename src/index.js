import appModulePath from 'app-module-path';
import path from 'path';
appModulePath.addPath(path.join(process.cwd(), '/src'))

import koa from 'koa'
import environmental from 'environmental'
import serve from 'koa-static'
import send from 'koa-send'
import koaBody from 'koa-better-body'
import logger from 'koa-logger'
import hbs from 'koa-hbs'
import Jade from 'koa-jade'
import userAgent from 'koa-useragent'
import reactAppMiddleware from './initializers/server'

const config = environmental.config()

const jade = new Jade({
  viewPath: path.join(__dirname, './initializers/views')
})

var app = module.exports = koa()

app.use(logger())
app.use(userAgent())
app.use(serve(path.join(__dirname, '../public')))

//
app.use(jade.middleware)

app.use(reactAppMiddleware({
  view: "layout"
}))


if (!module.parent) {
  var port = process.env.PORT || config.app.port || 3000
  app.listen(port)
  console.log('listening on port ' + port)
}
