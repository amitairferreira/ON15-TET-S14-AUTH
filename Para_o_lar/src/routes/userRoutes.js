const express = require('express')
const router = express.Router()

const controller = require('../controller/userController')
const authController = require('../controller/authController')

const { checkAuth } = require('../middlewares/auth')

router.get('/getAllUser', checkAuth, controller.getAllUser)

router.post('/createUser', controller.createUser)

router.post('/login', authController.login)

module.exports = router