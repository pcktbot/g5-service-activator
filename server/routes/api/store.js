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
  app.post('/api/v1/clients/:id/stores', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
  })
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