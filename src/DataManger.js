import React, {useContext, useMemo} from 'react'
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import { FirebaseContext } from './firebase'
import { AuthContext } from './Auth';

export const DataContext = React.createContext();

export const MARK = {
    BAD: 0,
    GOOD: 1,
    EXCELLENT: 2
}

export const STATUS = {
    NEW: 0,
    IN_PROGRESS: 1,
    LEARNED: 2
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
            status: STATUS.NEW
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

    getCardDetail(id){
        return this.cardsRef.doc(id).get().then(doc => ({...doc.data(), id: doc.id}))
    }

    getCollection(id){
        return this.collectionsRef.doc(id).get().then(doc => ({...doc.data(), id: doc.id}))
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
        
        const grouped_cards = this.reselectCards(cards) 
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
            if(card.collection.id){
                grouppedCards[card.collection.id] ? grouppedCards[card.collection.id].push(card) : grouppedCards[card.collection.id] = [card]
            }
        })
        return grouppedCards;
    }

    getCardsWithoutCollection(){
    return this.cardsRef.where("collection", "==", null).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    //overview logic
    updateCardProgress(card, mark){
        let newStatus;
        let nextRecall;

        let today = new Date();
        let previousRecall = card.last_recall ? card.last_recall.toDate() : today;
        let scheduledRecall = card.next_recall.toDate();

        switch(card.status){
            case STATUS.NEW:
                [nextRecall, newStatus] = this.getUpdatesForNew(mark)
                break;
            case STATUS.IN_PROGRESS:
                [nextRecall, newStatus] = this.getUpdatesForInProgress(previousRecall, scheduledRecall, mark)
                break;
            case STATUS.LEARNED:
                [nextRecall, newStatus] = this.getUpdatesForLearned(previousRecall, scheduledRecall, mark)
                break;
            default:
                break;
        }  

        this.cardsRef.doc(card.id).update({
            next_recall: firebase.firestore.Timestamp.fromDate(nextRecall),
            last_recall: firebase.firestore.Timestamp.fromDate(today),
            status: newStatus
        })
    }

    getUpdatesForNew(mark){
        let newInterval;

        switch(mark){
            case MARK.BAD:
                newInterval = 0;
                break;
            case MARK.GOOD:
                newInterval = 1;
                break;
            case MARK.EXCELLENT:
                newInterval = 24;
                break;
            default:
                throw Error;
        }

        const today = new Date();
        let nextRecall = new Date();
        nextRecall.setHours(today.getHours() + newInterval);
        let newStatus = mark === MARK.EXCELLENT ? STATUS.IN_PROGRESS : STATUS.NEW;

        return [nextRecall, newStatus];
    }

    getUpdatesForInProgress(previousRecall, scheduledRecall, mark){
        let newInterval = this.calculateInterval(previousRecall, scheduledRecall, mark);

        const today = new Date();
        let nextRecall = new Date();
        nextRecall.setDate(today.getDate() + newInterval);
        let newStatus = newInterval > 365 ? STATUS.LEARNED : STATUS.IN_PROGRESS;      
        
        return [nextRecall, newStatus];  
    }

    calculateInterval(previousRecall, suggestedRecall, mark){
        const today = new Date();

        let suggestedInterval = suggestedRecall.getDate() - previousRecall.getDate();
        let delay = today.getDate() - suggestedRecall.getDate();

        let newInterval;

        switch(mark){
            case MARK.BAD:
                newInterval = suggestedInterval + delay/4 
                break;
            case MARK.GOOD:
                newInterval = (suggestedInterval + delay/2 ) * 1.5
                break;
            case MARK.EXCELLENT:
                newInterval = (suggestedInterval + delay) * 2
                break;
            default:
                throw Error
        }

        return newInterval;
    }

    getUpdatesForLearned(previousRecall, scheduledRecall,  mark){
        let suggestedInterval = scheduledRecall.getDate() - previousRecall.getDate();
        let newInterval = mark === MARK.BAD ? suggestedInterval : suggestedInterval * 1.5
        
        const today = new Date();
        let nextRecall = new Date();
        nextRecall.setDate(today.getDate() + newInterval);

        return [nextRecall, STATUS.LEARNED]  
    }
  
  }