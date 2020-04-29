const { asFunction } = require('awilix')

const AuthorizerMiddleware = require('./authorizer')
const ErrorHandlerMiddleware = require('./error-handler')

module.exports = () => ({
  authorizerMiddleware: asFunction(AuthorizerMiddleware),
  errorHandlerMiddleware: asFunction(ErrorHandlerMiddleware)
})
