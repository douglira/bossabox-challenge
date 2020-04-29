const Constants = require('../libs/constants')

module.exports = ({ APIError }) => {
  const run = () => {
    return function (err, req, res, next) {
      process.env.NODE_ENV !== 'production' && console.log(err.stack)
      if (err instanceof APIError) {
        return res.status(err.statusCode).json({ message: err.message, data: err.additionalData || undefined })
      }
      return res.status(500).json({ message: Constants.ERROR.INTERNAL_SERVER_ERROR })
    }
  }

  return {
    run
  }
}
