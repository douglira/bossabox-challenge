const { v4: uuid } = require('uuid')

const { ERROR } = require('../../src/libs/constants')
const Config = require('../../src/config')
const APIError = require('../../src/libs/api-error')

const AuthService = require('../../src/services/auth')

describe('Unit tests - Auth', () => {
  test('Register - should be able to register successfully', async () => {
    const userPayload = {
      name: 'Douglas Lira',
      email: 'douglas@email.com',
      password: 'password'
    }

    const userId = uuid()

    const result = await AuthService({
      APIError,
      config: Config(),
      userRepository: {
        findByEmail: jest.fn().mockResolvedValue(null),
        store: jest.fn().mockResolvedValue({
          id: userId,
          ...userPayload,
          toJSON: jest.fn().mockReturnValue({
            _id: userId,
            ...userPayload
          })
        })
      }
    }).register(userPayload)

    expect(result).toEqual({
      _id: expect.any(String),
      token: expect.any(String),
      name: expect.any(String),
      email: expect.any(String)
    })
  })

  test('Register - should be able to register a registered user', async () => {
    const userPayload = {
      name: 'Douglas Lira',
      email: 'douglas@email.com',
      password: 'password'
    }

    await expect(AuthService({
      APIError,
      config: Config(),
      userRepository: {
        findByEmail: jest.fn()
          .mockResolvedValueOnce(userPayload)
      }
    }).register(userPayload)).rejects.toEqual(new APIError({
      message: ERROR.USER_REGISTERED,
      statusCode: 400
    }))
  })

  test('Login - should be able to authenticate a valid user', async () => {
    const userPayload = {
      name: 'Douglas Lira',
      email: 'douglas@email.com',
      password: 'password'
    }

    const userId = uuid()
    const checkPasswordMock = jest.fn().mockResolvedValue(true)

    const result = await AuthService({
      APIError,
      config: Config(),
      userRepository: {
        findByEmail: jest.fn().mockResolvedValue({
          id: userId,
          ...userPayload,
          checkPassword: checkPasswordMock,
          toJSON: jest.fn().mockReturnValue({
            _id: userId,
            ...userPayload
          })
        })
      }
    }).login(userPayload)

    expect(checkPasswordMock).toHaveBeenCalled()
    expect(result).toEqual({
      _id: expect.any(String),
      token: expect.any(String),
      name: expect.any(String),
      email: expect.any(String)
    })
  })

  test('Login - should not be able to authenticate an unregistered user or wrong email', async () => {
    const userPayload = {
      name: 'Douglas Lira',
      email: 'douglas@email.com',
      password: 'password'
    }

    await expect(AuthService({
      APIError,
      config: Config(),
      userRepository: {
        findByEmail: jest.fn().mockResolvedValue(null)
      }
    }).login(userPayload)).rejects.toEqual(new APIError({
      message: ERROR.INVALID_CREDENTIALS,
      code: 401
    }))
  })

  test('Login - should not be able to authenticate a wrong password', async () => {
    const userPayload = {
      name: 'Douglas Lira',
      email: 'douglas@email.com',
      password: 'password'
    }

    const userId = uuid()
    const checkPasswordMock = jest.fn().mockResolvedValue(false)

    await expect(AuthService({
      APIError,
      config: Config(),
      userRepository: {
        findByEmail: jest.fn().mockResolvedValue({
          id: userId,
          ...userPayload,
          checkPassword: checkPasswordMock,
          toJSON: jest.fn().mockReturnValue({
            _id: userId,
            ...userPayload
          })
        })
      }
    }).login(userPayload)).rejects.toEqual(new APIError({
      message: ERROR.INVALID_CREDENTIALS,
      code: 401
    }))
    expect(checkPasswordMock).toHaveBeenCalled()
  })

  test('Authorize - should be able to authorize a valid user', () => {
    const userId = uuid()
    const bearer = AuthService({ config: Config() }).generateJwt(userId)
    const authorizationHeader = `Bearer ${bearer}`

    const result = AuthService({
      APIError,
      config: Config()
    }).authorize(authorizationHeader)

    expect(result).toEqual({
      exp: expect.any(Number),
      iat: expect.any(Number),
      userId
    })
  })

  test('Authorize - should not be able to authorize when authorization header not present', () => {
    expect(() => AuthService({
      APIError,
      config: Config()
    }).authorize(null)).toThrow(new APIError({
      message: ERROR.NOT_AUTHORIZED,
      code: 401
    }))
  })

  test('Authorize - should not be able to authorize when wrong bearer format', () => {
    const userId = uuid()
    const authorizationHeader = AuthService({ config: Config() }).generateJwt(userId)

    expect(() => AuthService({
      APIError,
      config: Config()
    }).authorize(authorizationHeader)).toThrow(new APIError({
      message: ERROR.NOT_AUTHORIZED,
      code: 401
    }))
  })

  test('Authorize - should not be able to authorize when wrong bearer schema', () => {
    const userId = uuid()
    const bearer = AuthService({ config: Config() }).generateJwt(userId)
    const authorizationHeader = `API-Key ${bearer}`

    expect(() => AuthService({
      APIError,
      config: Config()
    }).authorize(authorizationHeader)).toThrow(new APIError({
      message: ERROR.NOT_AUTHORIZED,
      code: 401
    }))
  })

  test('Authorize - should not be able to authorize an invalid bearer token', () => {
    const userId = uuid()
    const bearer = AuthService({
      config: {
        getEnv: jest.fn().mockReturnValue('invalidApiSecret')
      }
    }).generateJwt(userId)
    const authorizationHeader = `Bearer ${bearer}`

    expect(() => AuthService({
      APIError,
      config: Config()
    }).authorize(authorizationHeader)).toThrow(new APIError({
      message: ERROR.NOT_AUTHORIZED,
      code: 401
    }))
  })
})
