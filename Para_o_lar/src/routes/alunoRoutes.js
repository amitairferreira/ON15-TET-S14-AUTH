const express = require('express')
const router = express.Router()

const controller = require('../controller/alunoController')

const { checkAuth } = require('../middlewares/auth')

router.get('/all', checkAuth,controller.getAll)

router.post('/create', checkAuth, controller.createAluno)

router.put('/update/:id', checkAuth, controller.updateAlunos)

router.delete('/delete/:id', checkAuth, controller.deleteAluno)

module.exports = router
