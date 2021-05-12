import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthContextProvider = (props) =>  {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const[loading, setLoading] = useState(true)

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:5000/auth/loggedin");
    setLoggedIn(loggedInRes.data);
    setLoading(false)
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
        {
            loading ? (null) : (
                props.children
            
            )
        }
    </AuthContext.Provider>
  );
}

export default AuthContext;
