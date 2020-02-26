const authRouter = require('express').Router()
const { registerUser, getUserByName } = require('../UserModel.js/index.js')
const { hashPassword, generateToken, comparePasswords } = require('../authHelpers')

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

authRouter.post('/login', async (req, res, next) => {
    try {
        const { name, password } = req.body
        if (!name || !password) {
            const dataMissing = new Error('Complete all fields')
            dataMissing.httpStatusCode = 400
            throw dataMissing
        }

        const [user] = await getUserByName(name)

        console.log('userLogin', user)

        const authenticated = comparePasswords(password, user.password)

        if (!authenticated) {
            const tryAgain = new Error("Try Again!")
            tryAgain.httpStatusCode = 400
            throw tryAgain
        }

        const token = generateToken(user)

        res.json({
            message: `Welcome, ${user.name}`,
            token
        })
    } catch (error) {
        next(error)
    }
})




module.exports = authRouter