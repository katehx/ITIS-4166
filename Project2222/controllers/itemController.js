const model = require('../models/item');

exports.index = (req, res) => {
    let items = model.find();
    res.render('./item/index', {items});
};

exports.new = (req, res) => {
    res.render('./item/new');
};
    
exports.create = (req, res) => {
    let item = req.body;
    model.save(item);
    res.redirect('/items');
};
    
exports.show = (req, res) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./item/show', {item});
    } else {
        res.status(404).send('Cannot find item with id ' + id);
    }
};
    
exports.edit = (req, res) => {
    
};
    
exports.update = (req, res) => {

};
    
exports.delete = (req, res) => {
    
};