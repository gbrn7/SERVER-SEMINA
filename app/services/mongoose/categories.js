const Categories = require('../../api/v1/categories/model');
const {BadRequestError, NotFoundError} = require('../../errors');


const getAllCategories = async () => {
  const result = await Categories.find();

  return result;
};

const createCategories = async (req) =>{
  const { name } = req.body; //grab the request body
  
  // Checking in database 
    const check = await Categories.findOne({ name }); //equivalebt wutg 'name : name'
    
    // if the input data is already in database then throw error 'BadRequestError'
    if (check) throw new BadRequestError('The category name is already in categories collection');
    const result = Categories.create({ name }); 
    
    return result
}

const getOneCategories = async (req) =>{
  const { id } = req.params; //params is paramater that sended by router and must the variable must have the same name with paramater name in router

    // Checking in database 
  const result = await Categories.findById( id );
    
    // if the input data is already in database then throw error 'BadRequestError'
  if (!result) throw new NotFoundError(`The id Category ${id} is not found`);

  return result;
}

const updateCategories = async(req) => {
  const { id } = req.params;
  const { name } = req.body;

  //Checking in database
  const checkid = await Categories.findById(id);

  //if null throw the below message
  if(!checkid) throw new NotFoundError(`Event with id ${id} not found`);

  // Checking in database 
  const check = await Categories .findOne({name, _id:{$ne:id}});

  // if the input data is already in database then throw error 'BadRequestError'
  if (check) throw new BadRequestError(`The category name is duplicate with other`);

  const result = await Categories.findByIdAndUpdate({ _id: id }, { name: name }, { new: true, runValidators: true });

  if (!result) throw new NotFoundError(`The new name of category is already inserted`);

  return result;
}

const deleteCategories = async(req) =>{
  const{id} = req.params;

  const result = await Categories.findOne({_id : id});

  if (!result) throw new NotFoundError(`The id Category ${id} is not found`);

  await result.remove();

  return result;
}

const checkingCategories = async(id) =>{
  const result = await Categories.findOne({_id : id});

  if(!result) throw new NotFoundError(`categories with id ${id} not found`);

  return result;
}

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories
};