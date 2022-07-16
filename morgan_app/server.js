const express = require('express')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')
const fs = require("fs")
const path = require("path")

const app = express()
const port = 3000;

morgan.token('id', (req) => {
    return req.id
})

morgan.token('param', (req, res, param) => {
    return "userToken"
})

app.use(assignid)

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan(':id:param:method:status:url "HTTP/:http-version'))
app.use(morgan(':id:param:method:status:url "HTTP/:http-version', { stream: accessLogStream }))

function assignid(req, res, next) {
    req.id = uuidv4()
    next()
}

app.get('/', (req, res) => {
    res.end("morgin")
})

app.listen(port, () => console.log("server is runnin at 3000"))