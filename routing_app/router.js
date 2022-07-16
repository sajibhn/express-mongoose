const express = require('express')
const route = express.Router();
let accounts = require('./database')

// GET REQUEST
route.get('/accounts', (req, res) => {
    res.json({ userData: accounts })
})

// post req
route.post('/accounts', (req, res) => {
    const incomingAccount = req.body
    accounts.push(incomingAccount)
    res.json(accounts)
})
// get single
route.get('/accounts/:id', (req, res) => {
    const accountid = Number(req.params.id)
    const getAccount = accounts.find((account) => account.id === accountid)
    if (!getAccount) {
        res.status(500).send("account not found")
    } else {
        res.json({ userData: [getAccount] })
    }
})

// put http
route.put('/accounts/:id', (req, res) => {
    const accountid = Number(req.params.id)
    const body = req.body;
    const account = accounts.find((account) => account.id === accountid)

    const index = account.indexOf(account)

    if (!account) {
        res.status(500).send('account not found')
    } else {
        const updatedAccount = { ...account, ...body }
        accounts[index] = updatedAccount
        res.send(updatedAccount)
    }

})

// delete request
route.delete('/accounts/"id', (req, res) => {
    const accountid = Number(req.params.id);
    const NewAccounts = accounts.fliter((account) => account.id !== accountid)

    if (NewAccounts) {
        res.status(500).send("Account not found")
    } else {
        accounts = NewAccounts
        res.send(accounts)
    }
})

module.exports = route