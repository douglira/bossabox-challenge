const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')

const container = require('./container')
const Constants = require('./libs/constants')

module.exports = async () => {
  const server = express()
  const config = container.resolve('config')
  const apiRoutes = {
    v1: container.resolve('v1Routes')
  }

  try {
    const mongo = config.getDatabase('mongo')
    await mongoose.connect(mongo.uri, mongo.options)
  } catch (err) {
    console.error('ErrorConnection MongoDB:', err.stack)
  }

  server.use(express.json())
  server.use(helmet())
  server.use(cors())

  const swaggerDocument = YAML.load('./docs/swagger.yaml')
  server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

  server.use('/api/v1', apiRoutes.v1.router)
  server.use((_, res) => res.status(404).send(Constants.ERROR.RESOURCE_NOT_FOUND))

  return {
    server
  }
}
