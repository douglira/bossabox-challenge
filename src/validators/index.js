const { asFunction } = require('awilix')

const AuthValidator = require('./auth')

module.exports = () => ({
  authValidator: asFunction(AuthValidator)
})
