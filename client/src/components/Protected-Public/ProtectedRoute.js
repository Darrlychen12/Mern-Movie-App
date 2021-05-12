import React from 'react'
import { Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({ loggedIn: loggedIn, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if(loggedIn) {
                return <Component />
            } else {
                return <Redirect to={{pathname: '/'}} />
            }
        }} />
    )
    
}
