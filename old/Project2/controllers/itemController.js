exports.index = (req, res) => {
    let items = model.find();
    res.render('./items/index', { pageTitle: "Browse Items", items });
};

exports.new = (req, res) => {
    res.render('./items/new', { pageTitle: "Sell an Item" });
};

exports.create = (req, res) => {
    let item = req.body;
    model.save(item);
    res.redirect('/items');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./items/show', { pageTitle: item.title, item });
    } else {
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./items/edit', { pageTitle: "Edit " + item.title, item });
    } else {
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let item = req.body;
    let id = req.params.id;

    if(model.updateById(id, item)) {
        res.redirect('/items/' + id);
    } else {
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);    
    }
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
