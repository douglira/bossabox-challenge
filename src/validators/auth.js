const { checkSchema } = require('express-validator')

module.exports = function ({ handleValidatorsMiddleware }) {
  function validateSchema (schema) {
    return [checkSchema(schema), handleValidatorsMiddleware.run()]
  }

  function register () {
    return validateSchema({
      name: {
        in: 'body',
        trim: true,
        exists: true,
        isString: true
      },
      email: {
        in: 'body',
        trim: true,
        exists: true,
        isString: true,
        isEmail: true
      },
      password: {
        in: 'body',
        trim: true,
        exists: true,
        isString: true,
        isLength: {
          options: { min: 4 }
        }
      }
    })
  }

  function login () {
    return validateSchema({
      email: {
        in: 'body',
        trim: true,
        exists: true,
        isString: true,
        isEmail: true
      },
      password: {
        in: 'body',
        trim: true,
        exists: true,
        isString: true,
        isLength: {
          options: { min: 4 }
        }
      }
    })
  }
  return {
    register,
    login
  }
}
