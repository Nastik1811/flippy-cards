import React, { useContext, useState, useEffect }  from 'react'
import ReviewLink from '../ReviewLink'
import { Link } from 'react-router-dom'
import styles from './ReviewLinksBoard.module.scss'
import { DataContext } from '../../../DataManger'

const ReviewLinksBoard = () => {
    const {manager} = useContext(DataContext);

    const [collections, setCollections] = useState(null);

    useEffect(() => {
        manager.getCollectionToRepeatPreviews().then(data => setCollections(data))
    }, [manager])

    return (
        <section className={styles["main-section"]}>
            <header>You can also choose a collection:</header>
            <div className={styles["links-board"]}>
                { collections ? 
                    collections.map(c => <ReviewLink slug={c.id} name={c.name} cards={c.amount} key={c.id}/>)
                    : 
                    <div>Loading..</div>
                }
                <div className={styles["link-container"]}>
                    <Link to="/manage" className={styles["manage-btn"]}>Manage <wbr/> collections</Link>
                </div>
            </div>
        </section>
    )
}

export default ReviewLinksBoard