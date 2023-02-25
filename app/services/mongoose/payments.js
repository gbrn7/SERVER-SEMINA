const Payments = require('../../api/v1/payments/model');
const { checkingImages } = require('./images');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllPayments = async(req) => {
    const condition = { organizer: req.user.organizer };
    const result = await Payments.find(condition)
        .populate({
            path: 'image',
            select: '_id name',
        })
        .select('_id type status image');

    if (!result || result.length === 0) throw new NotFoundError(`Payment not found`)

    return result;
}

const createPayments = async(req) => {
    const { type, image } = req.body;

    await checkingImages(image);

    const check = await Payments.findOne({ type, organizer: req.user.organizer });

    if (check) throw new BadRequestError('The payments methods is already exist');

    const result = await Payments.create({
        type,
        image,
        organizer: req.user.organizer,
    })

    return result;
}

const getOnePayments = async(req) => {
    const { id } = req.params;
    const organizer = req.user.organizer
    const result = await Payments.findOne({ _id: id, organizer })
        .populate({
            path: 'image',
            select: '_id name',
        })
        .select('_id type status image');

    if (!result) throw new NotFoundError(`Payment with _id ${id} not found`)
    return result;
}

const updatePayments = async(req) => {
    const { id } = req.params;
    const { type, image } = req.body;

    await checkingImages(image);

    const check = await Payments.findOne({
        type,
        organizer: req.user.organizer,
        _id: { $ne: id },
    });

    if (check) throw new NotFoundError(`The payment id duplicate`);

    const result = await Payments.findOneAndUpdate({ _id: id }, { type, image, organizer: req.user.organizer }, { new: true, runValidators: true });

    if (!result) throw new NotFoundError(`Payment with _id ${id} not found`)

    return result;
}

const deletePayments = async(req) => {
    const { id } = req.params;

    const result = await Payments.findOne({ _id: id, organizer: req.user.organizer });

    if (!result) throw new NotFoundError(`Payment with id ${id} not found`);

    result.remove();

    return result;
}

const chekingPayments = async(id) => {
    const result = await Payments.findById(id);

    if (!result) throw new NotFoundError(`Payment with id ${id} not found`);

    return result;
}

module.exports = {
    getAllPayments,
    createPayments,
    getOnePayments,
    updatePayments,
    deletePayments,
    chekingPayments,
}