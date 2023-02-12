const mongoose = require('mongoose');
const { model, Schema } = mongoose;
//the code above is equivalent with bellow
// const model = mongoose.model
// const Schema = mongoose.Schema

let categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, '3 Minimum Character'],
        maxLength: [20, 'Max 20 Character'],
        required: [true, 'The category name is required'],
    },
}, { timestamps: true }); //schema is design of table or collection in mongodb

module.exports = model('Category', categorySchema);
//this mean that create a model and named with category that contain declared schema