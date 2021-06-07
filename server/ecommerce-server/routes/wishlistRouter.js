const express = require('express')
const wishlistAuthorization = require('../middlewares/wishlistAuthorization');
const WishlistController = require('../controllers/wishlistController')
const wishlistRouter = express.Router()

wishlistRouter.get('/', WishlistController.read)
wishlistRouter.post('/', WishlistController.create)
wishlistRouter.delete('/:id', wishlistAuthorization, WishlistController.delete)

module.exports = wishlistRouter