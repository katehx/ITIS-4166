const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// check if itemId is valid
exports.validateId = (req, res, next) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        return next();
    } else {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
};

// Signup validation
exports.validateSignUp = [
    body('firstName').notEmpty().withMessage('First name is required').trim().escape(),
    body('lastName').notEmpty().withMessage('Last name is required').trim().escape(),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail().trim().escape(),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters')
];

// Login validation
exports.validateLogIn = [
    body('email', 'Invalid email').isEmail().normalizeEmail().trim().escape(),
    body('password', 'Password must be between 8 and 64 characters').isLength({ min: 8, max: 64 })
];

// Item creation/edit validation
exports.validateItem = [
    body('title', 'Title is required').notEmpty().trim().escape(),
    body('condition', 'Invalid condition').isIn(['New', 'Like New', 'Used - Good', 'Used - Fair', 'Damaged']),
    body('price', 'Price must be greater than 0').isFloat({ gt: 0 }),
    body('details', 'Details must be at least 10 characters').isLength({ min: 10 }).trim().escape()
];

// Offer validation
exports.validateOffer = [
    body('amount').notEmpty().withMessage('Amount is required').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0').trim().escape()
];

// Result handling
exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(err => req.flash('error', err.msg));
        return res.redirect('back');
    }
    next();
};
