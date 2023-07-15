const Users = require('../../api/v1/users/model');
const Organizer = require('../../api/v1/organizer/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createOrganizer = async (req) => {
    const { organizer, role, email, password, confirmPassword, name } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError('the confirm password and password is not match');
    }

    const result = await Organizer.create({ organizer });


    const users = await Users.create({
        email,
        name,
        password,
        role,
        organizer: result._id,
    })


    delete users._doc.password; //to delete the password field before return

    return users;
}

const UpdateOrganizer = async (req) => {
    const { id } = req.params;
    const { organizer, role, email, password, confirmPassword, name } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError('the confirm password and password is not match');
    }

    //Checking in database
    const checkid = await Users.findOne({ _id: id });

    //if null throw the below message
    if (!checkid) throw new NotFoundError(`organizer with id ${id} not found`);

    // Checking in database 
    const check = await Organizer.findOne({ organizer, _id: { $ne: checkid.organizer } });

    // if the input data is already in database then throw error 'BadRequestError'
    if (check) throw new BadRequestError(`The organizer name is duplicate with other`);

    const result1 = await Organizer.findByIdAndUpdate({ _id: checkid.organizer },
        { organizer },
        { new: true, runValidators: true });

    if (!result1) throw new NotFoundError(`The new name of organizer is already inserted`);

    const result2 = await Users.findByIdAndUpdate({ _id: id },
        { role, email, password, confirmPassword, name },
        { new: true, runValidators: true })
        .populate({ path: 'organizer' });

    if (!result2) throw new NotFoundError(`Internal Servel Error`);

    return result2;
}

const getOneOrganizer = async (req) => {
    const { id } = req.params;

    const result = await Users.findOne({ _id: id });
}

const getAllOrganizers = async (req) => {
    const { keyword, limit, page } = req.query;

    let condition = { role: 'organizer' };

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } }
    }

    const result = await Users.find(condition)
        .limit(limit)
        .skip(limit * (page - 1));

    if (result.length == 0) throw new NotFoundError(`Not found the organizer`);

    const count = await Users.countDocuments(condition);

    return { organizers: result, pages: Math.ceil(count / limit), total: count };
}

const createUsers = async (req) => {
    const { role, email, password, confirmPassword, name } = req.body;


    if (password !== confirmPassword) {
        throw new BadRequestError('the confirm password and password is not match');
    }

    const users = await Users.create({
        email,
        name,
        password,
        role,
        organizer: req.user.organizer,
    })

    delete users._doc.password; //to delete the password field before return

    return users;
}

const getAllUsers = async () => {
    const result = await Users.find();

    if (result.length == 0) throw new NotFoundError(`Not found the categories`);

    return result;
}

const getAllAdmin = async (req) => {
    const { keyword } = req.query;

    let condition = { organizer: req.user.organizer, role: 'admin' };

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } }
    }

    const result = await Users.find(condition);

    if (result.length == 0) throw new NotFoundError(`Not found the admin for oranizer ${condition.organizer}`);

    return result;
}

const deleteAdmin = async (req) => {
    const { id } = req.params;

    const result = await Users.findOne({
        _id: id,
        organizer: req.user.organizer
    });

    if (!result) throw new NotFoundError(`The id Admin ${id} is not found`);

    await result.remove();

    return result;
}

const updateAdmin = async (req) => {
    const { id } = req.params;
    const { name, email, password, confirmPassword } = req.body;


    if (password !== confirmPassword) {
        throw new BadRequestError('the confirm password and password is not match');
    }

    //Checking in database
    const checkid = await Users.findOne({ _id: id, organizer: req.user.organizer });

    //if null throw the below message
    if (!checkid) throw new NotFoundError(`Admin with id ${id} not found`);

    const result = await Users.findByIdAndUpdate({ _id: id }, {
        name,
        email,
        password,
    }, { new: true, runValidators: true });

    if (!result) throw new NotFoundError(`Internal server error`);


    return result;
}

const getOneUser = async (req) => {
    const { id } = req.params; //params is paramater that sended by router and must the variable must have the same name with paramater name in router
    // Checking in database 
    const result = await Users.findOne({ _id: id })
        .populate({ path: 'organizer' });

    // if the input data is already in database then throw error 'BadRequestError'
    if (!result) throw new NotFoundError(`The id Category ${id} is not found`);

    delete result._doc.password;

    return result;
}

module.exports = {
    createOrganizer,
    createUsers,
    UpdateOrganizer,
    getAllUsers,
    getAllAdmin,
    deleteAdmin,
    updateAdmin,
    getOneUser,
    getAllOrganizers
};