const models = require('../../models')

module.exports = (app) => {
  app.get('/api/v1/clients', async (req, res) => {
    const clients = await models.client.findAll()
    res.json(clients.map(client => {
      const { id, branded_name, client_name, urn } = client
      return { id, branded_name, client_name, urn }
    }))
  })

  app.post('/api/v1/clients', async (req, res) => {
    console.log({ req })
    res.sendStatus(201)
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