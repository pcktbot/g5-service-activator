const models = require("../../models")

module.exports = (app) => {
  app.get('/api/v1/users/da', async(req, res) => {
    const daUsers = await models.user.findAll({
      where: {
        job_title_id: 11
      }
    })
    res.json(daUsers)
  } )
}