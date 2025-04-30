const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },
    phone: {
        type: Number,
        required: [true, "Please provide a Number"]
    },
    status: {
        type: String,
        enum: ['Active', 'Banned'],
        default: 'Active'
    },
    role: {
        type: String,
        required: [true, 'role is required']
    }
}, {
    timestamps: true
})


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', userSchema)