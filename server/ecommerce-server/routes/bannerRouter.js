const express = require('express')
const bannerRouter = express.Router()
const BannerController = require('../controllers/bannerController')
const adminAuthorization = require('../middlewares/adminAuthorization')
const authentication = require('../middlewares/authentication')

bannerRouter.get('/', BannerController.read)
bannerRouter.use(authentication)
bannerRouter.post('/', adminAuthorization, BannerController.create)
bannerRouter.put('/:id', adminAuthorization, BannerController.replace)
bannerRouter.patch('/:id', adminAuthorization, BannerController.update)
bannerRouter.delete('/:id', adminAuthorization, BannerController.delete)

module.exports = bannerRouter

