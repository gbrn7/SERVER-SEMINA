const Participants = require('../../api/v1/participants/model');
const Events = require('../../api/v1/events/model');
const Orders = require('../../api/v1/order/model');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors');
const { createTokenParticipant, createJWT } = require('../../utils');
const { otpMail } = require('../../services/email')

const signUpParticipant = async(req) => {
    const { firstName, lastName, email, password, role } = req.body;

    //if email and status not active
    let result = await Participants.findOne({
        email,
        status: 'not active',
    })

    if (result) {
        result.firstName = firstName,
            result.lastName = lastName,
            result.email = email,
            result.role = role,
            result.password = password,
            result.otp = Math.floor(Math.random() * 9999);
        await result.save();
    } else {
        result = await Participants.create({
            firstName,
            lastName,
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

};

const signInParticipant = async(req) => {
    const { email, password } = req.body;

    if (!email || !password) throw new BadRequestError("Please filled email and password field");

    const result = await Participants.findOne({ email });

    if (!result) throw new UnauthorizedError("Your Email is'nt registered");

    if (result.status === 'not active') {
        throw new UnauthorizedError('Your Email is not yet active')
    };

    const isPasswordCorrect = result.comparePassword(password);
    //the line above is used for password verify

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = createJWT({ payload: createTokenParticipant(result) });

    return token;
};

const getAllEvents = async(req) => {
    const result = await Events.find({ statusEvent: 'Published' })
        .populate('category')
        .populate('image')
        .select('_id title date tickets venueName');

    if (!result) throw new NotFoundError('The Published Event Not Found');

    return result;

}
const getOneEvent = async(req) => {
    const { id } = req.params;
    const result = await Events.findOne({ _id: req.params.id })
        .populate('category')
        .populate('image')
        .select('_id title date tickets venueName');

    if (!result) throw new NotFoundError(`The Published Event with id ${id} not found`);

    return result;

}
const getAllOrders = async(req) => {
    console.log(req.participant.id);
    const result = await Orders.find({ participant: req.participant.id });
    console.log(result);
    if (!result || result.length === 0) throw new NotFoundError('The order is not found ');

    return result;

}

const activateParticipant = async(req) => {
    const { otp, email } = req.body;
    const check = await Participants.findOne({ email });

    if (!check) throw new NotFoundError('Your Email is not registered');

    if (check && check.otp != otp) throw new BadRequestError('Your otp code is not registerd');

    const result = await Participants.findByIdAndUpdate(check._id, {
        status: 'active'
    }, { new: true, runValidators: true })

    delete result._doc.password;
    delete result._doc.otp;

    return result;
}


module.exports = {
    signUpParticipant,
    activateParticipant,
    signInParticipant,
    getAllEvents,
    getOneEvent,
    getAllOrders
};