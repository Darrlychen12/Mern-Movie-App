const express = require('express')
const { register, login, logout, loggedin } = require('../controllers/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/loggedin', loggedin)

module.exports = router