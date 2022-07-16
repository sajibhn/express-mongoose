const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express();
const port = process.env.PORT || 3000;



app.use((req, res, next) => {
    var filepath = path.join(__dirname, 'static', req.url)
    fs.stat(filepath, (err, fileinfo) => {
        if (err) {
            next()
            return
        }
        if (fileinfo.isFile()) {
            res.sendFile(filepath)
        } else {
            next()
        }
    })
})

app.use((req, res) => {
    res.status(404).send("file not found")
})

app.listen(port, () => console.log('Listening on port 3000'))