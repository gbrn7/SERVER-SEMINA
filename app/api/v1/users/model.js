const mongoose = require('mongoose');
const { model, Schema } = mongoose;
//the code above is equivalent with bellow
// const model = mongoose.model
// const Schema = mongoose.Schema
const bcrypt = require('bcryptjs'); 
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

usersSchema.pre('save', async function (next){
  const User = this;
  if(User.isModified('password')){
    User.password = await bcrypt.hash(User.password, 12);// this line is used for hash password
  }
});

usersSchema.methods.comparePassword = async function (candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
}


module.exports = model('Users', usersSchema);
//this mean that create a model and named with category that contain declared schema