const express = require('express')
const helmet = require("helmet");

const { authRouter, usersRouter } = require('./routers')

const server = express()

server.use(helmet());
server.use(express.json())

server.use('/auth', authRouter)

server.use('/users', usersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(err.httpStatusCode || 500).json({
        message: err.message
    })
})

module.exports = server