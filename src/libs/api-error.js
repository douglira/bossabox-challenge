const Constants = require('./constants')

module.exports = class APIError extends Error {
  constructor ({
    error = null,
    code = 500,
    message = Constants.ERROR.INTERNAL_SERVER_ERROR,
    data = null
  }) {
    super(message)
    this.statusCode = code
    this.message = message
    this.additionalData = data
    this.stack = error && error.stack
  }
}
