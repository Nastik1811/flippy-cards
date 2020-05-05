import React, {useState} from 'react'
import Card from './Card'
import styles from './Overview.module.scss'
import Timer from './Timer'
import MarksPanel from './MarksPanel'

const SessionInfo = ({name, left}) => {
    return (
            <div className={styles["details"]}>
                <span className={styles["title"]}>{name}</span>
                <span className={styles["left"]}>{left} cards left</span>
            </div>
    )
}

const Overview = ({name, left, currentCard, onMarkClick , time, onTick}) => {
    const [isFlipped, setFlipped] = useState(false);
    

    const handleMarkClick = (mark) => {
        onMarkClick(mark);
        setFlipped(false)
    }

    return (
            <section className={styles["overview"]}>
                <div className={styles["container"]}>

                    <div className={styles["session-info"]}>
                        <SessionInfo left = {left} name={name} />
                        <Timer 
                            time = {time}
                            onTick = {onTick}
                            />
                    </div>

                    <Card 
                        card={currentCard.content} 
                        onClick={() => setFlipped(true)} 
                        isFlipped={isFlipped}/>
                    {isFlipped && <MarksPanel onClick={handleMarkClick}/>} 
                </div>
            </section>
        )
}

export default Overview;