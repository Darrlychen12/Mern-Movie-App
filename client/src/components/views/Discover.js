import React, { useState, useEffect } from 'react'
import { API_KEY } from '../../Config'
import { Movie } from './Movie'
import useDebounce from '../use-debounce';

export const Discover = () => {

    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(query, 550);

    useEffect(
      () => {
        // Make sure we have a value (user has entered something in input)
        if (debouncedSearchTerm) {
          // Set isSearching state
          setIsSearching(true);
          // Fire off our API call
          searchMovies(debouncedSearchTerm).then(results => {
            // Set back to false since request finished
            setIsSearching(false);
            // Set results state
            setMovies(results);
          });
        } else {
          setMovies([])
        }
      },
      // This is the useEffect input array
      // Our useEffect function will only execute if this value changes ...
      // ... and thanks to our hook it will only change if the original ...
      // value (searchTerm) hasn't changed for more than 500ms.
      [debouncedSearchTerm]
    );


    const searchMovies = (search) => {
      return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`)
        .then(r => r.json())
        .then(data => {
          console.log(data)
          return data.results
        })
        .catch(error => {
          console.error(error);
          return [];
        });
    }

 


    // const onChange = async e => {
    //     e.preventDefault()
    //     setQuery(e.target.value)
    //     if(query) {
    //       setIsSearching(true);
    //       fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (!data.errors) {
    //           setMovies(data.results);
    //           console.log(data.results)
    //         } else {
    //           setMovies([]);
    //         }
    //     });
    //     return

    //     }
        
    // }

    return (
      <>

        <div className='search-bar'>
          <input
            type="text"
            placeholder="Search for a movie ... "
            onChange={e => setQuery(e.target.value)}
            />
        </div>
        <div className='movie-container'>

            {isSearching && <div></div>}
            {!isSearching && movies.length > 0 && 
                  movies.map((movie) => (
                      <Movie key={movie.id} {...movie} userFrom={localStorage.getItem('userId')} />
                      // <li>{movie.title}</li>
                  )
              )}

        </div>
        </>
    )
}
