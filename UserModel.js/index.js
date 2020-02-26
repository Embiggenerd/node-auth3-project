const db = require('../db/dbConfig')

module.exports.registerUser = async (name, password, department) => {
    try {
        const registeredUser = await db('users').insert({ name, password, department })
        console.log('registeredUser', registeredUser)
        return registeredUser
    } catch (error) {
        throw error
    }
}