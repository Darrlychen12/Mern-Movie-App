import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {IMG_API} from '../../Config'
import placeHolderImage from "../../assets/Grey.png"



// const IMG_API = "https://image.tmdb.org/t/p/w1280"

export const Movie = ({ id, title, poster_path, overview, release_date, vote_average, userFrom, button}) => {

    const [favoriteNumber, setFavoriteNumber] = useState(0)
    const [favorited, setFavorited] = useState(false)
    const date = Date.parse(release_date)


    // const { loggedIn } = useContext(AuthContext)

    // const fetchVideo = async () => {
    //     const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    //     setVideo(data.results[0]?.key)
    // }

    const variable = {
        userFrom: userFrom,
        movieId: id,
        movieTitle: title,
        movieImage: poster_path,
        movieRunTime: vote_average,
    }

    useEffect(() => {
       
        axios.post('http://localhost:5000/favorite/favoriteNumber', variable)
            .then(response => {
                // console.log(response.data)
                if(response.data.success) {
                   
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get favorite Number')
                }
            })

            axios.post('http://localhost:5000/favorite/favorited', variable)
            .then(response => {
                // console.log(response.data)
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            })
        
        
      }, []);
    

      const onClickFavorite = async () => {
          if (favorited) { 
            axios.post('http://localhost:5000/favorite/removeFromFavorite', variable)
            .then(response => {
                // console.log(response.data)
                if(response.data.success) {
                    setFavoriteNumber(favoriteNumber - 1)
                    setFavorited(!favorited)
                } else {
                    alert( 'failed to remove to favorite list')
                }
            })

          } else {
               axios.post('http://localhost:5000/favorite/addToFavorite', variable)
                .then(response => {
                    // console.log(response.data)
                    if(response.data.success) {
                        setFavoriteNumber(favoriteNumber + 1)
                        setFavorited(!favorited)
                    } else {
                        alert( 'failed to add to favorite list')
                    }
                })
          }
      }

    return (
        <div className="movie">
            <div className="movie-header">
                <div className="date">{date ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date): "N/A"}</div>
                {/* <div className="rating">{vote_average}</div> */}
                <img src={poster_path !== null ? IMG_API + poster_path : {placeHolderImage}} alt={title}/>
                <div className="movie-over">
                    <h4>{title}</h4>
                    <h4>Overview</h4>
                    <p>{overview}</p>
                    <p>Total Favorited: {favoriteNumber}</p>
                    <button className="btn" onClick={onClickFavorite}>
                        {favorited? " remove from Favorites " : " Add to Favorites "}

                    </button>
                </div>
            </div>
        </div>
    )
}
