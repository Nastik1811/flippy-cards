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
            learning_stage: 0
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
            return this.cardsRef.where("collection.id", "==", collection_id).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        else{
            return this.cardsRef.get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
    }

    getCollection(id){
        return this.collectionsRef.doc(id).get().then(doc => doc.data())
    }

    getCardsToRecall(collection_id){
        if(collection_id){
            return this.cardsRef.where("collection.id", "==", collection_id).where("next_recall", "<=", new Date()).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        else{
            return this.cardsRef.where("next_recall", "<=", new Date()).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
        } 
    }

    getTotalRepeatNumber(){
        return this.cardsRef.where("next_recall", "<=", new Date()).get().then(query => query.docs.length);
    }

    async getCollectionToRepeatPreviews(){
        const cards = await this.cardsRef.where("next_recall", "<=", new Date()).get().then(query => query.docs.map(doc => ({id: doc.id, collection: doc.data().collection})));
        
        const grouped_cards = this.reselectCards(cards) // {id: [cards]}
        const collections = []
        
        Object.keys(grouped_cards).forEach( id => {
                const name = grouped_cards[id][0].collection.name
                const amount = grouped_cards[id].length
                collections.push({id, name, amount})
            }
        )
        return collections
    }

    reselectCards(cards) {
        const grouppedCards = {};
        cards.forEach(card => grouppedCards[card.collection.id] ? grouppedCards[card.collection.id].push(card) : grouppedCards[card.collection.id] = [card])
        delete grouppedCards[null]
        return grouppedCards;
      }
  
  }