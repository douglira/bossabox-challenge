const { asFunction } = require('awilix')

const ToolRepositoryMongo = require('./mongo/tool')
const UserRepositoryMongo = require('./mongo/user')

module.exports = () => ({
  toolRepository: asFunction(ToolRepositoryMongo),
  userRepository: asFunction(UserRepositoryMongo)
})
