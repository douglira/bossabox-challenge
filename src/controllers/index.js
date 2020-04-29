const { asFunction } = require('awilix')

const ToolController = require('./tool')
const AuthController = require('./auth')

module.exports = () => ({
  toolController: asFunction(ToolController),
  authController: asFunction(AuthController)
})
