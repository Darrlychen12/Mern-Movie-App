import React from 'react'
import { Route, Redirect} from 'react-router-dom'

export const PublicRoute = ({ loggedIn: loggedIn, component: Component, ...rest }) => {
   console.log(loggedIn)
    return (
        <Route {...rest} render={(props) => {
            if(!loggedIn) {
                return <Component />
            } else {
                return <Redirect to={{pathname: '/'}} />
            }
        }} />
    )
    
}
