import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from './firebase'

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const {app} = useContext(FirebaseContext);

    useEffect(() => {
        app.onAuthStateChanged(setCurrentUser);
    }, [app])

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}