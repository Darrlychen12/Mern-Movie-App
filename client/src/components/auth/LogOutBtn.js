import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { useHistory } from 'react-router'

export const LogOutBtn = () => {

    const { getLoggedIn } = useContext(AuthContext)
    const history = useHistory()

    const logOut = async () => {
    await axios.get("http://localhost:5000/auth/logout")
    localStorage.clear();
    await getLoggedIn()
    history.push('/')
}


    return (
        <button className="btn" onClick={logOut}>Logout</button>
    )
}
