const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

//getall com Autenticação
const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(users)
  })
}

//getAll sem autenticação

// const getAll = async (req, res) => {
//   UserSchema.find(function (err, users) {
//     if (err) {
//       res.status(500).send({ message: err.message })
//     }
//     res.status(200).send(users)
//   })
// }

// 3 opções de lógica p/create
// const createUser = async (req, res) => {
//   try {
//     const newUser = new UserSchema({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     })

//     const savedUser = await newUser.save()

//     res.status(201).send({
//       message: 'User criado com sucesso',
//       savedUser
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({
//       message: err.message
//     })
//   }
// }

// const createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body
//     if (!name.name && !email.email) {
//       res.status(404).send({
//         message: 'Campos obrigatórios precisam ser preenchidos'
//       })
//     }

//     const newUser = await UserSchema.create({ name, email, password })

//     const newUser = new UserSchema({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     })

//     const savedUser = await newUser.save()

//     res.status(201).send({
//       message: 'User criado com sucesso'
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({
//       message: err.message
//     })
//   }
// }

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
  getAll,
  createUser
}
