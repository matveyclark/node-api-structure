const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

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
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        validate: [validator.isEmail, 'User must have a valid email']
    },
    age: {
        type: Number,
        required: [true, 'A user must have an age']
    },
    password: {
        type: String, 
        required: [true, 'A user must have a password'],
        minlength: [8, 'Password must be longer than 8 characters']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please enter the password confirmation'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords must match.'
        }
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User