const mongoose = require('mongoose')

const MovieListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: 'movieList' })

module.exports = mongoose.model('movieList', MovieListSchema)