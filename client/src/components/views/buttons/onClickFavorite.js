import React from 'react'
import axios from 'axios'

export const onClickFavorite = ({favorited, setFavoriteNumber, setFavorited, favorited, favoriteNumber}) => {

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
        <>
            <button className="btn" onClick={onClickFavorite}>
                {favorited? " remove from Favorites " : " Add to Favorites "}
            </button>
        </>
    )
}
