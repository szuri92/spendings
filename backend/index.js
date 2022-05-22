const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const spendings = require('./expensesAPI')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/spendings', spendings)

module.exports = app
