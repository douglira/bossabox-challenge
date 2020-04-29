module.exports = ({ toolModel: Tool }) => {
  const findAllByUser = ({ userId }) => {
    return Tool.find({ userId })
  }

  const findAllByUserAndTag = ({ userId, tag }) => {
    return Tool.find({
      userId,
      tags: {
        $in: [tag]
      }
    })
  }

  const store = (toolPayload, userId) => {
    const tool = new Tool({
      ...toolPayload,
      userId
    })

    return tool.save()
  }

  const findById = (id) => {
    return Tool.findById(id)
  }

  const removeById = (id) => {
    return Tool.deleteOne({ _id: id })
  }

  return {
    findAllByUser,
    findAllByUserAndTag,
    store,
    findById,
    removeById
  }
}
