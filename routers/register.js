const registerRouter = require('express').Router()
const { registerUser } = require('../UserModel.js')
const { hashPassword } = require('../authHelpers')

registerRouter.post('/', async (req, res, next) => {
    try {
        const { name, password, department } = req.body
        if (!name || !password || !department) {
            const dataMissing = new Error('Complete all fields')
            dataMissing.httpStatusCode = 400
            throw dataMissing
        }



        const hashedPassword = hashPassword(password)

        console.log('hashedPasswordRouter', hashedPassword)

        const [newUserID] = await registerUser(name, hashedPassword, department)

        res.json(newUserID)
        return

    } catch (error) {
        next(error)
    }
})



module.exports = registerRouter