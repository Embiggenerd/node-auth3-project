const { genSaltSync, hashSync } = require('bcryptjs')

const salt = genSaltSync(10)

module.exports.hashPassword = password => {
    const hashed = hashSync(password, salt)
    console.log('hashed', hashed)
    return hashed
}