const model = require('../models/item');
const { upload } = require('../middleware/fileUpload');

exports.index = (req, res, next) => {
    let query = {};

    if (req.query.search) {
        const search = req.query.search;
        query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { details: { $regex: search, $options: 'i' } }
            ]
        };
    }

    model.find(query).sort({ price: 1 }) 
        .then(items => res.render('./item/index', { items }))
        .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./item/new');
};
    
exports.create = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err.message);
        }

        // try catch blcok added for postman error handling 
        try {
            let item = new model({
                ...req.body,
                image: req.file ? '/images/' + req.file.filename : undefined
            }); //create a new item document

            item.save() //insert document into database
                .then(item => res.redirect('/items'))
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        err.status = 400;
                    }
                    next(err);
                });
        } catch (err) {
            next(err);
        }
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit hex string
    if (!id.match(/^[0-9a-fA-f]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(item => {
        if (item) {
            return res.render('./item/show', {item});
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err)
        }
    })
    .catch(err => next(err));
    
};
    
exports.edit = (req, res, next) => {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-f]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    
    model.findById(id)
    .then(item => {
        if (item) {
            return res.render('./item/edit', {item});
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err)
        }
    })
    .catch(err => next(err));
    
};
    
exports.update = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err.message);
        }

        const id = req.params.id;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            const err = new Error('Invalid item id');
            err.status = 400;
            return next(err);
        }

        model.findById(id)
            .then(existingItem => {
                if (!existingItem) {
                    const err = new Error('Cannot find an item with id ' + id);
                    err.status = 404;
                    return next(err);
                }

                // only update fields that were changed - keep old content for everything else
                existingItem.title = req.body.title || existingItem.title;
                existingItem.seller = req.body.seller || existingItem.seller;
                existingItem.condition = req.body.condition || existingItem.condition;
                existingItem.price = req.body.price !== '' ? Number(req.body.price) : existingItem.price;
                existingItem.details = req.body.details || existingItem.details;
                existingItem.image = req.file ? '/images/' + req.file.filename : existingItem.image;

                return existingItem.save();
            })
            .then(() => {
                res.redirect('/items/' + id);
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    err.status = 400;
                }
                next(err);
            });
    });
};
    
exports.delete = (req, res, next) => {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            const err = new Error('Invalid item id');
            err.status = 400;
            return next(err);
        }

    model.findByIdAndDelete(id, { userFindAndModify: false })
        .then(item => {
            if (item) {
                res.redirect('/items');
            } else {
                let err = new Error('Cannot find an item with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};