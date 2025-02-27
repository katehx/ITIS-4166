const model = require('../models/item');
const { upload } = require('../middleware/fileUpload');
const { v4: uuidv4 } = require('uuid'); 

exports.index = (req, res) => {
    let items = model.find().sort((a, b) => a.price - b.price);

    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        
        items = items.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.details.toLowerCase().includes(searchTerm)
        );
    }

    res.render('./item/index', { items });
};

exports.new = (req, res) => {
    res.render('./item/new');
};
    
exports.create = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err.message);
        }

        let item = req.body;
        item.id = uuidv4(); 
        item.image = '/images/' + req.file.filename;

        model.save(item);
        res.redirect('/items');
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./item/show', {item});
    } else {
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);    }
};
    
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./item/edit', {item});
    } else {
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);
    }
};
    
exports.update = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err.message);
        }

        let id = req.params.id;
        let updatedItem = req.body;
        let existingItem = model.findById(id);

        if (!existingItem) {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            return next(err);
        }

        // save the old image if no new image is uploaded
        updatedItem.image = req.file ? '/images/' + req.file.filename : existingItem.image;

        // Ensure all fields are correctly updated
        updatedItem.title = updatedItem.title || existingItem.title;
        updatedItem.seller = updatedItem.seller || existingItem.seller;
        updatedItem.condition = updatedItem.condition || existingItem.condition;
        updatedItem.price = updatedItem.price || existingItem.price;
        updatedItem.details = updatedItem.details || existingItem.details;

        if (model.updateById(id, updatedItem)) {
            res.redirect('/items/' + id);
        } else {
            let err = new Error('Error updating item.');
            err.status = 500;
            next(err);
        }
    });
};

    
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/items');
    } else {
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);    
    }
};