const fs = require('fs')
const path = require('path')
function addPrototypes(db, Sequelize, sequelize) {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js') // get all the model files
    .forEach((file) => {
      require(path.join(__dirname, file))(db, Sequelize, sequelize)
    })
}

module.exports = addPrototypes
