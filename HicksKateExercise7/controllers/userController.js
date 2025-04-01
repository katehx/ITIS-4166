const User = require('../models/user');

// show sign-up form
exports.new = (req, res) => {
    res.render('./user/new');
};

// create new user account
exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then(() => res.redirect('/users/login'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/users/new');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email address has been used');
                return res.redirect('/users/new');
            }

            next(err);
        });
};

// show login form
exports.login = (req, res) => {
    res.render('user/login');
};

// process login
exports.authenticate = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id; // save user id to session
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/users/profile');
                        } else {
                            req.flash('error', 'Wrong password');
                            res.redirect('/users/login');
                        }
                    });
            } else {
                req.flash('error', 'Wrong email address');
                res.redirect('/users/login');
            }
        })
        .catch(err => next(err));
};

// show profile page
exports.profile = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to view your profile.');
        return res.redirect('/users/login');
    }

    User.findById(req.session.user)
        .then(user => {
            if (!user) {
                req.flash('error', 'User not found');
                return res.redirect('/users/login');
            }
            res.render('user/profile', { user });
        })
        .catch(err => next(err));
};

// logout and destroy session
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) return next(err);
        res.redirect('/users/login');
    });
};