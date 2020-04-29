const { asFunction } = require('awilix')

const ToolService = require('./tool')
const AuthService = require('./auth')

module.exports = () => ({
  toolService: asFunction(ToolService),
  authService: asFunction(AuthService)
})
