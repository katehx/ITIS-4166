const Story = require('../models/story')
const { Types } = require('mongoose');

// check if storyId is valid
exports.validateId = (req, res, next) => {
    const id = req.params.id;
    if (Types.ObjectId.isValid(id)) {
        return next();
    } else {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
};