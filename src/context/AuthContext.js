import React, {useContext, useMemo} from 'react'
import FullScreenLoading from '../views/FullScreenLoading';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const {login, token, userId, logout, ready} = useContext(AuthContext)
    const isAuthenticated = !!token

    if(!ready){
        return(
            <FullScreenLoading/>
        )
    }
    return(
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}