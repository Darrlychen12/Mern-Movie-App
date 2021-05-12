import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { useHistory } from 'react-router'
import { Redirect } from "react-router-dom"

export const Login = ({ setToken }) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailField, setEmailField] = useState("")
    const [passwordField, setPasswordField] = useState("")

    const {getLoggedIn, loggedIn} = useContext(AuthContext)
    // const history = useHistory()

    if(loggedIn) {
           <Redirect to="/"></Redirect>
    }

    const login = async (e) => {
        e.preventDefault()
        
        try {
            const loginData = {
                email: email, 
                password: password
            }
    
            const response = await axios.post("http://localhost:5000/auth/login", loginData, {
                withCredentials: true
            })
            
            console.log(response.data);
            localStorage.setItem('userId', response.data)
            if(
                response.data.status==="loginError" 
                ||response.data.status==="emptyFieldError"
             ) {
                alert(response.data.error)
            }

            await getLoggedIn()
            // await history.push('/')
         

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="login-wrapper">
        <h1>Login</h1>
            <form onSubmit={login}>
                <label htmlFor="Email"></label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={e =>setEmail(e.target.value)}
                        value={email}
                        />
                    <p className="error-field">{emailField}</p>
                <label htmlFor="Password"></label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={e =>setPassword(e.target.value)}
                        value={password}
                        />
                     <p className="error-field">{passwordField}</p>

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
  </div>
    )
}
