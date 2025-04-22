const Item = require('../models/item')

//check if user is a guest
exports.isGuest = (req, res, next) => {
    // console.log('SESSION STATE IS GUEST:', req.session);
    // console.log('COOKIES IS GUEST:', req.headers.cookie);
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are logged in already');
        return req.session.save(() => {
        res.redirect('/users/profile');
        });
    }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    //     console.log('SESSION STATE IS LOGGED IN:', req.session);
    // console.log('COOKIES IS LOGGED IN:', req.headers.cookie);
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to log in first');
        return req.session.save(() => {
        res.redirect('/users/login');
        });
    }
};

//check if user is author of the item
exports.isOwner = (req, res, next) => {
    let id = req.params.id;
    Item.findById(id)
        .then(item => {
            if (item) {
                if (item.seller == req.session.user) {
                    return next();
                } else {
                    let err = new Error('Unauthorized to access the resource');
                    err.status = 401;
                    return next(err);
                }
            } else { 
                let err = new Error('Cannot find a item with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};