const registerRouter = require('express').Router()

registerRouter.post('/', async (req, res, next) => {
    res.json('/register')
})



module.exports = registerRouter