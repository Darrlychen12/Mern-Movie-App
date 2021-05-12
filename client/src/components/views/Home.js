import React, { useState, useEffect } from 'react'
import { Movie } from './Movie'
import { API_KEY } from '../../Config'
import Pagination from 'react-js-pagination'
const loadingImages = Array.from(Array(20).keys())



export const Home = () => {


    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages ]= useState(0)

    useEffect (() => {
        fetch( `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            setTotalPages(data.total_results)

        })

    }, [])

    useEffect (() => {
        setLoading(true)
                  // Promise.all()
        fetch( `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMovies(data.results, ...movies)
            setTotalPages(data.total_results)
            setLoading(false)
            window.scrollTo(0, 0)
        })

       
    }, [currentPage])

    console.log(movies.length)

    return (
        <>
        <span className="title">Popular Movies</span>
        <div className='movie-container'>

            {loading && <div></div>} 
        
           
            {!loading && movies.length > 0 && 
                  movies.map((movie) => (
                      <Movie key={movie.id} {...movie} userFrom={localStorage.getItem('userId')} />
                  )
                )}

        </div>
        {!loading && movies.length > 0 && 
        (
            <div className="page-change">
                <Pagination 
                    totalItemsCount={totalPages}
                    activePage={currentPage}
                    itemsCountPerPage={20}
                    onChange={(pageNumber) => setCurrentPage(pageNumber)}
                    itemClass="pagination-btn"
                    linkClass="page-link"
                    hideNavigation={true}
                    activeLinkClass="active-btn"
                    pageRangeDisplayed={4}
                     />
            </div>
                
        )}
        </>
    )
}
