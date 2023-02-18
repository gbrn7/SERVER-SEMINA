const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/Organizer/model');
const {BadRequestError} = require('../../errors/index')

const createOrganizer = async(req) =>{
  const {organizer, role, email, password, confirmPassword, name} = req.body;


  const check = await checkEmail(email);
  
  if(password !== confirmPassword){
    throw new BadRequestError('the confirm password and password is not match');
  }

  const result = await Organizers.create({organizer});

  const users = await Users.create({
    email,
    name,
    password,
    role,
    organizer: result._id,
  })
   
  delete users._doc.password; //to delete the password field before return

  return users;
}

const checkEmail = async(email) => {
  const result = await Users.findOne({email});

  if(result) throw new BadRequestError('The Email is already registered');

  return result;
}

module.exports = {createOrganizer};