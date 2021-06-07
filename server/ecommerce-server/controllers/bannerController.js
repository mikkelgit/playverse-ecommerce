const { Banner } = require('../models')

class BannerController {
    static read(req, res, next) {
        Banner.findAll({
            order: [["createdAt", "ASC"]]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static create(req, res, next) {
        const { title, status, image_url } = req.body
        Banner.create({
            title,
            status,
            image_url
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static replace(req, res, next) {
        const { title, status, image_url } = req.body
        Banner.findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            if (!data) {
                next({ status: 400, message: "Banner Not Found" })
            } else {
                data.title = title
                data.status = status
                data.image_url = image_url
                return data.save()
            }
        })
        .then(data => {
            res.status(200).json({ message: "Banner Updated" })
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        const { status } = req.body
        Banner.findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            if (!data) {
                next({ status: 400, message: "Banner Not Found" })
            } else {
                data.status = status
                return data.save()
            }
        })
        .then(data => {
            res.status(200).json({ message: "Banner Updated" })
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Banner.findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            if (!data) {
                next({ name:"NotFound", message: "Banner Not Found" })
            } else {
                return data.destroy()
            }
        })
        .then(data => {
            res.status(200).json({ message: "Banner deleted" })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = BannerController