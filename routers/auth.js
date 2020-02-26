const authRouter = require('express').Router()
const { registerUser } = require('../UserModel.js/index.js')
const { hashPassword } = require('../authHelpers')

authRouter.post('/register', async (req, res, next) => {
    try {
        const { name, password, department } = req.body
        if (!name || !password || !department) {
            const dataMissing = new Error('Complete all fields')
            dataMissing.httpStatusCode = 400
            throw dataMissing
        }

        const hashedPassword = hashPassword(password)

        const [newUserID] = await registerUser(name, hashedPassword, department)

        res.json(newUserID)
        return
    } catch (error) {
        next(error)
    }
})




module.exports = authRouter