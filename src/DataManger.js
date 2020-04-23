import React, {useContext, useMemo} from 'react'
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import { FirebaseContext } from './firebase'
import { AuthContext } from './Auth';

export const DataContext = React.createContext();

export const marks = {
    BAD: 0,
    GOOD: 1,
    EXCELLENT: 2
}

export const status = {
    NEW: 0,
    IN_PROGRESS: 1,
    LEARNT: 2
}

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
            status: status.NEW
        }

        this.userRef.collection('cards').add(card);
    }

    addCollection(name){
        const date = firebase.firestore.Timestamp.fromDate(new Date());
        let collection = {
            name,
            created: date,
            last_edit: date
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
        cards.forEach(card => {
            if(card.collection){
                grouppedCards[card.collection.id] ? grouppedCards[card.collection.id].push(card) : grouppedCards[card.collection.id] = [card]
            }
        })
        return grouppedCards;
    }

    getCardsWithoutCollection(){
    return this.cardsRef.where("collection", "==", null).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    //overview logic
    calculatePeriod(previousRecall, suggestedRecall, mark){
        const today = new Date();

        let suggestedPeriod = suggestedRecall.getDate() - previousRecall.getDate();
        let delay = today.getDate() - suggestedRecall.getDate();

        let nextPeriod;

        switch(mark){
            case marks.BAD:
                nextPeriod = suggestedPeriod + delay/4 
                break;
            case marks.GOOD:
                nextPeriod = (suggestedPeriod + delay/2 ) * 1.5 + 1
                break;
            case marks.EXCELLENT:
                nextPeriod = (suggestedPeriod + delay) * 2 + 2
                break;
            default:
                nextPeriod = 0
        }

        return nextPeriod
    }

    async updateCardProgress(card, mark){
        switch(status){
            case status.NEW:
                this.updateNew(card, mark)
                break;
            case status.IN_PROGRESS:
                this.updateInProgress(card, mark)
                break;
            case status.LEARNT:
                this.updateLearnt(card)
                break;
            default:
                break;
        }  
    }

    updateInProgress(card, mark){
        let previousRecall = card.last_recall.toDate();
        let suggestedRecall = card.next_recall.toDate()

        let nextPeriod = this.calculatePeriod(previousRecall, suggestedRecall, mark)

        const today = new Date()
        let nextRecall = new Date()
        nextRecall.setDate(today.getDate() + nextPeriod)

        this.cardsRef.doc(card.id).update({
            next_recall: firebase.firestore.Timestamp.fromDate(nextRecall),
            last_recall: firebase.firestore.Timestamp.fromDate(today),
            status: status
        })     

    }
    updateNew(card, mark){
        let nextPeriod;
        let status;

        switch(mark){
            case marks.BAD:
                nextPeriod = 0;
                break;
            case marks.GOOD:
                nextPeriod = 1;
                break;
            case marks.EXCELLENT:
                nextPeriod = 24;
                status = status.IN_PROGRESS;
                break;
            default:
                nextPeriod = 0
        }

        const today = new Date()
        let nextRecall = new Date()
        nextRecall.setHours(today.getHours() + nextPeriod)

        this.cardsRef.doc(card.id).update({
            next_recall: firebase.firestore.Timestamp.fromDate(nextRecall),
            last_recall: firebase.firestore.Timestamp.fromDate(today),
            status: status
        })
    }

    updateLearnt(card, mark){
        let previousRecall = card.last_recall.toDate();
        let suggestedRecall = card.next_recall.toDate();

        let suggestedPeriod = suggestedRecall.getDate() - previousRecall.getDate();
        
        let nextPeriod = mark === marks.BAD ? suggestedPeriod : suggestedPeriod * 1.5
        
        const today = new Date()
        let nextRecall = new Date()
        nextRecall.setDate(today.getDate() + nextPeriod)

        this.cardsRef.doc(card.id).update({
            next_recall: firebase.firestore.Timestamp.fromDate(nextRecall),
            last_recall: firebase.firestore.Timestamp.fromDate(today)
        })     
    }
  
  }