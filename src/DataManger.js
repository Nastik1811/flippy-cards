import React, {useState, useEffect, useContext, useMemo} from 'react'
import 'firebase/firestore';
import { FirebaseContext } from './firebase'
import { AuthContext } from './Auth';

export const DataContext = React.createContext();

export const DataProvider = ({children}) => {
    const {app} = useContext(FirebaseContext);
    const {currentUser} = useContext(AuthContext);
    const uid = currentUser? currentUser.uid : null;
    const manager = useMemo(() => {
        return uid ? new DataManger(app, uid ) : null
    }, [app, uid]);
    
    return(
        <DataContext.Provider value={{manager}}>
            {children}
        </DataContext.Provider>
    )
}

class DataManger {
    constructor(app, uid) {
        this.db = app.firestore;
        this.uid = uid;
        this.userRef = this.db.collection("users").doc(uid);
    }

    getUserName = () => {
        return this.userRef.get().then(doc => doc.data().user_name);
    }
  
  }