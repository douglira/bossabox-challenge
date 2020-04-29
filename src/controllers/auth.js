module.exports = ({ authService }) => {
  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body

      const authData = await authService.login({ email, password })

      res.json(authData)
    } catch (err) {
      next(err)
    }
  }

  const register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body
      const authData = await authService.register({ name, email, password })

      res.status(201).json(authData)
    } catch (err) {
      next(err)
    }
  }

  return {
    login,
    register
  }
}
