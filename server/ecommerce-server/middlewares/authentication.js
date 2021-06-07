const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

function authentication(req, res, next) {
    const { access_token } = req.headers
    if (!access_token) {
        next({ name:"JsonWebTokenError", message: "Login Required" })
    } else {
        let verified = verifyToken(access_token)
        User.findOne({
            where: {
                email: verified.email
            }
        })
            .then(data => {
                if (!data) {
                    next({ name:"JsonWebTokenError", message: "Invalid Access Token" })
                } else {
                    req.loggedUser = {
                        id: verified.id,
                        email: verified.email,
                    }
                    next()
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = authentication