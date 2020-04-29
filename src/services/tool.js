const Constants = require('../libs/constants')

module.exports = ({ toolRepository, APIError }) => {
  const validateToolOwner = (tool, userId) => tool.userId.toString() === userId

  const findAllByUser = ({ userId }) => {
    return toolRepository.findAllByUser({ userId })
  }

  const findAllByUserAndTag = ({ userId, tag }) => {
    return toolRepository.findAllByUserAndTag({ userId, tag })
  }

  const store = (toolPayload, userId) => {
    return toolRepository.store(toolPayload, userId)
  }

  const remove = async ({ id }, userId) => {
    const tool = await toolRepository.findById(id)

    if (!tool) {
      throw new APIError({
        message: Constants.ERROR.RESOURCE_NOT_FOUND,
        code: 404
      })
    }

    if (!validateToolOwner(tool, userId)) {
      throw new APIError({
        message: Constants.ERROR.INVALID_OPERATION,
        code: 404
      })
    }

    return toolRepository.removeById(id)
  }

  return {
    findAllByUser,
    findAllByUserAndTag,
    store,
    remove
  }
}
