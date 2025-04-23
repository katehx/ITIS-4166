// const Story = require('../models/item')
// const { Types } = require('mongoose');
// const { body } = require('express-validator');

// // check if itemId is valid
// exports.validateId = (req, res, next) => {
//     const id = req.params.id;
//     if (Types.ObjectId.isValid(id)) {
//         return next();
//     } else {
//         let err = new Error('Invalid item id');
//         err.status = 400;
//         return next(err);
//     }
// };

// exports.validateSignUp = [
//     body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
//     body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
//     body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
//     body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({ min: 8, max: 64 })
// ];

const { body, validationResult } = require('express-validator');

// ID validation
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    return next();
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
    body('email').isEmail().withMessage('Invalid email').normalizeEmail().trim().escape(),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters')
];

// Item creation/edit validation
exports.validateItem = [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('condition').isIn(['New', 'Like New', 'Used - Good', 'Used - Fair', 'Damaged']).withMessage('Invalid condition'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('details').isLength({ min: 10 }).withMessage('Details must be at least 10 characters').trim().escape()
];

// Offer validation
exports.validateOffer = [
    body('amount').notEmpty().withMessage('Amount is required')
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
        .trim().escape()
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
