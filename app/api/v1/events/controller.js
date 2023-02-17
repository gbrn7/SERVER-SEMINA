const { getAllEvents, createEvent, getOneEvent, updateEvent, deleteEvent } = require('../../../services/mongoose/events');
const {StatusCodes} = require('http-status-codes');
const { deleteCategories } = require('../../../services/mongoose/categories');


const index = async (req, res, next) => {

  try {
    const result = await getAllEvents(req);
    
    res.status(StatusCodes.OK).json({
      data : result,
    })
  } catch (error) {
    next(error);
  }

}

const create = async (req, res, next) => {
  try {
    const result = await createEvent(req);

    res.status(StatusCodes.CREATED).json({
      data : result,
    })

  } catch (error) {
    next(error);
  }
}


const find = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })

  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const result = await updateEvent(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    })

  } catch (error) {
    next(error);
  }
}

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvent(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })

  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  create,
  find,
  update,
  destroy
}




