import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY } from '../../Config'
import { FavoritedMovie  } from './FavoritedMovie'
// import { Movie } from './Movie'
// import { API_KEY } from '../../Config'

export const WatchList = () => {

    const variables = { userFrom: localStorage.getItem('userId') } 
    const [favoriteMovies, setFavoritedMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchFavoriteMovies()
        setLoading(false)
    }, [])

    const fetchFavoriteMovies = () => {
        axios.post('http://localhost:5000/favorite/getFavoriteMovies', variables)
            .then(async response => {
                if(response.data.success) {
                    const movieIDArray = response.data.favorites.map(movie => movie.movieId)
                    console.log(movieIDArray)
                    const movies = await displayFavoritedMovies(movieIDArray)
                    console.log(movies)
                    setFavoritedMovies(movies)
                    
                    
                } else {
                    alert('Failed to get favorite movies')
                }
            })
        
    }

    const displayFavoritedMovies = (movies) => {

        const promises = movies.map((movie) => {
            return fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}&language=en-US`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    return data
                })
        })

        return Promise.all(promises)
    } 

    return (
        <>
        <span className="title">My Favorite Movies </span>
        <div className='movie-container'>
            {!loading && favoriteMovies.length > 0 && 
                favoriteMovies.map((movie) => (
                    <FavoritedMovie 
                        key={movie.id} 
                        {...movie} 
                        userFrom={localStorage.getItem('userId')}
                        fetchFavoriteMovies={fetchFavoriteMovies}
                        />
                )
                )}

            </div>
        </>
    )
}
