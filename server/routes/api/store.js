const { mode } = require("../../../nuxt.config")
const models = require("../../models")

module.exports = (app) => {
  app.get('/api/v1/clients/:id/stores', async (req, res) => {
    const stores = await models.store.findAll({
      where: {
        client_id: req.params.id
      }
    })
    res.json(stores.map(store => {
      const { id, name, branded_name } = store
      return { id, name, branded_name }
    }))
  })
  app.post('/api/v1/clients/:id/stores', async (req, res) => {
    const { body } = req
    const { id } = req.params
    console.log(body)
    models.sequelize.transaction(async (t) => {
      if (Array.isArray(body)) {
        body.forEach(location => {
          location.client_id = id
        })
        await models.store.bulkCreate(body, { transaction: t })
      } else {
        body.client_id = id
        await models.store.create(body, { transaction: t })
      }
    })

    res.sendStatus(200)
  })
  app.get('/api/v1/clients/:id/stores/:storeId', async (req, res) => {
    const stores = await models.store.findAll({
      where: {
        id: req.params.storeId
      }
    })
    res.json(stores)
  })
}