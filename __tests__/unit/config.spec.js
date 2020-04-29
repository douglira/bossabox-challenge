const Config = require('../../src/config')

describe('Smoke tests - Config', () => {
  test('Config - validate functions', () => {
    const config = Config()

    expect(config).toEqual({
      getEnv: expect.any(Function),
      getDatabase: expect.any(Function),
      getApp: expect.any(Function)
    })
  })

  test('App - should be able to get an App configuration', () => {
    const config = Config()

    const appEnvironment = config.getApp('environment')

    expect(appEnvironment).toEqual('test')
  })

  test('Database - should be able to get an Database configuration', () => {
    const config = Config()

    const databaseConfig = config.getDatabase('mongo')

    expect(databaseConfig).toHaveProperty('uri')
  })
})
