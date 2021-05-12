import React, { useContext } from 'react'
import  {BrowserRouter, Switch, Route } from 'react-router-dom'
import { Discover } from './components/views/Discover'
import { Header } from './components/views/Header'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { Home } from './components/views/Home'
import { FourZeroFour } from './components/views/FourZeroFour' 
import  AuthContext  from './context/AuthContext'
import { ProtectedRoute } from './components/Protected-Public/ProtectedRoute'
import { PublicRoute } from './components/Protected-Public/PublicRoute'
import { WatchList } from './components/views/WatchList'

export const Router = () => {

    const { loggedIn } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Header /> 
            <Switch>
                <Route exact path="/">
                        <Home />
                </Route>
                <ProtectedRoute loggedIn={loggedIn} exact path="/discover" component={Discover}/>
                {/* <ProtectedRoute loggedIn={loggedIn} exact path="/watchlist" component={Discover}/> */}
                <PublicRoute loggedIn={loggedIn} exact path="/login" component={Login}/>
                <PublicRoute loggedIn={loggedIn} exact path="/register" component={Register}/>
                <ProtectedRoute loggedIn={loggedIn} exact path="/watchlist" component={WatchList}/>
                <Route component={FourZeroFour}/>
          
            </Switch>
            
            
        </BrowserRouter>
    )
}


            
// {loggedIn ?  
//     (
//         <>
//         <Route exact path="/discover">
//             <Discover />
//         </Route>
//         </>
//     ) :
//     (
//         <>
//         <Route exact path="/register">
//             <Register />
//         </Route>
//         <Route exact path="/login">
//             <Login />
//         </Route>

//         </>
//     )
// }
