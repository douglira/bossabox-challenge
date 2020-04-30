const { v4: uuid } = require('uuid')

const { ERROR } = require('../../src/libs/constants')
const APIError = require('../../src/libs/api-error')

const ToolService = require('../../src/services/tool')

describe('Unit tests - Tool Service', () => {
  test('Store - should be able to store a tool', async () => {
    const toolPayload = {
      name: 'Github',
      link: 'https://github.com/douglira',
      description: 'My personal Github account',
      tags: ['developer', 'code', 'repository', 'git']
    }
    const userId = uuid()

    const result = await ToolService({
      APIError,
      toolRepository: {
        store: jest.fn().mockResolvedValue({
          ...toolPayload,
          userId,
          _id: uuid()
        })
      }
    }).store(toolPayload, userId)

    expect(result).toEqual({
      _id: expect.any(String),
      userId: expect.any(String),
      name: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
      tags: expect.any(Array)
    })
  })

  test('Remove - should be able to remove a tool', async () => {
    const toolPayload = {
      _id: uuid(),
      name: 'Github',
      link: 'https://github.com/douglira',
      description: 'My personal Github account',
      tags: ['developer', 'code', 'repository', 'git']
    }
    const userId = uuid()

    const removeByIdMock = jest.fn().mockResolvedValue(null)

    await ToolService({
      APIError,
      toolRepository: {
        findById: jest.fn().mockResolvedValue({
          ...toolPayload,
          userId
        }),
        removeById: removeByIdMock
      }
    }).remove({ id: toolPayload._id }, userId)

    expect(removeByIdMock).toHaveBeenCalled()
  })

  test('Remove - should not be able to remove a tool that does not belongs to user', async () => {
    const toolPayload = {
      _id: uuid(),
      name: 'Github',
      link: 'https://github.com/douglira',
      description: 'My personal Github account',
      tags: ['developer', 'code', 'repository', 'git']
    }
    const userId = uuid()

    await expect(ToolService({
      APIError,
      toolRepository: {
        findById: jest.fn().mockResolvedValue({
          ...toolPayload,
          userId
        })
      }
    }).remove({ id: toolPayload._id }, uuid())).rejects.toThrow(new APIError({
      message: ERROR.INVALID_OPERATION,
      code: 404
    }))
  })

  test('Remove - should not be able to remove a tool that does not exist', async () => {
    const userId = uuid()

    await expect(ToolService({
      APIError,
      toolRepository: {
        findById: jest.fn().mockResolvedValue(null)
      }
    }).remove({ id: uuid() }, userId)).rejects.toThrow(new APIError({
      message: ERROR.RESOURCE_NOT_FOUND,
      code: 404
    }))
  })

  test('FindAllByUser - should be able to get user\'s tools', async () => {
    const toolId = uuid()

    const result = await ToolService({
      APIError,
      toolRepository: {
        findAllByUser: jest.fn().mockResolvedValue([
          {
            _id: toolId,
            name: 'Github',
            link: 'https://github.com/douglira',
            description: 'My personal Github account',
            tags: ['developer', 'code', 'git', 'repository'],
            userId: uuid()
          }
        ])
      }
    }).findAllByUser({ id: toolId })

    expect(result).toEqual([
      {
        _id: expect.any(String),
        name: expect.any(String),
        link: expect.any(String),
        description: expect.any(String),
        tags: expect.any(Array),
        userId: expect.any(String)
      }
    ])
  })

  test('FindAllByUserAndTag - should be able to get user\'s tools by tag', async () => {
    const toolId = uuid()

    const result = await ToolService({
      APIError,
      toolRepository: {
        findAllByUserAndTag: jest.fn().mockResolvedValue([
          {
            _id: toolId,
            name: 'Github',
            link: 'https://github.com/douglira',
            description: 'My personal Github account',
            tags: ['developer', 'code', 'git', 'repository'],
            userId: uuid()
          }
        ])
      }
    }).findAllByUserAndTag({ id: toolId, tag: 'developer' })

    expect(result).toEqual([
      {
        _id: expect.any(String),
        name: expect.any(String),
        link: expect.any(String),
        description: expect.any(String),
        tags: expect.any(Array),
        userId: expect.any(String)
      }
    ])
  })
})
