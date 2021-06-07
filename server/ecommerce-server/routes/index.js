const express = require('express')
const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController');
const CartController = require('../controllers/cartController');
const authentication = require('../middlewares/authentication');
const userAuthorization = require('../middlewares/userAuthorization');
const adminAuthorization = require('../middlewares/adminAuthorization');
const bannerRouter = require('./bannerRouter');
const categoryRouter = require('./categoryRouter');
const wishlistRouter = require('./wishlistRouter');
const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use('/banners', bannerRouter)
router.use('/categories', categoryRouter)

router.get('/products', ProductController.showProduct)
router.get('/products/:id', ProductController.showProductDetail)

router.use(authentication)

// User
router.get('/cart', CartController.showCart)
router.post('/cart', CartController.addToCart)
router.post('/checkout', CartController.checkout)

router.use('/wishlists', wishlistRouter)

// User Personal Cart
router.patch('/cart/:id', userAuthorization, CartController.updateCart)
router.delete('/cart/:id', userAuthorization, CartController.deleteCart)


// Admin
router.use(adminAuthorization)
router.post('/products', ProductController.newProduct)
router.put('/products/:id', ProductController.replaceProduct)
router.patch('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)
router.get('/customer-carts', CartController.showAllCart)

module.exports = router