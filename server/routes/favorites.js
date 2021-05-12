const express = require('express')
const { favoriteNumber, favorited, addToFavorite, removeFromFavorite, getFavoriteMovies } = require('../controllers/favorites')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/favoriteNumber',  favoriteNumber)
router.post('/favorited', favorited)
router.post('/addToFavorite', auth, addToFavorite)
router.post('/removeFromFavorite', auth, removeFromFavorite)
router.post('/getFavoriteMovies', auth, getFavoriteMovies)
module.exports = router