const Orders = require('../../api/v1/order/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllOrders = async(req) => {
    const { limit = 10, page = 1, startDate, endDate } = req.query;

    let condition = {};


    if (req.user.role !== 'owner') {
        condition = {...condition, 'historyEvent.organizer': req.user.organizer }
    };


    if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        condition = {
            ...condition,
            date: {
                $gt: start,
                $lt: end,
            }
        }
    }

    const result = await Orders.find(condition)
        // .populate({ path: 'event', match: { organizer: req.user.organizer } })
        .limit(limit)
        .skip(limit * (page - 1));

    //if use populate event path and will filter just order with organizer equal with req.user.organizer
    //use the filter in bellow
    // if (req.user.role !== 'owner') {
    //     for (let i = 0; i < result.length; i++) {
    //         if (result[i].event === null) {
    //             result.splice(i, 1);
    //             i--;
    //         }
    //     }

    // }

    const count = await Orders.countDocuments(condition);

    return { order: result, pages: Math.ceil(count / limit), total: count };
}

module.exports = { getAllOrders };