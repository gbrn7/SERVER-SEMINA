const { createTalents, getAllTalents, getOneTalents, updateTalents, deleteTalents, getAllRole } = require('../../../services/mongoose/talents');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });

  } catch (error) {
    next(error);
  }
}

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });

  } catch (error) {
    next(error);
  }
}

const find = async (req, res, next) => {
  try {
    const result = await getOneTalents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })

  } catch (error) {
    next(error)
  }

}

const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const findRole = async (req, res, next) => {
  try {
    const result = await getAllRole(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })

  } catch (error) {
    next(error)
  }

}

module.exports = { index, create, find, update, destroy, findRole };