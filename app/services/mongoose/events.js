const {BadRequestError, NotFoundError} = require('../../errors/index');
const {checkingImages} = require('./images');
const {checkingCategories} = require('./categories'); 
const {checkingTalents} = require('./talents');
const Event = require('../../api/v1/events/model');
const { populate } = require('../../api/v1/events/model');

const getAllEvents = async(req) => {
  const{keyword, category, talent} = req.query;

  let condition = {};

  if(keyword){
    condition = {...condition, title: {$regex : keyword, $options : 'i'}}
  }
  if(category){
    condition = {...condition, category: category};
  }
  if(talent){
    condition = {...condition, talent: talent}
  }
  const result = await Event.find(condition)
  .populate({
    path: 'category',
    select: '_id name',
  })
  .populate({
    path: 'image',
    select: '_id name'
  })
  .populate({
    path: 'talent',
    select : '_id name',
    populate: {path:'image', select : '_id name'},
  });

  return result;
} 

const createEvent = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    keypoint,
    venue_name,
    statusEvent,
    tickets,
    category,
    image,
    talent
  } = req.body;

  await checkingCategories(category);
  await checkingImages(image);
  await checkingTalents(talent);
  const check = await Event.findOne({title});

  if(check) throw new BadRequestError( `The event with title ${title} is already exist`);
  
  const result = await Event.create({
    title,
    date,
    about,
    tagline,
    keypoint,
    venue_name,
    statusEvent,
    tickets,
    category,
    image,
    talent
  });

  return result;
}

const getOneEvent = async (req) => {
  const {id} = req.params;
  const result = await Event.findOne({_id : id})
  .populate({path: 'image', select : '_id name'})
  .populate({path:'category', select : "_id name"})
  .populate({path:'talent', select : '_id name', populate: {path:'image', select: '_id name'}});
  console.log('test1');

  if(!result) throw new NotFoundError(`Event with id ${id} not found`);

  return result;
};

const updateEvent = async (req) =>{
  const {id} = req.params;
  const {
    title,
    date,
    about,
    tagline,
    keypoint,
    venue_name,
    statusEvent,
    tickets,
    category,
    image,
    talent
  } = req.body;

  await checkingImages(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const checkid = await Event.findById(id);

  if(!checkid) throw new NotFoundError(`Event with id ${id} not found`);

  const check = await Event.findOne({title, _id:{$ne:id}});

  if(check) throw new BadRequestError(`The Event ${title} is already exist`);

  const result = await Event.findByIdAndUpdate(id, 
    {
    title,
    date,
    about,
    tagline,
    keypoint,
    venue_name,
    statusEvent,
    tickets,
    category,
    image,
    talent
    },
    { new:true,runValidators: true });

    return result;
};

const deleteEvent = async (req) =>{
  const {id} = req.params;

  const result = Event.findByIdAndDelete(id);

  if(!result) throw new NotFoundError(`Event with id ${id} not found`);

  return result;
};

module.exports = {
  getAllEvents,
  createEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
}