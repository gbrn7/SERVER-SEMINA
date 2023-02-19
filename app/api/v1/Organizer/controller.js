const { createOrganizer, createUsers, getAllUsers } = require('../../../services/mongoose/users');
const { StatusCodes } = require('http-status-codes');


const createCmsOrganizer = async(req, res, next) => {
    try {

        const result = await createOrganizer(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

const createCmsUser = async(req, res, next) => {
    try {
        const result = await createUsers(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

const getCmsUsers = async(req, res, next) => {
    try {
        const result = await getAllUsers();
        res.status(StatusCodes.OK).json({
            data: result,
        })

    } catch (error) {
        next(error)
    }
}


module.exports = { createCmsOrganizer, createCmsUser, getCmsUsers };