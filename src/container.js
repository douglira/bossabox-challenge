const { createContainer, asFunction, asValue } = require('awilix')

const Config = require('./config')
const ModelsFactory = require('./models')
const RepositoriesFactory = require('./repositories')
const ControllersFactory = require('./controllers')
const ServicesFactory = require('./services')
const MiddlewaresFactory = require('./middlewares')
const RoutesVersion1 = require('./routes/v1')

const APIError = require('./libs/api-error')

const container = createContainer()

container.register({
  config: asFunction(Config),

  APIError: asValue(APIError),

  ...ModelsFactory(),
  ...RepositoriesFactory(),
  ...ServicesFactory(),
  ...ControllersFactory(),
  ...MiddlewaresFactory(),

  v1Routes: asFunction(RoutesVersion1)
})

module.exports = container
