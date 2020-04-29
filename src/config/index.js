require('dotenv').config()

const app = {
  environment: process.env.NODE_ENV,
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET
    }
  }
}

const database = {
  mongo: {
    uri: process.env.DB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
}

module.exports = () => {
  const getEnv = (env) => {
    return process.env[env]
  }

  const getDatabase = (db) => {
    return database[db]
  }

  const getApp = (key) => {
    return app[key]
  }
  return {
    getEnv,
    getDatabase,
    getApp
  }
}
