const { Wishlist, Product } = require('../models')

class WishlistController {
    static read(req, res, next) {
        Wishlist.findAll({
            where: {UserId: req.loggedUser.id},
            order: [["createdAt", "ASC"]],
            include: Product
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static create(req, res, next) {
        const { ProductId } = req.body
        Wishlist.findOne({
            where: {
                UserId: req.loggedUser.id,
                ProductId
            }
        })
        .then(data => {
            if (data) {
                next({ status: 400, message: "This product already in your wishlist" })
            } else {
                return Wishlist.create({
                    UserId: req.loggedUser.id,
                    ProductId
                })
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Wishlist.findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            if (!data) {
                next({ name:"NotFound", message: "Wishlist Not Found" })
            } else {
                return data.destroy()
            }
        })
        .then(data => {
            res.status(200).json({ message: "Wishlist deleted" })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = WishlistController