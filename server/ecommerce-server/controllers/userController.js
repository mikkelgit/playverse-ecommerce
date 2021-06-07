const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
        .then(data => {
            if (!data) {
                next({ name:"Unauthorized", status: 401, message: "Invalid Email / Password" })
            } else {
                let passwordValid = comparePassword(password, data.password)
                if (!passwordValid) {
                    next({ name:"Unauthorized", status: 401, message: "Invalid Email / Password" })
                } else {
                    const token = generateToken({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({ id: data.id, email: data.email, role: data.role, access_token: token })
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req, res, next) {
        const { email, password } = req.body
        User.create({
            email: email,
            password: password
        })
        .then(data => {
            const token = generateToken({
                id: data.id,
                email: data.email
            })
            res.status(201).json({ id: data.id, email: data.email, access_token: token })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController