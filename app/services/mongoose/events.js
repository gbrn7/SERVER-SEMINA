const {BadRequestError, NotFoundError} = require('../../errors/index');
const {checkingImages} = require('./images');
const {checkingCategories} = require('./categories'); 
const {checkingTalents} = require('./talents');
const Event = require('../../api/v1/events/model');

const getAllEvents = async(req) => {
  const{keyword, category, talent} = req.query;

  let condition = {};

  if(keyword){
    condition = {...condition, name: {$regex : keyword, $options : 'i'}}
  }
  if(category){
    condition = {...condition, category: category}
  }
  if(keyword){
    condition = {...condition, talent: talent}
  }
  
  const result = await Event.find(condition).
  populate({
    path: categories,
    select: '_id name',
  })
  .populate({
    path: Image,
    select: '_id name'
  })
  .populate({
    path: talent,
    select : '_id name'
  });

  return resultl
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
    categories,
    image,
    talent
  } = req.body;

  await checkingCategories(categories);

  await checkingImages(image);

  await checkingTalents(talent);

  const check = await Event.findOne({title});

  if(!check) throw new NotFoundError( `The event with title ${title} is already exist`);

  const result = await Event.create({
    title,
    date,
    about,
    tagline,
    keypoint,
    venue_name,
    statusEvent,
    tickets,
    categories,
    image,
    talent
  });

  return result;
}

const getOneEvent = async (req) => {
  const {id} = req.params;

  const result = await Event.findOne({_id : id})
  .populate({path: image, select : '_id name'})
  .populate({path:categories, select : "_id name"})
  .populate({path:talent, select : '_id name'});

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
    categories,
    image,
    talent
  } = req.body;

  await checkingImages(image);
  await checkingCategories(categories);
  await checkingTalents(talent);

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
    categories,
    image,
    talent
    },
    { new:true,runValidators: true });

    if(!result) throw new NotFoundError(`Event with id ${id} not found`);

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