module.exports = ({ toolService }) => {
  const findAll = async (req, res, next) => {
    try {
      const { user: { userId } } = req
      const { tag } = req.query
      let tools

      if (tag) {
        tools = await toolService.findAllByUserAndTag({ userId, tag })
        return res.json(tools)
      }

      tools = await toolService.findAllByUser({ userId })

      res.json(tools)
    } catch (err) {
      next(err)
    }
  }

  const store = async (req, res, next) => {
    try {
      const { user: { userId } } = req
      const toolPayload = req.body

      const tool = await toolService.store(toolPayload, userId)

      res.status(201).json(tool)
    } catch (err) {
      next(err)
    }
  }

  const remove = async (req, res, next) => {
    try {
      const { user: { userId } } = req
      const { id } = req.params

      await toolService.remove({ id }, userId)

      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  }

  return {
    findAll,
    store,
    remove
  }
}
