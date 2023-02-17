const mongoose = require('mongoose');

const ticketCategoriesSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'The type of ticket is required']
    },
    price:{
      type:Number,
      default: 0
    },
    stock:{
      type:Number,
      default: 0
    },
    statusTicketCategories:{
      type:Boolean,
      enum: ['true', 'false'],
      default : true
    },
    expired :{
      type:Date
    }
  }
);


const EventSchema =  mongoose.Schema(
  {
    title:{
      type: String,
      required: [true, 'Title of events is required'],
      minlength: 3,
      maxlength: 50,
    },
    date:{
      type: Date,
      required: [true, 'Event date is required'],
    },
    about:{
      type: String,
    },
    tagline:{
      type:String,
      required: [true, 'Tagline is required'],
    },
    keypoint:{
      type:[String],
    },
    venue_name :{
      type:String,
      required: [true, 'The venue of events is required'],
    },
    statusEvent :{
      type: String,
      enum:['Draft', 'Published'],
      default: 'Draft',
    },
    tickets:{
      type:[ticketCategoriesSchema],
      required: true,
    },
    category:{
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    image:{
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true
    },
    talent:{
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Event', EventSchema);