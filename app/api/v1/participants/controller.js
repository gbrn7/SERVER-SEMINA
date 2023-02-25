const {
    signUpParticipant,
    activateParticipant,
    signInParticipant,
    getAllEvents,
    getOneEvent,
    getAllOrders
} = require('../../../services/mongoose/participant');
const { StatusCodes } = require('http-status-codes');

const signUp = async(req, res, next) => {
    try {
        const result = await signUpParticipant(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}
const signIn = async(req, res, next) => {
    try {
        const result = await signInParticipant(req);

        res.status(StatusCodes.CREATED).json({
            data: { token: result },
        });
    } catch (error) {
        next(error)
    }
}
const getAllLandingPage = async(req, res, next) => {
    try {
        const result = await getAllEvents(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}
const getDashboard = async(req, res, next) => {
    try {
        const result = await getAllOrders(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}
const getDetailLandingPage = async(req, res, next) => {
    try {
        const result = await getOneEvent(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}
const activeParticipant = async(req, res, next) => {
    try {
        const result = await activateParticipant(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUp,
    activeParticipant,
    signIn,
    getAllLandingPage,
    getDashboard,
    getDetailLandingPage
}