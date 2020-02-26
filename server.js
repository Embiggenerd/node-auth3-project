const express = require('express')
const helmet = require("helmet");

const { registerRouter } = require('./routers')

const server = express()

server.use(helmet());
server.use(express.json())

server.use('/register', registerRouter)

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(err.httpStatusCode || 500).json({
        message: err.message
    })
})

module.exports = server