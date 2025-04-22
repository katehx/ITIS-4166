const Offer = require('../models/offer');
const Item = require('../models/item');

// POST /items/:id/offers
exports.create = async (req, res, next) => {
    const itemId = req.params.id;
    const userId = req.session.user;
    const { amount } = req.body;

    try {
        const item = await Item.findById(itemId);

        if (!item) {
            req.flash('error', 'Item not found');
            return res.redirect('/items');
        }

        if (item.seller.equals(userId)) {
            const err = new Error("You can't make offers on your own item");
            err.status = 401;
            return next(err);
        }

        const offer = new Offer({
            amount,
            user: userId,
            item: itemId
        });

        await offer.save();

        // update item
        item.totalOffers = (item.totalOffers || 0) + 1;
        item.highestOffer = Math.max(item.highestOffer || 0, parseFloat(amount));
        await item.save();

        req.flash('success', 'Offer submitted!');
        res.redirect(`/items/${itemId}`);
    } catch (err) {
        next(err);
    }
};

// GET /items/:id/offers
exports.viewOffers = async (req, res, next) => {
    const itemId = req.params.id;
    const userId = req.session.user;

    try {
        const item = await Item.findById(itemId);
        if (!item) {
            req.flash('error', 'Item not found');
            return res.redirect('/users/profile');
        }

        if (!item.seller.equals(userId)) {
            const err = new Error('Unauthorized to view offers for this item');
            err.status = 401;
            return next(err);
        }

        const offers = await Offer.find({ item: itemId }).populate('user', 'firstName lastName');
        res.render('offer/offers', { item, offers });
    } catch (err) {
        next(err);
    }
};

// POST /items/:id/offers/:offerId/accept
exports.accept = async (req, res, next) => {
    const itemId = req.params.id;
    const offerId = req.params.offerId;
    const userId = req.session.user;

    try {
        const item = await Item.findById(itemId);
        if (!item) {
            req.flash('error', 'Item not found');
            return res.redirect('/users/profile');
        }

        if (!item.seller.equals(userId)) {
            const err = new Error('Unauthorized to accept offer for this item');
            err.status = 401;
            return next(err);
        }

        // Mark item as inactive
        item.active = false;
        await item.save();

        // Accept the chosen offer
        await Offer.findByIdAndUpdate(offerId, { status: 'accepted' });

        // Reject all other offers on the same item
        await Offer.updateMany(
            { item: itemId, _id: { $ne: offerId } },
            { $set: { status: 'rejected' } }
        );

        req.flash('success', 'Offer accepted and item marked as sold.');
        res.redirect(`/items/${itemId}/offers`);
    } catch (err) {
        next(err);
    }
};
