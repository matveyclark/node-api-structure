const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')

exports.getUsers = catchAsync(async (req, res) => {
    const users =  await User.find(req.query)
    res.status(200).json({
        status: "success",
        message: "This is the route for all users",
        length: users.length,
        data: {
            users
        }
    })
})

exports.createUser = catchAsync(async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json({
        status: "success",
        data: {
            user
        }
    })
})

exports.getSingleUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
})

exports.updateUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        "new": true
    })
    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
})

exports.deleteUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: "success"
    })
})