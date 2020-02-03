const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/api/v1/users', userRoutes)

module.exports = app