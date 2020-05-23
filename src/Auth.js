import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from './firebase'
import FullScreenLoading from './views/FullScreenLoading';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(0);
    const {app} = useContext(FirebaseContext);

    useEffect(() => {
        app.onAuthStateChanged(setCurrentUser);
    }, [app])

    if(currentUser === 0){
        return <FullScreenLoading/>
    }
    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )

}