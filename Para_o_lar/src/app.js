const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv-safe').config()

const db = require('./database/mongoConfig')
const alunoRoutes = require('./routes/alunoRoutes')
const userRoutes = require('./routes/userRoutes')

db.connect()

app.use(cors())
app.use(express.json())
app.use('/alunos', alunoRoutes)
app.use('/users', userRoutes)

module.exports = app
