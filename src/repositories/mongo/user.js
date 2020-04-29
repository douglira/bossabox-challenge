module.exports = ({ userModel: User }) => {
  const store = (user) => {
    return User.create({ ...user })
  }

  const update = (user) => {
    return User.findByIdAndUpdate(user.id, user, { new: true })
  }

  const findById = (id) => {
    return User.findById(id)
  }

  const findByEmail = (email) => {
    return User.findOne({ email }).select('+password')
  }

  return {
    store,
    update,
    findById,
    findByEmail
  }
}
