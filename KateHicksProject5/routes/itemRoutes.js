const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');
const { isLoggedIn, isOwner } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');

//GET /items: send all items to the user
router.get('/', controller.index);

//GET /items/new: send html form for creating a new item
router.get('/new', isLoggedIn, controller.new);

//POST /items: create a new item
router.post('/', isLoggedIn, controller.create);

//GET /items/:id: send details of item identified by id
router.get('/:id', validateId, controller.show);

//GET /items/:id/edit: send html form for editing an existing item
router.get('/:id/edit', isLoggedIn, validateId, isOwner, controller.edit);

//PUT /items/:id: update the item identified by id
router.put('/:id', isLoggedIn, validateId, isOwner, controller.update);

//DELETE /items/:id: delete the item identified by id
router.delete('/:id', isLoggedIn, validateId, isOwner, controller.delete);



const offerRoutes = require('./offerRoutes');
router.use('/:id/offers', validateId, offerRoutes); // Nested: /items/:id/offers



module.exports = router;