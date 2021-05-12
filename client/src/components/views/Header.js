import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { LogOutBtn } from '../auth/LogOutBtn'

export const Header = () => {

    const { loggedIn } = useContext(AuthContext)

    return (
        <header>
        <div className="container">
            <div className="inner-content">
                <div className="Brand">
                    <Link to="/">myMovieApp</Link>
                </div>

              
                <ul className="nav-links">

                {loggedIn ? 
                (
                    <>
                        <li>
                        <Link to="/discover" onClick={() => window.location.href="/discover"} >Search</Link>
                        </li>

                        <li>
                            <Link to="/watchlist" onClick={() => window.location.href="/watchlist"} >myWatchList</Link>
                        </li>
                        <li>
                            <LogOutBtn />
                        </li>
                    </>
                )
                :
                (
                    <>
                        <li>
                            <Link to="/login" onClick={() => window.location.href="/login"} >Login</Link>
                        </li>
                        <li>
                            <Link to="/register" onClick={() => window.location.href="/register"} >Register</Link>
                        </li>
                    </>
                   )
                }          
                    


                    
                </ul>
            </div>
        </div>
    </header>
    )
}
