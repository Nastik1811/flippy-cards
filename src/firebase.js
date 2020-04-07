import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createContext } from 'react';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

class Firebase {
  constructor() {
    const instance = firebase.initializeApp(config);
    this.auth = instance.auth();
  }

  signOut =() => this.auth.signOut();
  createUser = (email, password, userName) =>{
    this.auth.createUserWithEmailAndPassword(email, password);
  }
  login = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  onAuthStateChanged = (observer) => this.auth.onAuthStateChanged(observer);
  

}
export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({children}) => {
  const app = React.useMemo(() => new Firebase(), []);

  return(
      <FirebaseContext.Provider value={{app}} >
          {children}
      </FirebaseContext.Provider>
  )
}
