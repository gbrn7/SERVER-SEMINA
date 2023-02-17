const mongoose = require('mongoose');
const { model, Schema } = mongoose;
//the code above is equivalent with bellow
// const model = mongoose.model
// const Schema = mongoose.Schema
const bcrypt = require(''); 
//bcrypt is used for hash password or anything

let usersSchema = Schema({
    name: {
      type: String,
      minlength: [3, '3 Minimum Character'],
      maxLength: [20, 'Max 20 Character'],
      required: [true, 'The Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The Email is required'],
    },
    password: {
        type: String,
        minlength : [6, 'the minimum character is 6'],
        required: [true, 'The Password is required'],
    },
    role: {
        type: String,
        enum: ['admin', 'organizer', 'owner'],
        default: 'admin',
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true
    },
}, { timestamps: true }); //schema is design of table or collection in mongodb



module.exports = model('Users', organizerSchema);
//this mean that create a model and named with category that contain declared schema