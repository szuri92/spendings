const express = require('express')
const router = express.Router()

const spendings = []


router.get('/list', (_, res) => {
    res.send(spendings)
})


router.post('/add', (req, res) => {
    try {
        const { body } = req
        spendings.push(body)
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(500).json({error: e})
    }
})


module.exports = router