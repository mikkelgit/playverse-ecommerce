const { Product, Category } = require('../models');

class ProductController {
    static newProduct(req, res, next) {
        const { name, image_url, price, stock, CategoryId } = req.body
        Product.create({
            name: name,
            image_url: image_url,
            price: price,
            stock: stock,
            CategoryId: CategoryId,
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static showProduct(req, res, next) {
        Product.findAll({
            order: [["id", "ASC"]],
            include: Category
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static showProductDetail(req, res, next) {
        Product.findOne({
            where: {id: req.params.id}
        })
            .then(data => {
                if (!data) {
                    next({ name:"NotFound", message: "Product Not Found" })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static replaceProduct(req, res, next) {
        const { name, image_url, price, stock, CategoryId } = req.body
        Product.update({
            name: name || "",
            image_url: image_url || "",
            price: price || "",
            stock: stock || "",
            CategoryId: CategoryId || ""
        }, {
            where: {id: req.params.id},
            returning: true
        })
            .then(data => {
                if (!data[0]) {
                    next({ name:"NotFound", message: "Product Not Found" })
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        const { stock } = req.body
        Product.findOne({
            where: {id: req.params.id}
        })
            .then(data => {
                if (!data) {
                    next({ name:"NotFound", message: "Product Not Found" })
                } else {
                    data.stock = stock
                    return data.save()
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        Product.findOne({
            where: {id: req.params.id}
        })
            .then(data => {
                if (!data) {
                    next({ name:"NotFound", message: "Product Not Found" })
                } else {
                    return data.destroy()
                }
            })
            .then(data => {
                res.status(200).json({ message: "Product deleted successfully" })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController