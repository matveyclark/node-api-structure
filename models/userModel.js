const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'A user must have a first name.']
    },
    lastName: {
        type: String,
        required: [true, 'A user must have a last name']
    },
    username: {
        type: String,
        required: [true, 'A user must have a username.'],
        unique: [true, 'This username is already taken.']
    },
    age: {
        type: Number,
        required: [true, 'A user must have an age']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User