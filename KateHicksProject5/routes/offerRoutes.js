const express = require('express');
const router = express.Router({ mergeParams: true });
const offerController = require('../controllers/offerController');
const { isLoggedIn } = require('../middlewares/auth');
const { validateOffer, validateResult } = require('../middlewares/validator');

// POST /items/:id/offers - make an offer
router.post('/', isLoggedIn, validateOffer, validateResult, offerController.create);

// GET /items/:id/offers - view all offers received for the item
router.get('/', isLoggedIn, offerController.viewOffers);

// POST /items/:id/offers/:offerId/accept - accept a specific offer
router.post('/:offerId/accept', isLoggedIn, offerController.accept);

module.exports = router;
