const { Router } = require('express')

module.exports = ({
  authorizerMiddleware,
  errorHandlerMiddleware,

  authValidator,

  toolController,
  authController
}) => {
  const router = Router()

  /* Auth */
  router.use(
    '/auth',
    router.post('/register', authValidator.register(), authController.register),
    router.post('/login', authValidator.login(), authController.login)
  )

  /* Tools */
  router.use(
    '/tools',
    router.all('*', authorizerMiddleware.run()),
    router.get('/', toolController.findAll),
    router.post('/', toolController.store),
    router.delete('/:id', toolController.remove)
  )

  /* Error Handler */
  router.use(errorHandlerMiddleware.run())

  return {
    router
  }
}
