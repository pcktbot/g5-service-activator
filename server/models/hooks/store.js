module.exports = (models, Sequelize, sequelize) => {
  models.store.addHook('beforeBulkUpdate', (options) => {
    options.individualHooks = true
  })
  models.store.addHook('beforeBulkCreate', async (instances, options) => {
    let position = await findPosition(instances[0].dataValues.client_id, sequelize, options.transaction, models)
    for (let i = 0; i < instances.length; i++) {
      const instance = instances[i]
      await instance.update({ position })
      position++
    }
    // options.individualHooks = true
  })
  // models.store.addHook('afterCreate', async (instance, options) => updatePosition(instance, models, Sequelize, sequelize, options))
}
function findPosition(client_id, sequelize, transaction, models){
  return models.store.findOne({
    where: { client_id },
    attributes: [[sequelize.fn('MAX', sequelize.col('position')), 'position']]
  }, { transaction }).then(store => {
    return store.dataValues.position + 1 
  })
}