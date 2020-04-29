const { asValue } = require('awilix')

const Tool = require('./tool')
const User = require('./user')

module.exports = () => ({
  toolModel: asValue(Tool),
  userModel: asValue(User)
})
