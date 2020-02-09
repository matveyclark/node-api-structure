const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name.']
    },
    email: {
        type: String, 
        required: [true, 'A user must have an email.'],
        validate: [validator.isEmail, 'Must be a valid email.']
    },
    password: {
        type: String, 
        required: [true, 'A user must have a password.'],
        minlength: [8, 'A password must be at least 8 characters.'],
        select: false
    },
    passwordConfirm: {
        type: String, 
        required: [true, 'Please enter the password confirmation.'],
        validate: {
            validator: function(el) {
                return el === this.password
            }
        }
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.confirmPassword = function(receivedPassword, actualPassword) {
    return bcrypt.compare(receivedPassword, actualPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User