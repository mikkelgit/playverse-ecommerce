const express = require('express')
const CategoryController = require('../controllers/categoryController')
const adminAuthorization = require('../middlewares/adminAuthorization')
const authentication = require('../middlewares/authentication')
const categoryRouter = express.Router()

categoryRouter.get('/', CategoryController.read)
categoryRouter.use(authentication)
categoryRouter.post('/', adminAuthorization, CategoryController.create)
categoryRouter.put('/:id', adminAuthorization, CategoryController.replace)
categoryRouter.delete('/:id', adminAuthorization, CategoryController.delete)

module.exports = categoryRouter