const express = require('express')
const router = express.Router()

const spendings = []

const sortSpendings = (a, b, sortBy) => {
    if (sortBy === 'date') {
        return new Date(b.spent_at) - new Date(a.spent_at)
    }

    if (sortBy === '-date') {
        return new Date(a.spent_at) - new Date(b.spent_at)
    }

    if (sortBy === 'amount') {
        return b.amount - a.amount
    }

    if (sortBy === '-amount') {
        return a.amount - b.amount
    }
}

const filterSpending = (element, currency) => {
    if (currency === 'ALL' || currency === '') {
        return element
    }

    return element.currency === currency
}


router.get('/list', (req, res) => {

    const {currency, sortBy} = req.query;
    const result = spendings
        .filter(e => filterSpending(e, currency))
        .sort((a, b) => sortSpendings(a, b, sortBy))

    res.send(result);
})


router.post('/add', (req, res) => {
    try {
        const { body } = req
        spendings.push(body)
        res.send({ success: true })
    } catch (e) {
        res.sendStatus(500).json({error: e})
    }
})

module.exports = {
    router,
    sortSpendings,
    filterSpending,
}

