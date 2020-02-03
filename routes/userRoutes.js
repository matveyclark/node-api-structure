const express = require('express')
const usersController = require('../controller/usersController')
const router = express.Router()

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser)

router.route('/:id')
    .get(usersController.getSingleUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router