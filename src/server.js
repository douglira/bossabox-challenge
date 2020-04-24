const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')

const dbConfig = require('./config/database')
const router = require('./routes')

class App {
  constructor () {
    this.isDev = process.env.NODE_ENV !== 'production'

    this.server = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  async database () {
    await mongoose.connect(dbConfig.mongo.uri, dbConfig.mongo.options)
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(helmet())
    this.server.use(cors())
  }

  routes () {
    this.server.use('/api', router)
    this.server.use((_, res) => res.status(404).send('RESOURCE NOT FOUND'))
  }
}

module.exports = new App().server
