const Participant = require('../../api/v1/participants/model');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors');
const { createTokenParticipant, createJWT } = require('../../utils');
const { otpMail } = require('../../services/email')

const signUpParticipant = async(req) => {
    const { firstname, lastname, email, password, role } = req.body;

    //if email and status not active
    let result = Participant.findOne({
        email,
        status: 'not active',
    })

    if (result) {
        result.firstname = firstname,
            result.lastname = lastname,
            result.email = email,
            result.role = role,
            result.password = password,
            result.otp = Math.floor(Math.random() * 9999);
        await result.save();
    } else {
        result = await Participant.create({
            firstname,
            lastname,
            email,
            password,
            role,
            otp: Math.floor(Math.random() * 9999),
        });
    }

    await otpMail(email, result);

    delete result._doc.password;
    delete result._doc.otp;

    return result;

}

module.exports = { signUpParticipant };