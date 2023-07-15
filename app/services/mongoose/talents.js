const { BadRequestError, NotFoundError } = require('../../errors');
const Talent = require('../../api/v1/talents/model');
const { checkingImages } = require('./images');


const getAllTalents = async (req) => {

    const { keyword, role } = req.query;

    let condition = { organizer: req.user.organizer };

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
    }
    if (role) {
        condition = { ...condition, role: { $regex: role, $options: 'i' } };
    }
    //the three dot is used for copy from previous value

    const result = await Talent.find(condition)
        .populate({
            path: 'image',
            select: '_id name'
        })
        .select('_id name role Image');

    return result;
}

const createTalents = async (req) => {
    const { name, role, image } = req.body;

    await checkingImages(image);

    const check = await Talent.findOne({ name, organizer: req.user.organizer, role: { $regex: role, $options: 'i' } });

    if (check) throw new BadRequestError(`${name} with role ${role} is already exist`);

    const result = await Talent.create({ name, role, image, organizer: req.user.organizer });

    return result;
};

const getOneTalents = async (req) => {
    const { id } = req.params;

    const result = await Talent.findOne({ _id: id, organizer: req.user.organizer })
        .populate({
            path: 'image',
            select: '_id name',
        }) //or populate({'image'})
        .select('_id name role image');

    if (!result) throw new NotFoundError(`talent with id : ${id} not found`);

    return result;

}

const updateTalents = async (req) => {
    const { id } = req.params;
    const { name, role, image } = req.body;

    await checkingImages(image);

    //Checking in database
    const checkid = await Talent.findOne({ _id: id, organizer: req.user.organizer });

    //if null throw the below message
    if (!checkid) throw new NotFoundError(`Event with id ${id} not found`);

    const check = await Talent.findOne({ name, organizer: req.user.organizer, role: { $regex: role, $options: 'i' } });


    if (check) throw new BadRequestError(`${name} with role ${role} is already exist`);

    const result = await Talent.findByIdAndUpdate(id, { name, role, organizer: req.user.organizer }, { new: true, runValidators: true });

    if (!result) throw new NotFoundError(`Talents with id : ${id} not found`);

    return result;
}

const deleteTalents = async (req) => {
    const { id } = req.params;

    const result = await Talent.findOne({ _id: id, organizer: req.user.organizer });

    if (!result) throw new NotFoundError(`Talents with id : ${id} not found`);

    await result.remove();

    return result;
}

const checkingTalents = async (id) => {
    const result = await Talent.findOne({ _id: id });

    if (!result) throw new BadRequestError(`Talent with id ${id} is not existed`);

    return result;
}

const getAllRole = async (req) => {

    let condition = { organizer: req.user.organizer };
    //the three dot is used for copy from previous value

    const result = await Talent.find(condition).distinct('role');

    return result;
}

module.exports = { getAllTalents, createTalents, getOneTalents, updateTalents, deleteTalents, checkingTalents, getAllRole };