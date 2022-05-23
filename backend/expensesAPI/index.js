const express = require('express')
const router = express.Router()

const {filterSpending, sortSpendings, isRequestValid } = require('./utils')

const spendings = []

router.get('/list', (req, res) => {

    const { currency, sortBy } = req.query
    const result = spendings
        .filter(e => filterSpending(e, currency))
        .sort((a, b) => sortSpendings(a, b, sortBy))

    res.send(result)
})


router.post('/add', (req, res) => {
    try {
        const { body } = req

        if(!isRequestValid(body)) {
            res.status(400).send('Bad request')
            return
        }
        spendings.push(body)
        res.send({ success: true })
    } catch (e) {
        res.sendStatus(500).json({error: e})
    }
})

module.exports = router

