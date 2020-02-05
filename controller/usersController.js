// user comments

const User = require('../models/userModel')

exports.getUsers = async (req, res) => {
    try {
        const users =  User.find(req.query)
        res.status(200).json({
            status: "success",
            message: "This is the route for all users",
            length: users.length,
            data: {
                users
            }
        })
    } catch(err) {
        res.status(404).json({
            status: "failed",
            message: err
        })
    }
}

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body)
        res.status(201).json({
            status: "success",
            data: {
                user
            }
        })
    } catch(err) {
        res.status(404).json({
            status: "failed",
            message: err
        })
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch(err) {
        res.status(404).json({
            status: "failed",
            message: err
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
        })
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch(err) {
        res.status(404).json({
            status: "failed",
            message: err
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success"
        })
    } catch(err) {
        res.status(404).json({
            status: "failed",
            message: err
        })
    }
}