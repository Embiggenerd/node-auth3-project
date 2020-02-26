const usersRouter = require('express').Router()

const { getUsers } = require('../UserModel.js')
const { restricted } = require('../middleware')

usersRouter.get('/', restricted, async (req, res, next) => {
    try {
        const users = await getUsers(req.decodedToken.department)
        res.json(users)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter