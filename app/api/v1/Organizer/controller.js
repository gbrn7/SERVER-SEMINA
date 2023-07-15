const { createOrganizer, createUsers, getAllUsers, getAllAdmin, deleteAdmin, updateAdmin, getOneUser } = require('../../../services/mongoose/users');
const { StatusCodes } = require('http-status-codes');


const createCmsOrganizer = async (req, res, next) => {
    try {

        const result = await createOrganizer(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

const createCmsUser = async (req, res, next) => {
    try {
        const result = await createUsers(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

const getCmsUsers = async (req, res, next) => {
    try {
        const result = await getAllUsers();
        res.status(StatusCodes.OK).json({
            data: result,
        })

    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneUser(req);
        res.status(StatusCodes.OK).json({
            data: result,
        })

    } catch (error) {
        next(error)
    }
}

const getCmsAdmin = async (req, res, next) => {
    try {
        const result = await getAllAdmin(req);
        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const updateCmsAdmin = async (req, res, next) => {
    try {
        const result = await updateAdmin(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

const destroyAdmin = async (req, res, next) => {
    try {

        const result = await deleteAdmin(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { createCmsOrganizer, createCmsUser, getCmsUsers, getCmsAdmin, destroyAdmin, updateCmsAdmin, find };