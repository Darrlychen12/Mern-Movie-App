import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { useHistory } from 'react-router'
import { Redirect } from "react-router-dom"

export const Register = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailField, setEmailField] = useState("")
    const [passwordField, setPasswordField] = useState("")

    const { getLoggedIn, loggedIn } = useContext(AuthContext)
    const history = useHistory()

    if(loggedIn) {
        <Redirect to="/"></Redirect>
    }

    const register = async (e) => {
        e.preventDefault()

        
        
        try {
            if(!email || !password) {
                if(!email && password){
                    setEmailField("This field is required")
                    setPasswordField(" ")
                }
                if(email && !password){
                    setPasswordField("This field is required")
                    setEmailField(" ")
                }else{
                    setEmailField("This field is required")
                    setPasswordField("This field is required")

                }
                
                return 
            }
         
            const registerData = {
                email: email, 
                password: password
            }

        
            const response = await axios.post("http://localhost:5000/auth/register", registerData, {
                withCredentials: true
            })
            console.log(response.data);
            localStorage.setItem('userId', response.data)

            if(
                response.data.status==="duplicateError"
            ) {
                setEmailField("Email is already registerd ")
                setPasswordField("")
                return 
            }  if (
                response.data.status==="passwordLengthError"
            ) {
                setEmailField("")
                setPasswordField("Password must have a min length of 6")
                return 
            }

            await getLoggedIn()
            history.push('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Register</h1>
                <form onSubmit={register}>
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
                        <button type="submit">Register</button>
                    </div>
                </form>
      </div>
    )
}
