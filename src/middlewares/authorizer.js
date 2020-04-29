module.exports = ({ authService }) => {
  const run = () => {
    return async function (req, res, next) {
      try {
        const user = await authService.authorize(req.headers.authorization)

        req.user = user
        next()
      } catch (err) {
        next(err)
      }
    }
  }

  return {
    run
  }
}
