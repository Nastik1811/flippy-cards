import React, {useContext, useMemo} from 'react'
import 'firebase/firestore';
import * as firebase from 'firebase/app';
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
        this.cardsRef = this.userRef.collection("cards");
        this.collectionsRef = this.userRef.collection("collections");
    }

    getUserName(){
        return this.userRef.get().then(doc => doc.data().user_name);
    }

    addCard(data){
        const date = firebase.firestore.Timestamp.fromDate(new Date());

        let card = {
            ...data,
            created: date,
            next_recall: date,
            learning_stage: 0,
            need_repetition: true
        }

        this.userRef.collection('cards').add(card);

        if(data.collection_id){
            //update collection (according to what exactly will be store inside it, which is not clear yet) 
        }
    }

    addCollection(name){
        const date = firebase.firestore.Timestamp.fromDate(new Date());
        // not sure about last 3 fields 
        // to be honest I'm not sure about anything in this class.
        let collection = {
            name,
            created: date,
            last_edit: date,
            need_repetition: false,
            cards_total: 0,
            cards_to_repeat: 0
        }
        this.collectionsRef.add(collection);
    }

    getCollections(){
        return this.collectionsRef.get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    getCards(collection_id){
        if(collection_id){
            return this.cardsRef.where("collection_id", "==", collection_id).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        else{
            return this.cardsRef.get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
    }

    getCollection(id){
        return this.collectionsRef.doc(id).get().then(doc => doc.data())
    }

    //just experiments with implementation of methods I've mentioned in README (unfortunately, not working ones)
    getCardsToRecall(collection_id){
        if(collection_id){
            return this.cardsRef.where("collection_id", "==", collection_id).where("need_repetition", "==", true).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        else{
            return this.cardsRef.where("need_repetition", "==", true).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        } 
    }

    getCollectionsToRecall(){
        this.cardsRef.where("need_repetition", "==", true).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
  
  }