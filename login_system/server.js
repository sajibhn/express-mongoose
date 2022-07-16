const express = require('express')
const app = express();
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid')
const router = require('./router')

// parsing incoming data to middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))
// using router
app.use('/route', router)
// initialize ejs engine
app.set("view engine", 'ejs')

//load static assets - help to access css
app.use('/static', express.static(path.join(__dirname, 'public')))
//home route
app.get('/', (req, res) => {
    res.render('base', { title: "Login System" })
})

// port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening to localhost ${port}`))