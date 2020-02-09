const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')
const app = express()

// global middleware
app.use(express.json())
app.use(morgan('dev'))

// mounting route handling middleware
app.use('/api/v1/users', userRoutes)


// mount global error handling middleware
app.all('*', (req, res, next) => {
    next(new AppError(`This server cant find ${req.url}`, 404))
})

app.use(globalErrorHandler)


// export app
module.exports = app