const db = require('../db/dbConfig')

module.exports.registerUser = async (name, password, department) =>
    await db('users').insert({ name, password, department })

module.exports.getUserByName = async name =>
    await db('users').select().where({ name })

module.exports.getUsers = async (department) => {
    if (department) {
        return await db('users').where({ department })
    }
    return await db('users')
}

