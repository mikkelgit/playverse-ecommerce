function errorHandler(err, req, res, next) {
    switch (err.name) {
        case "SequelizeValidationError":
            const errors = []
            err.errors.forEach(err => {
                errors.push(err.message)
            });
            res.status(400).json( { message: 'Bad Request', errors } )  
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json( { message:'Bad Request', errors: ['This username / email has been registered'] } )
            break;
        case "SequelizeDatabaseError":
            res.status(400).json( { message:'Bad Request', errors: ['Product stock & price must be in valid number format'] } )
            break;
        case "JsonWebTokenError":
            res.status(400).json( { message:'Bad Request', errors: [err.message] } )
            break;
        case "NotFound":
            res.status(404).json( { message:'Not Found', errors: [err.message] } )
            break;
        case "Unauthorized":
            res.status(401).json( { message:'Unauthorized', errors: [err.message] } )
            break;
        default:
            res.status(err.status || 500).json( { message: [err.message] || ["Internal Server Error"] } )
            break;
    }
}

module.exports = errorHandler