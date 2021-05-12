const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Enter a valid username'], 
        unique: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
   
}
)

var movieSchema = new mongoose.Schema({
    movieName: String,
    movie_id: String
});


module.exports = mongoose.model('User', UserSchema);