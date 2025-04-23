const Offer = require('../models/offer');

const Item = require('../models/item');

// POST /items/:id/offers - create a new offer
exports.create = (req, res, next) => {
    const itemId = req.params.id;
    const userId = req.session.user;

    // Redirect if not logged in
    if (!userId) {
        req.flash('error', 'You must be logged in to make an offer');
        return res.redirect('/users/login');
    }


    const { amount } = req.body;

    Item.findById(itemId)
        .then(item => {
            if (!item) {
                req.flash('error', 'Item not found');
                return res.redirect('/items');
            }

            if (item.seller.toString() === userId) {
                const err = new Error("You can't make offers on your own item");
                err.status = 401;
                return next(err);
            }

            const offer = new Offer({ amount, user: userId, item: itemId });

            return offer.save()
                .then(() => {
                    item.totalOffers = (item.totalOffers || 0) + 1;
                    item.highestOffer = Math.max(item.highestOffer || 0, parseFloat(amount));
                    return item.save();
                })
                .then(() => {
                    req.flash('success', 'Offer submitted!');
                    res.redirect(`/items/${itemId}`);
                });
        })
         .catch(err => next(err));
};



// GET /items/:id/offers - view all offers for an item
exports.viewOffers = (req, res, next) => {
    const itemId = req.params.id;
    const userId = req.session.user;

    Item.findById(itemId)
        .then(item => {
            if (!item) {
                req.flash('error', 'Item not found');
                return res.redirect('/users/profile');
            }

            if (item.seller.toString() !== userId) {
                const err = new Error('You are not authorized to view offers for this item');
                err.status = 401;
                return next(err);
            }

            return Offer.find({ item: itemId })
                .populate('user', 'firstName lastName')
                .then(offers => {
                    res.render('offer/offers', { item, offers });
                });
        })
        .catch(err => next(err));
};

// POST /items/:id/offers/:offerId/accept - accept one offer, reject others
exports.accept = (req, res, next) => {
    const itemId = req.params.id;
    const offerId = req.params.offerId;
    const userId = req.session.user;

    if (!req.session.user) {
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }

    Item.findById(itemId)
        .then(item => {
            if (!item) {
                req.flash('error', 'Item not found');
                return res.redirect('/users/profile');
            }

            if (item.seller.toString() !== userId) {
                const err = new Error('You are not authorized to accept offers for this item');
                err.status = 401;
                return next(err);
            }

            item.active = false;
            return item.save()
                .then(() => Offer.findByIdAndUpdate(offerId, { status: 'accepted' }))
                .then(() => Offer.updateMany(
                    { item: itemId, _id: { $ne: offerId } },
                    { $set: { status: 'rejected' } }
                ))
                .then(()=> {
                    req.flash('success', 'Offer accepted and item marked as sold.');
                    res.redirect(`/items/${itemId}/offers`);
                });
        })
        .catch(err => next(err));
};