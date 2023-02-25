const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require('bcryptjs');

const participantModel = Schema({
        firstName: {
            type: String,
            required: [true, "The name is required"],
            maxLength: [20, "The maximu name character is 20"],
            minLength: [3, "The minimum name character is 3"]
        },
        lastName: {
            type: String,
            required: [true, "The lastname is required"],
            maxLength: [20, "The maximu name character is 20"],
            minLength: [3, "The minimum name character is 3"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "The email is already registered"]
        },
        password: {
            type: String,
            required: [true, "the password is required"],
            minLength: [5, "The minimum password character is 6 chracter"]
        },
        status: {
            type: String,
            enum: ['active', 'not active'],
            default: 'not active'
        },
        role: {
            type: String,
            default: '-',
        },
        otp: {
            type: String,
            required: true
        },
    }, { timestamps: true },

);

participantModel.pre('save', async function(next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
});



participantModel.methods.comparePassword = async function(candidatePasword) {
    const isMatch = await bcrypt.compare(candidatePasword, this.password);
    return isMatch;
};

module.exports = model('Participant', participantModel);