const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken')

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

    res.status(201).json({
        status: "success",
        token,
        data: {
            user
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) {
        next(new AppError('Please provide an email and password', 404))
    }
    const user = await User.findOne({email}).select('+password')
    if(!user || !(await user.confirmPassword(password, user.password))) {
        next(new AppError('Please enter a valid username and password', 402))
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    res.status(200).json({
        status: "success",
        token
    })
})