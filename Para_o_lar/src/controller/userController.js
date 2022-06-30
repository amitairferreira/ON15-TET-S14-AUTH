const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

const getAllUser = async (req, res) => {
  UserSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(users)
  })
}

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  try {
    const newUser = new UserSchema(req.body)

    const savedUser = await newUser.save()

    res.status(201).send({
      message: 'User criado com sucesso',
      savedUser
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  getAllUser,
  createUser
}
