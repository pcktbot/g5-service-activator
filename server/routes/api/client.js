const models = require('../../models')
module.exports = (app) => {
  console.log('here')
  app.get('/api/v1/clients', async (req, res) => {
    const clients = await models.client.findAll()

    res.json(clients.map(client => {
      const { id, branded_name, client_name, urn } = client
      return { id, branded_name, client_name, urn }
    }))
  })
  app.get('/api/v1/clients/:id', async (req, res) => {
    const client = await models.client.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(client)
  })
}