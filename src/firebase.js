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
    const app = firebase.initializeApp(config);
    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  signOut =() => this.auth.signOut();
  createUser = ({email, password, name}) => {
    this.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.firestore.collection('users').doc(cred.user.uid).set({
        user_name: name,
      })
    })
  }
  login = ({email, password}) => this.auth.signInWithEmailAndPassword(email, password);
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
