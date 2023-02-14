const mongoose = require('mongoose');
const {model, Schema} = mongoose;
//the above command definition of object 
//and above comman is equivalent with 'const model = new mongoose.Schema
//conts model = new mongoose.model

let talentSchema = Schema(
  {
    name: {
      type: String,
      required : [true, 'name field is required'],
    },
    role: {
      type: String,
      default: '-',
    },
    //the bellow command is to create relation to image collecttion 
    //we must create ObjectId type
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image', //name of model
      required : true,
    },
  },
  {
    timestamps : true
  }
);



module.exports = model('Talent', talentSchema);