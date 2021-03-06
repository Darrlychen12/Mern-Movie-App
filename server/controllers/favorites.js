const Favorite = require('../models/Favorites')


exports.favoriteNumber = (req, res) => {
   
    //Find Favorite information inside Favorite Collection by Movie ID 

    Favorite.find({"movieId":  req.body.movieId })
        .exec(( err, favorite ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: favorite.length })
        })


};


exports.favorited = (req, res) => {
   
   // Find Favorite Information inside Favorite Collection by Movie Id , userFrom 
   Favorite.find({"movieId":  req.body.movieId , "userFrom": req.body.userFrom })
    .exec(( err, favorite) => {
        if(err) return res.status(400).send(err)

        //How can we know if I already favorite this movie or not ? 
        let result = false;
        if(favorite.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, favorited: result});

    })

};


exports.addToFavorite = (req, res) => {
   
    //Find Favorite information inside Favorite Collection by Movie ID 

    const favorite = new Favorite(req.body) 
    favorite.save((err, doc) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({success: true})
    })

};

exports.removeFromFavorite = (req, res) => {
   
    //Find Favorite information inside Favorite Collection by Movie ID 

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        }) 

};

exports.getFavoriteMovies = (req, res) => {
   
    //Find Favorite information inside Favorite Collection by Movie ID 

    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return status(400).json({success: false, err})
            res.status(200).json({success: true, favorites})
        })

};







