const models = require('../../models') 
module.exports = (app) => {
  app.get('/api/v1/clients/:id/stores/:storeId/services', async (req, res) => {
    const services = await models.service.findAll({
      where: {
        store_id: req.params.storeId
      }
    })
    res.json(services)
  })
}