import React, {useState} from 'react'
import Card from './Card'
import styles from './Overview.module.scss'
import Timer from './Timer'
import MarksPanel from './MarksPanel'

const SessionInfo = ({name, left}) => {
    return (
            <div className={styles["details"]}>
                <span className={styles["title"]}>"{name}"</span>
                <span className={styles["left"]}>cards left: {left}</span>
            </div>
    )
}

const Overview = ({name, left, currentCard, onMarkClick , time, onTick}) => {
    const [isFlipped, setFlipped] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [isVisible, setVisible] = useState(false);


    const handleMarkClick = (mark) => {
        setIsNew(true)
        setVisible(false)
        setTimeout(() => 
            {
            onMarkClick(mark);
            setFlipped(false)
            setIsNew(false)}
            , 600)
    }

    return (
            <section className={styles["overview"]}>
                <div className={styles["container"]}>
                    <div className={styles["session-info"]}>
                        <SessionInfo
                        name={name} left={left}/>
                        <Timer 
                            time = {time}
                            onTick = {onTick}
                            />
                    </div>

                    <Card 
                        card={currentCard.content} 
                        onClick={() => {
                            setFlipped(true)
                            setVisible(true)
                        }} 
                        isFlipped={isFlipped}
                        isNew={isNew}/> 

                    {isVisible && <MarksPanel onClick={handleMarkClick}/>} 
                </div>
            </section>
        )
}

export default Overview;