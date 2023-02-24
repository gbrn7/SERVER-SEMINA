const { BadRequestError, NotFoundError } = require('../../errors/index');
const { checkingImages } = require('./images');
const { checkingCategories } = require('./categories');
const { checkingTalents } = require('./talents');
const Events = require('../../api/v1/events/model');
const { populate } = require('../../api/v1/events/model');

const getAllEvents = async(req) => {
    const { keyword, category, talent, status } = req.query;

    let condition = { organizer: req.user.organizer };

    if (keyword) {
        condition = {...condition, title: { $regex: keyword, $options: 'i' } }
    }
    if (category) {
        condition = {...condition, category: category };
    }
    if (talent) {
        condition = {...condition, talent: talent }
    }
    if (['Draft', 'Published'].includes(status)) {
        condition = {...condition, statusEvent: status }
    }



    const result = await Events.find(condition)
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'image',
            select: '_id name'
        })
        .populate({
            path: 'talent',
            select: '_id name',
            populate: { path: 'image', select: '_id name' },
        });

    return result;
}

const createEvent = async(req) => {
    const {
        title,
        date,
        about,
        tagline,
        keypoint,
        venueName,
        statusEvent,
        tickets,
        category,
        image,
        talent
    } = req.body;

    await checkingCategories(category);
    await checkingImages(image);
    await checkingTalents(talent);
    const check = await Events.findOne({ title });

    if (check) throw new BadRequestError(`The event with title ${title} is already exist`);

    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        keypoint,
        venueName,
        statusEvent,
        tickets,
        category,
        image,
        talent,
        organizer: req.user.organizer,
    });

    return result;
}

const getOneEvent = async(req) => {
    const { id } = req.params;
    const result = await Events.findOne({ _id: id, organizer: req.user.organizer })
        .populate({ path: 'image', select: '_id name' })
        .populate({ path: 'category', select: "_id name" })
        .populate({ path: 'talent', select: '_id name', populate: { path: 'image', select: '_id name' } });
    console.log('test1');

    if (!result) throw new NotFoundError(`Event with id ${id} not found`);

    return result;
};

const updateEvent = async(req) => {
    const { id } = req.params;
    const {
        title,
        date,
        about,
        tagline,
        keypoint,
        venueName,
        statusEvent,
        tickets,
        category,
        image,
        talent
    } = req.body;

    await checkingImages(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    const checkid = await Events.findOne({ _id: id, organizer: req.user.organizer });

    if (!checkid) throw new NotFoundError(`Event with id ${id} not found`);

    const check = await Event.findOne({ title, _id: { $ne: id }, organizer: req.user.organizer });

    if (check) throw new BadRequestError(`The Event ${title} is already exist`);

    const result = await Event.findByIdAndUpdate(id, {
        title,
        date,
        about,
        tagline,
        keypoint,
        venueName,
        statusEvent,
        tickets,
        category,
        image,
        talent,
        organizer: req.user.organizer
    }, { new: true, runValidators: true });

    return result;
};

const deleteEvent = async(req) => {
    const { id } = req.params;

    const result = await Events.findOne({
        _id: id,
        organizer: req.user.organizer
    });

    if (!result) throw new NotFoundError(`Event with id ${id} not found`);

    await result.remove();

    return result;
};

const updateStatusEvent = async(req) => {
    const { id } = req.params;
    const { statusEvent } = req.body;

    if (!['Draft', 'Published'].includes(statusEvent))
        throw new BadRequestError("statusEvent is only Draft or Published")

    const result = await Events.findOne({ _id: id, organizer: req.user.organizer });

    if (!result) throw new NotFoundError(`the event with id ${id} is not found`);

    result.statusEvent = statusEvent;

    await result.save();

    return result;
}

module.exports = {
    getAllEvents,
    createEvent,
    getOneEvent,
    updateEvent,
    deleteEvent,
    updateStatusEvent
}