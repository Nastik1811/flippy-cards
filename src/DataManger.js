import React, {useContext, useMemo} from 'react'

export const DataContext = React.createContext();

export const MARK = {
    BAD: 0,
    GOOD: 1,
    EXCELLENT: 2
}

export const STATUS = {
    NEW: 'new',
    LEARNING: 'learning',
    REVIEW: 'review'
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
//user id, 
class DataManger {
    constructor(app, uid) {
        this.db = app.firestore;

        this.uid = uid;
        this.userRef = this.db.collection("users").doc(uid);
        this.cardsRef = this.userRef.collection("cards");
        this.collectionsRef = this.userRef.collection("collections");
        this.statisticsRef = this.db.collection("statistics");
    }

    getUserName(){
        return this.userRef.get().then(doc => doc.data().user_name);
    }

    addCard(data){
        // this logic is moved to the server :)
        // const date = firebase.firestore.Timestamp.fromDate(new Date());

        // let card = {
        //     ...data,
        //     created: date,
        //     next_recall: date,
        //     status: STATUS.NEW
        // }

        // this.userRef.collection('cards').add(card);
    }

    async addCollection(name){
        if(name === "") throw Error("Name should not be empty.")
        let isCollectionExist = await this.collectionsRef.where("name", "==", name).get().then(docs => !docs.empty)
        if(isCollectionExist){
            throw Error("Collection already exists.")  
        } else{
            this.createCollection(name)
        }
    }

    createCollection(name){
        const date = firebase.firestore.Timestamp.fromDate(new Date());
        let collection = {
            name,
            created: date,
            last_edit: date
        }
        this.collectionsRef.add(collection);
    }

    listenCollections(listener, order="desc"){
        let unsubscribe = this.collectionsRef.orderBy("last_edit", order).onSnapshot(
            snapshot => {
                let collections = [];
                snapshot.forEach(doc => collections.push({...doc.data(), id: doc.id}))
                listener(collections)
            }
        )
        return unsubscribe
    }

    listenCards(listener, collectionName, order="desc"){
        let ref = collectionName ? this.cardsRef.where("collection.name", "==", collectionName) : this.cardsRef
        return ref.orderBy("created", order).onSnapshot(
            snapshot => {
                let cards = [];
                snapshot.forEach(doc => cards.push({...doc.data(), id: doc.id}))
                listener(cards)
            }
        )
    }

    getCollections(){
        return this.collectionsRef.get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    getCards(collectionId){
        let ref = collectionId ? this.cardsRef.where("collection.id", "==", collectionId) : this.cardsRef

        return ref.get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id})))
     
    }

    getCardsForCollectionEdit(id){
        let cardsInCollection = this.cardsRef.where("collection.id", "==", id).get()
                                             .then(query => query.docs.map(doc => ({...doc.data(), id: doc.id, inCollection: true})))
        let cardsOutCollection = this.cardsRef.where("collection.id", "==", null).get().then(query => query.docs.map(doc => ({...doc.data(), id: doc.id, inCollection:false})))
        return Promise.all([cardsInCollection, cardsOutCollection]).then(set => set[0].concat(set[1]))
    }

    updateCard(id, newDetails){
        this.cardsRef.doc(id).update({
            content: newDetails.content,
            collection: newDetails.collection
        })
    }

    updateCollection(id, newName, cards){
        const collection = {
            id: id,
            name: newName
        }
        const noCollection = {
            id: null,
            name: ""
        }

        let batch = this.db.batch()
        batch.update(
            this.collectionsRef.doc(id), 
            {
                name: newName,
                last_edit: firebase.firestore.Timestamp.fromDate(new Date())
            })

        for (id in cards){
            if(cards[id]){
                batch.update(this.cardsRef.doc(id), {collection})
            }
            else{
                batch.update(this.cardsRef.doc(id), {collection: noCollection})
            }
        }

        batch.commit();

    }

    getCardDetails(id){
        return this.cardsRef.doc(id).get().then(doc => ({...doc.data(), id: doc.id}))
    }

    getCollection(id){
        return this.collectionsRef.doc(id).get().then(doc => ({...doc.data(), id: doc.id, }))
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
                newInterval = 25;
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

    isUserNew(){
        return this.cardsRef.get().then(query => query.empty)
    }

    addUserProgress(duration, score){
        // this.statisticsRef.add(
        //     {
        //         user_id: this.uid,
        //         review_date: firebase.firestore.Timestamp.fromDate(new Date()),
        //         review_duration: duration,
        //         score: score
        //     }
        // )
    }

    deleteCard(id){
        this.cardsRef.doc(id).delete()
    }
  
    async deleteCollection(id, withCards = false){
        let batch = this.db.batch();
        batch.delete(this.collectionsRef.doc(id))
        if(withCards){
            this.cardsRef.where("collection.id", "==", id).get()
            .then(query => query.forEach(doc => batch.delete(this.cardsRef.doc(doc.id))))
            .then(() => batch.commit())
        }
        else{
            this.cardsRef.where("collection.id", "==", id).get()
            .then(query => query.forEach(doc => batch.update(
                this.cardsRef.doc(doc.id),
                {
                    collection: {
                    id: null,
                    name: ""
                }}
                )))
            .then(() => batch.commit())
        }
    }
  }