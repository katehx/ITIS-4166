const Story = require('../models/item')
const { Types } = require('mongoose');

// check if itemId is valid
exports.validateId = (req, res, next) => {
    const id = req.params.id;
    if (Types.ObjectId.isValid(id)) {
        return next();
    } else {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
};