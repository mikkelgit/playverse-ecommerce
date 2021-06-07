const { Cart, Product, User } = require('../models');

class CartController {
    static showCart(req, res, next) {
        Cart.findAll({
            where: {UserId: req.loggedUser.id},
            include: Product,
            order: [["createdAt", "ASC"]]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static showAllCart(req, res, next) {
        Cart.findAll({
            include: User,
            order: [["createdAt", "ASC"]]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static async addToCart(req, res, next) {
        try {
            const { ProductId } = req.body
            const getProduct = await Product.findByPk(ProductId)
            if (!getProduct) {
                throw { name: "NotFound", status: 404, message: "Product not found" }
            } else {
                if (getProduct.stock > 0) {
                    let findCart = await Cart.findOne({
                        where: {
                            UserId: req.loggedUser.id,
                            ProductId,
                            done: false
                        },
                        include: Product
                    })

                    let currentQuantity
                    if (findCart) {
                        currentQuantity = findCart.quantity + 1
                        if (findCart.Product.stock >= currentQuantity) {
                            findCart.quantity = currentQuantity
                            await findCart.save()
                        } else {
                            throw { status: 400, message: "Not enough item" }
                        }
                    } else {
                        currentQuantity = 1
                        await Cart.create({
                            UserId: req.loggedUser.id,
                            ProductId,
                            quantity: currentQuantity
                        })
                    }
                    res.status(200).json({ message: "Item added to cart" })
                } else {
                    throw { status: 400, message: "Not enough item" }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static updateCart(req, res, next) {
        const { newQuantity } = req.body
        Cart.findOne({
            where: {
                id: req.params.id
            },
            include: Product
        })
        .then(data => {
            if (!data) {
                next({ status:404, message: "Cart not found" })
            } else {
                if (data.Product.stock >= newQuantity) {
                    if (newQuantity) {
                        data.quantity = newQuantity
                        return data.save()
                    } else {
                        next({ status: 400, message: "Product quantity cannot be 0" })
                    }
                } else {
                    next({ status: 400, message: "Not enough item" })
                }
            }
        })
        .then(data => {
            res.status(200).json({ message: "Cart updated" })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteCart(req, res, next) {
        Cart.findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            if (!data) {
                next({ name:"NotFound", message: "Cart not found" })
            } else {
                return data.destroy()
            }
        })
        .then(data => {
            res.status(200).json({ message: "Item removed from your cart" })
        })
        .catch(err => {
            next(err)
        })
    }

    static checkout(req, res, next) {
        let updateCartProm = []
        let updateProductProm = []
        Cart.findAll({
            where: {
                UserId: req.loggedUser.id,
                done: false
            },
            include: Product,
        })
        .then(data => {
            data.forEach(el => {
                let curStock = el.Product.stock - el.quantity
                let totalAmount = el.Product.price * el.quantity
                updateCartProm.push(Cart.update({
                    done: true,
                    amount: totalAmount
                }, {
                    where: {id: el.id}
                }))

                updateProductProm.push(Product.update({
                    stock: curStock
                }, {
                    where: {id: el.Product.id}
                }))
            });
            return Promise.all(updateCartProm)
        })
        .then(data => {
            return Promise.all(updateProductProm)
        })
        .then(data => {
            res.status(200).json({ message: "Cart Checked Out" })
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = CartController