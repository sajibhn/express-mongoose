const express = require('express')
const app = express();
const port = 3000;
const route = require('./router')
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({ extended: false }))
// home route
app.get('/', (req, res) => {
    res.send('routing app')
})
app.use(route)
app.listen(port, () => console.log('server is running at 3000'))

