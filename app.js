const express = require('express')
const userRoutes = require('./routes/userRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const app = express()

app.use(express.json())

app.use('/api/v1/users', userRoutes)

app.all('*', (req, res, next) => {
    next(new AppError(`This server cannot find ${req.url}`, 404))
})

app.use(globalErrorHandler)

module.exports = app