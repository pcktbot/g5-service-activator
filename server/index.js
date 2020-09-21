require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
app.use(bodyParser.json({ limit: '1000kb' }))
app.use((req, res, next) => {
  console.log(req.path)
  next()
})
const models = require('./models')
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
require('./routes')(app)
async function start () {
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    // require('appmetrics-zipkin')()
    // require('appmetrics-prometheus').attach()
  }

  app.use(nuxt.render)
  try {
    console.log('here')
    console.log(models.sequelize.sync)
    await models.sequelize.sync()
    app.listen(port, host)
    console.log({ message: `Server listening on http://${host}:${port}`})
  } catch (error) {
    console.log({ error })
  } 
}
start()
