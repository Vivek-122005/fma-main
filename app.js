const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const morgan = require('morgan')

require('dotenv').config()

const PORT = 3000

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(3000, () => {
        console.log('listening to port:', 3000)
    })
}

server()