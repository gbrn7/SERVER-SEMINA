const {createOrganizer} = require('../../../services/mongoose/users');
const {StatusCodes} = require('http-status-codes');


const createCmsOrganizer = async(req, res, next) => {
  try {
    const result = await createOrganizer(req);
  
    res.status(StatusCodes.CREATED).json({
      data : result,
    });
    
  } catch (error) {
    next(error);
  }
}


module.exports = {createCmsOrganizer};