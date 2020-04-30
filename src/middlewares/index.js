const { asFunction } = require('awilix')

const AuthorizerMiddleware = require('./authorizer')
const ErrorHandlerMiddleware = require('./error-handler')
const HandleValidatorsMiddleware = require('./handle-validators')

module.exports = () => ({
  authorizerMiddleware: asFunction(AuthorizerMiddleware),
  errorHandlerMiddleware: asFunction(ErrorHandlerMiddleware),
  handleValidatorsMiddleware: asFunction(HandleValidatorsMiddleware)
})
