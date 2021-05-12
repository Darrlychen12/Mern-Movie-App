const express = require('express')
const { createCustomer, getCustomers } = require('../controllers/customer')
const router = express.Router()
const auth = require('../middleware/auth')


router.post('/createCustomer', auth, createCustomer)
router.get('/getCustomer', auth, getCustomers)



module.exports = router