const { getAllCategories, getOneCategories, createCategories, updateCategories, deleteCategories } = require('../../../services/mongoose/categories')
const { StatusCodes } = require('http-status-codes');


const index = async (req, res, next) => {
    try {
        const result = await getAllCategories(req);
        // if (!result) return res.status(404).json({ message: "Id categories is not valid" })
        //if conditional above is true so the command bellow is not to be execute
        // console.log('result controller')
        // console.log(result)
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createCategories(req); //create with model and flled with req
        res.status(StatusCodes.CREATED).json({
            data: result,
        })
    } catch (err) {
        next(err);
    }
}; //'next' is handle for error


const find = async (req, res, next) => {
    try {

        const result = await getOneCategories(req);
        // if (!result) return res.status(404).json({ message: "Id categories is not valid" })
        //if conditional above is true so the command bellow is not to be execute

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateCategories(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}


const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteCategories(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    index,
    create,
    find,
    update,
    destroy,
}