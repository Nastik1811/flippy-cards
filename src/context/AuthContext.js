import React, {useContext} from 'react'
import { useAuth } from '../hooks/auth.hook';
import FullScreenLoading from '../views/FullScreenLoading';


function noop() {}

export const AuthContext = React.createContext({
  token: null,
  userId: null,
  username: "",
  login: noop,
  logout: noop,
  isAuthenticated: false
})

export const AuthProvider = ({children}) => {
    const {login, token, userId, username, logout, ready} = useAuth()
    const isAuthenticated = !!token

    if(!ready){
        return(
            <FullScreenLoading/>
        )
    }

    return(
        <AuthContext.Provider value={{
            token, login, logout, userId, username, isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}