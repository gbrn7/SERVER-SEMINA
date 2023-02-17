const {BadRequestError, NotFoundError} = require('../../errors');
const Talent = require('../../api/v1/talents/model');
const {checkingImages} = require('./images');


const getAllTalents = async(req) => {
  
  const { keyword } = req.query;

  let condition = {};

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
  }
  //the three dot is used for copy from previous value

  const result = await Talent.find(condition)
  .populate({
    path: 'image',
    select : '_id name'
  })
  .select('_id name role Image');

  return result;
}

const createTalents = async(req) => {
  const {name, role, image} = req.body;
  
  await checkingImages(image);

  const check = await Talent.findOne({name});

  if(check) throw new BadRequestError(`The talents is already exist`);

  const result = await Talent.create({name, role, image});

  return result;
};

const getOneTalents = async(req) => {
  const {id} = req.params;

  const result = await Talent.findOne({_id : id})
  .populate({
    path: 'image',
    select : '_id name',
  }) //or populate({'image'})
  .select('_id name role image');

  if(!result) throw new NotFoundError(`talent with id : ${id} not found`);

  return result;

}

const updateTalents = async (req) =>{
  const {id} = req.params;
  const {name, role, image} = req.body;

  await checkingImages(image);

  //Checking in database
  const checkid = await Talent.findById(id);

  //if null throw the below message
  if(!checkid) throw new NotFoundError(`Event with id ${id} not found`);

  const check = await Talent.findOne({name, _id:{$ne : id}});

  if(check) throw new BadRequestError("The talents is already exist");

  const result = await Talent.findByIdAndUpdate(id, {name, role}, { new: true, runValidators: true });

  if(!result) throw new NotFoundError(`Talents with id : ${id} not found`);

  return result;
}

const deleteTalents = async(req) => {
  const {id} = req.params;

  const result = await Talent.findByIdAndDelete(id);

  if(!result) throw new NotFoundError(`Talents with id : ${id} not found`);

  return result;
}

const checkingTalents = async(id) => {
  const result = await Talent.findOne({_id: id});

  if(!result) throw new BadRequestError(`Talent with id ${id} is not existed`);

  return result;
}

module.exports = {getAllTalents, createTalents, getOneTalents, updateTalents, deleteTalents, checkingTalents};

