const { Wishlist } = require('../models');

function wishlistAuthorization(req, res, next) {
    Wishlist.findOne({
        where: {
            UserId: req.loggedUser.id,
            id: req.params.id
        }
    })
        .then(data => {
            if (!data) {
                next({ status: 401, message: "Unauthorized." })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = wishlistAuthorization