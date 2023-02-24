const { signUpParticipant } = require('../../../services/mongoose/participant');
const { StatusCodes } = require('http-status-codes');

const signup = async(req, res, next) => {
    try {
        const result = await signUpParticipant(req);

        result.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { signup }