const { User } = require('../models');

function adminAuthorization(req, res, next) {
    User.findOne({
        where: {
            email: req.loggedUser.email,
        }
    })
        .then(data => {
            if (!data) {
                next({ status: 401, message: "Unauthorized." })
            } else {
                if (data.role === "admin") {
                    next()
                } else {
                    next({ status: 401, message: "Unauthorized." })
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = adminAuthorization