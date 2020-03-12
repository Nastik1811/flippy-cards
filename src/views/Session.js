import React from 'react'
import Card from '../Components/Card'


export const SessionInfo = () => {
    return (
        <div className="session-info">
            <div>
                <div className="title"> Collection name </div>
                <div className="detail"> 15 cards left </div>
            </div>
            <div className="passed-time"> 10:10 </div>
        </div>
    )
}


export default class Session extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <SessionInfo/>
                <Card/>
            </div>
        )
    }
}

// export const Session = () => {
//     let {sessionId} = useParams();
//     return (
//         <div>
//                 <div> Collection name</div>
//                 <div> {this.sessionId}}</div>
//                 <Card/>
//         </div>
//     )
// }


