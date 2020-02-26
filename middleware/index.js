const { verify } = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET || 'secret'

module.exports.restricted = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (authorization) {
            verify(authorization, jwtSecret, (err, decodedToken) => {
                if (err) {
                    const unauthorized = new Error("Unauthorized")
                    unauthorized.httpStatusCode = 403
                    throw unauthorized

                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })

        } else {
            const noAuth = new Error('No Authorization Provided')
            noAuth.httpStatusCode = 400
            throw noAuth
        }
        
    } catch (error) {
        next(error)
    }
}