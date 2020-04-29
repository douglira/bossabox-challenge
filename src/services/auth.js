const jwt = require('jsonwebtoken')

const Constants = require('../libs/constants')

module.exports = ({ userRepository, config, APIError }) => {
  const jwtSecret = config.getEnv('JWT_SECRET')

  const generateJwt = (userId) => {
    const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60
    return jwt.sign({ userId }, jwtSecret, { expiresIn: SEVEN_DAYS_SECONDS })
  }

  const validateJwt = (token) => {
    return jwt.verify(token, jwtSecret)
  }

  const getAuthObject = (user) => ({
    ...user,
    password: undefined,
    token: generateJwt(user.id)
  })

  const register = async ({ name, email, password }) => {
    if (await userRepository.findByEmail(email)) {
      throw new APIError({
        message: Constants.ERROR.USER_REGISTERED,
        statusCode: 400
      })
    }

    const user = await userRepository.store({
      name,
      email,
      password
    })

    return getAuthObject(user.toJSON())
  }

  const login = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new APIError({ code: 401, message: Constants.ERROR.INVALID_CREDENTIALS })
    }

    if (!await user.checkPassword(password)) {
      throw new APIError({ code: 401, message: Constants.ERROR.INVALID_CREDENTIALS })
    }

    return getAuthObject(user.toJSON())
  }

  const authorize = (bearer) => {
    if (!bearer) {
      throw new APIError({
        message: Constants.ERROR.NOT_AUTHORIZED,
        code: 401
      })
    }

    const parts = bearer.split(' ')

    if (parts.length !== 2) {
      throw new APIError({
        message: Constants.ERROR.NOT_AUTHORIZED,
        code: 401
      })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/.test(scheme)) {
      throw new APIError({
        message: Constants.ERROR.NOT_AUTHORIZED,
        code: 401
      })
    }

    try {
      return validateJwt(token)
    } catch (err) {
      throw new APIError({
        message: Constants.ERROR.NOT_AUTHORIZED,
        code: 401,
        error: err
      })
    }
  }

  return {
    generateJwt,
    authorize,
    register,
    login
  }
}
