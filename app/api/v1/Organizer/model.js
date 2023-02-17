const mongoose = require('mongoose');
const { model, Schema } = mongoose;
//the code above is equivalent with bellow
// const model = mongoose.model
// const Schema = mongoose.Schema

let organizerSchema = Schema({
    organizer: {
        type: String,
        required: [true, 'The Orginizer is required'],
    },
}, { timestamps: true }); //schema is design of table or collection in mongodb

module.exports = model('Organizer', organizerSchema);
//this mean that create a model and named with category that contain declared schema