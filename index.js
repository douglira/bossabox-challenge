const App = require('./src/server')

App()
  .then(({ server }) => {
    const port = process.env.PORT || 3000

    server.listen(port, () => console.log(`[ENV=${process.env.NODE_ENV}]: SERVER RUNNING ON ${port} PORT`))
  })
  .catch((err) => console.log('Server failed to start:', err))
