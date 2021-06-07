const { Category } = require('../models')

class CategoryController {
    static read(req, res, next) {
        Category.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next) {
        const { name } = req.body
        Category.create({
            name
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static replace(req, res, next) {
        const { name } = req.body
        Category.findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            if (!data) {
                next({ name:"NotFound", message: "Category not found" })
            } else {
                data.name = name
                return data.save()
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Category.findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            if (!data) {
                next({ name:"NotFound", message: "Category not found" })
            } else {
                return data.destroy()
            }
        })
        .then(data => {
            res.status(200).json({ message: "Category deleted" })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CategoryController